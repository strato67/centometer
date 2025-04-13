import pandas as pd
import numpy as np
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
            response["option_dates"] = expiration_dates

        return response
    
    def get_options_chain(self):
        return self.options_chain

    def put_call_ratio(self):
        #Short term sentiment
        volume_ratio = self.options_chain.get("puts")["volume"].sum()/self.options_chain.get("calls")["volume"].sum()
        #Overall market positioning
        open_interest_ratio = self.options_chain.get("puts")["openInterest"].sum()/self.options_chain.get("calls")["openInterest"].sum()   
        
        return {"volume": volume_ratio.item(), "open_interest": open_interest_ratio.item()}


    def open_interest_analysis(self):
       
        options_chain = self.get_options_chain()
        calls = options_chain.get("calls")
        puts = options_chain.get("puts")

        tk = yf.Ticker(self.symbol)
        current_price = tk.info.get("currentPrice")

        calls_above = calls[calls["strike"] >= current_price]
        resistance = calls_above.loc[calls_above['openInterest'].idxmax()]

        puts_below = puts[puts["strike"] <= current_price]
        support = puts_below.loc[puts_below['openInterest'].idxmax()] 

        return resistance["strike"]

    def iv_analysis():
        pass


optionsinfo = OptionsProvider("AMD")


chain = optionsinfo.get_options_chain()
pcr = optionsinfo.put_call_ratio()
price = optionsinfo.open_interest_analysis()
#pcr = put_call_ratio(chain)
print(chain)
print(pcr)
print(price)