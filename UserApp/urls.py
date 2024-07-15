from django.urls import path
from .views import fetch_reliance_stock_data

urlpatterns = [
    path('fetch-reliance-stock-data/', fetch_reliance_stock_data, name='fetch_reliance_stock_data'),
]
