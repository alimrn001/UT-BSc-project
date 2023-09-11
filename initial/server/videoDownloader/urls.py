from django.urls import path
from . import views

urlpatterns = [
    path('video/', views.video_view),
]
