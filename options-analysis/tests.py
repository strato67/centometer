import pytest
import pandas as pd
from unittest.mock import patch, MagicMock
from options_provider import OptionsProvider

@pytest.fixture
def mock_yf_ticker():
    with patch("yfinance.Ticker") as mock_ticker_class:
        mock_ticker = MagicMock()
        mock_ticker_class.return_value = mock_ticker

        # Set up mock expiration dates
        mock_ticker.options = ["2025-04-25", "2025-05-02"]

        # Sample options DataFrame
        calls = pd.DataFrame({
            "strike": [100, 105],
            "volume": [200, 150],
            "openInterest": [300, 250],
            "impliedVolatility": [0.25, 0.30],
        })

        puts = pd.DataFrame({
            "strike": [95, 90],
            "volume": [180, 160],
            "openInterest": [280, 260],
            "impliedVolatility": [0.28, 0.32],
        })

        # Assign calls and puts to option_chain
        mock_ticker.option_chain.return_value = MagicMock(calls=calls.copy(), puts=puts.copy())
        mock_ticker.info = {"currentPrice": 102}

        yield mock_ticker

def test_init_sets_options_chain(mock_yf_ticker):
    op = OptionsProvider("AAPL")
    assert "calls" in op.options_chain
    assert "puts" in op.options_chain

def test_get_formatted_options(mock_yf_ticker):
    op = OptionsProvider("AAPL")
    formatted = op.get_formatted_options()
    assert isinstance(formatted["calls"], list)
    assert isinstance(formatted["puts"], list)

def test_put_call_ratio(mock_yf_ticker):
    op = OptionsProvider("AAPL")
    ratio = op.put_call_ratio()
    assert "volume" in ratio and "open_interest" in ratio
    assert isinstance(ratio["volume"], float)
    assert isinstance(ratio["open_interest"], float)

def test_open_interest_analysis(mock_yf_ticker):
    op = OptionsProvider("AAPL")
    oi_analysis = op.open_interest_analysis()
    assert "resistance" in oi_analysis
    assert "support" in oi_analysis
    assert isinstance(oi_analysis["resistance"], list)
    assert isinstance(oi_analysis["support"], list)

def test_iv_analysis(mock_yf_ticker):
    op = OptionsProvider("AAPL")
    iv_data = op.iv_analysis()
    assert isinstance(iv_data, list)
    assert "strike" in iv_data[0]
    assert "callIV" in iv_data[0] or "putIV" in iv_data[0]

def test_invalid_symbol_raises():
    with pytest.raises(AttributeError):
        OptionsProvider("")
    
    with pytest.raises(Exception):
        OptionsProvider("dadadad")

def test_invalid_option_date_uses_default(mock_yf_ticker):
    op = OptionsProvider("AAPL", options_date="2050-01-01")
    assert "option_dates" in op.options_chain
