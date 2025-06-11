# campaigns/urls.py

from django.urls import path
from .views import list_campaigns, create_campaign, donate_to_campaign

urlpatterns = [
    path('list/', list_campaigns, name='campaign-list'),
    path('create/', create_campaign, name='campaign-create'),
    path('donate/', donate_to_campaign, name='campaign-donate'),
]
