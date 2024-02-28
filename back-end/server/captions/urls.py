from django.urls import path
from . import views

urlpatterns = [
    path('captions/<str:video_id>/', views.get_video_caption_file, name='get_video_caption'),
]