import pandas as pd
import yfinance as yf

class OptionsProvider:

    def __init__(self, symbol, options_date=""):
        self.symbol = symbol
        self.options_date = options_date
        self.options_chain = self.set_options_chain()

        pd.set_option('display.max_rows', None)  # Show all rows
        pd.set_option('display.max_columns', None)  # Show all columns
        pd.set_option('display.width', None)  # Adjust width to prevent line breaks
        pd.set_option('display.max_colwidth', None)  # Prevent column truncation

    def set_options_chain(self):

        if len(self.symbol) == 0 or not self.symbol:
            raise AttributeError("No search parameter provided")
        
        tk = yf.Ticker(self.symbol)
        expiration_dates = tk.options

        if not expiration_dates:
            raise Exception("No options available")

        selected_date = expiration_dates[0]

        if self.options_date and self.options_date in expiration_dates:
            index= expiration_dates.index(self.options_date)
            selected_date = expiration_dates[index]

        options_chain = tk.option_chain(selected_date)
        
        calls = options_chain.calls
        puts = options_chain.puts

        calls.drop(columns=["currency", "contractSize"], axis=1, errors='ignore', inplace=True)
        puts.drop(columns=["currency", "contractSize"], axis=1, errors='ignore', inplace=True)

        response = {
            "calls": calls,
            "puts":puts
        }

        if self.options_date == "" or self.options_date not in expiration_dates:
            response["option_dates"] = list(expiration_dates)

        return response
    
    def get_options_chain(self):
        return self.options_chain      
    
    def get_formatted_options(self):
        options = self.get_options_chain()
        formatted_options = {}
        numeric_cols = ["volume", "openInterest", "bid", "ask", "lastPrice", "impliedVolatility", "percentChange"]

        for key in options:
            if hasattr(options[key], 'to_dict'):
                df = options[key].copy()

                # Replace NaN with 0 for key numeric fields
                for col in numeric_cols:
                    if col in df.columns:
                        df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)

                # Ensure volume and openInterest are integers
                for col in ["volume", "openInterest"]:
                    if col in df.columns:
                        df[col] = df[col].astype(int)

                # Convert timestamp to string for readability
                if "lastTradeDate" in df.columns:
                    df["lastTradeDate"] = df["lastTradeDate"].astype(str)

                formatted_options[key] = df.to_dict(orient='records')
            else:
                formatted_options[key] = options[key]

        return formatted_options

    def put_call_ratio(self):
        #Short term sentiment
        total_call_vol = self.options_chain.get("calls")["volume"].sum()
        total_put_vol = self.options_chain.get("puts")["volume"].sum()
        volume_ratio = total_put_vol/total_call_vol
        #Overall market positioning

        total_call_oi = self.options_chain.get("calls")["openInterest"].sum()
        total_put_oi = self.options_chain.get("puts")["openInterest"].sum()
        open_interest_ratio = total_put_oi/total_call_oi

        return {"volume": volume_ratio.item(), 
                "open_interest": open_interest_ratio.item(), 
                "total_call_oi": int(total_call_oi),
                "total_put_oi": int(total_put_oi),
                "total_call_vol": int(total_call_vol),
                "total_put_vol": int(total_put_vol),
                }

    def open_interest_analysis(self):
       
        options_chain = self.get_options_chain()
        calls = options_chain.get("calls")
        puts = options_chain.get("puts")

        tk = yf.Ticker(self.symbol)
        
        current_price = tk.info.get("currentPrice")
        regular_market_price = tk.info.get("regularMarketPrice")

        analysis_price = current_price

        if analysis_price is None:
            analysis_price = regular_market_price

        calls_above = calls[calls["strike"] >= analysis_price]
        top_resistances = calls_above.sort_values(by='openInterest', ascending=False).head(10)
        top_resistances['distance'] = abs(top_resistances['strike'] - analysis_price)
        top_resistances = top_resistances.sort_values(by='distance').head(3)

        resistances = top_resistances[['strike', 'openInterest']].to_dict(orient='records')

        # Top 3 support levels (PUT side)
        puts_below = puts[puts["strike"] <= analysis_price]
        top_supports = puts_below.sort_values(by='openInterest', ascending=False).head(10)
        top_supports['distance'] = abs(puts_below['strike'] - analysis_price)
        top_supports = top_supports.sort_values(by='distance').head(3)

        supports = top_supports[['strike', 'openInterest']].to_dict(orient='records')

        analysis_response = {
            "resistance":resistances,
            "support":supports
        }

        return analysis_response

    def iv_analysis(self):
        options = self.get_options_chain()
        calls = options['calls']
        puts = options['puts']

        callIV = calls[["strike", "impliedVolatility"]].rename(columns={"impliedVolatility": "callIV"})
        putIV = puts[["strike", "impliedVolatility"]].rename(columns={"impliedVolatility": "putIV"})

        iv_merged = pd.merge(callIV, putIV, on="strike", how="outer")
        iv_merged.fillna(value=0, inplace=True)

        return iv_merged.to_dict(orient='records')