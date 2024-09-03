from django.contrib import admin
from django.urls import path
from .views import NotificationView


urlpatterns = [
    path('notifications/', NotificationView.as_view())
]
