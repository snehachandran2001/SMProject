# stockapi/views.py

from rest_framework.decorators import api_view
from rest_framework.response import Response
import yfinance as yf

@api_view(['GET'])
def fetch_reliance_stock_data(request):
    symbol = 'RELIANCE.NS'  # NSE symbol for Reliance Industries
    try:
        stock = yf.Ticker(symbol)
        data = stock.history(interval="1m", period="1d")  # Fetch 1-minute interval data for the last day
        if not data.empty:
            latest_data = data.iloc[-1]
            stock_data = {
                'date': latest_data.name.strftime('%Y-%m-%d %H:%M:%S'),
                'open': latest_data['Open'],
                'high': latest_data['High'],
                'low': latest_data['Low'],
                'close': latest_data['Close'],
                'volume': latest_data['Volume']
            }
            return Response(stock_data)
        else:
            return Response({'error': 'Failed to fetch stock data.'}, status=400)
    except Exception as e:
        return Response({'error': str(e)},status=500)