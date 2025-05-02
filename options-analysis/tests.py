import pytest
import pandas as pd
from unittest.mock import patch, MagicMock
from options_provider import OptionsProvider
from lambda_function import generate_option_response

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

@pytest.fixture
def mock_options_provider():
    with patch("options_provider.OptionsProvider") as MockProvider:  # Replace `your_module`
        mock_instance = MagicMock()

        mock_instance.get_formatted_options.return_value = {
            "calls": [{"strike": 100}],
            "puts": [{"strike": 90}],
            "option_dates": ["2025-04-25", "2025-05-02"]
        }
        mock_instance.put_call_ratio.return_value = {
            "volume": 0.8,
            "open_interest": 0.75
        }
        mock_instance.open_interest_analysis.return_value = {
            "resistance": [{"strike": 110, "openInterest": 1000}],
            "support": [{"strike": 95, "openInterest": 900}]
        }
        mock_instance.iv_analysis.return_value = [
            {"strike": 100, "callIV": 0.25, "putIV": 0.30}
        ]

        MockProvider.return_value = mock_instance
        yield MockProvider

@pytest.mark.skip(reason="avoiding rate limits")
def test_generate_option_response_valid(mock_options_provider):
    response = generate_option_response("AAPL")

    assert "optionsChain" in response
    assert "putCallRatio" in response
    assert "openInterestAnalysis" in response
    assert "ivData" in response

    options_chain = response["optionsChain"]
    assert "option_dates" in options_chain
    assert isinstance(options_chain["option_dates"], list)

@pytest.mark.skip(reason="avoiding rate limits")
def test_generate_option_response_invalid_stock():
    with pytest.raises(AttributeError):
        generate_option_response("")