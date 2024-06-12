from django.urls import path
from . import views

urlpatterns = [
    path('stream/<str:video_id>/', views.get_video_stream_format_data, name='get_video_stream_format_data'),
    path('thumbnail/<str:video_id>/', views.get_video_thumbnail, name='get_video_thumbnail'),
    path('tunnel/blob/', views.tunnel_video_blob_content, name='tunnel_video_blob_content'),
]
