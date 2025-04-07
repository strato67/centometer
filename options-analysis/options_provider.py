import pandas as pd
import numpy as np
import yfinance as yf

pd.set_option('display.max_rows', None)  # Show all rows
pd.set_option('display.max_columns', None)  # Show all columns
pd.set_option('display.width', None)  # Adjust width to prevent line breaks
pd.set_option('display.max_colwidth', None)  # Prevent column truncation

def get_options_chain(symbol:str, option_date=""):

    if len(symbol) == 0 or not symbol:
        raise("No search parameter provided")
    
    tk = yf.Ticker(symbol)
    expiration_dates = tk.options
    selected_date = expiration_dates[0]

    if option_date and option_date in expiration_dates:
        index= expiration_dates.index(option_date)
        selected_date = expiration_dates[index]

    options_chain = tk.option_chain(selected_date)
    
    if not options_chain:
        return {}
    
    calls = options_chain.calls
    puts = options_chain.puts

    calls.drop(columns=["currency", "contractSize"], axis=1, errors='ignore', inplace=True)
    puts.drop(columns=["currency", "contractSize"], axis=1, errors='ignore', inplace=True)

    response = {
        "calls": calls,
        "puts":puts
    }

    if option_date == "":
        response["option_dates"] = expiration_dates

    return response


def put_call_ratio(option_chain: dict['calls':pd.DataFrame,'puts':pd.DataFrame ] ):

    volume_ratio = option_chain.get("puts")["volume"].sum()/option_chain.get("calls")["volume"].sum()
    open_interest_ratio = option_chain.get("puts")["openInterest"].sum()/option_chain.get("calls")["openInterest"].sum()   
    
    return {"volume": volume_ratio.item(), "open_interest": open_interest_ratio.item()}


def open_interest_analysis():
    #TODO Get top 5 open interest strikes
    pass

def iv_analysis():
    pass


chain = get_options_chain("NVDA", "")
pcr = put_call_ratio(chain)
print(chain)
print(pcr)