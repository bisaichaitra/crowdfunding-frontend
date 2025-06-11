"""
URL configuration for crowdfund_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.http import HttpResponse
from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token  # ✅ For built-in token login if needed

urlpatterns = [
    path('', lambda request: HttpResponse("Welcome to the CrowdFunding API!"), name='home'),
    path('admin/', admin.site.urls),
    path('api/campaigns/', include('campaigns.urls')),  # ✅ Your campaign app
    path('api/user/', include('accounts.urls')),        # ✅ Your auth (Register/Login)

    # ✅ Optional: REST framework’s built-in login view (for testing tokens)
    path('api/token/', obtain_auth_token, name='api_token_auth'),
]
