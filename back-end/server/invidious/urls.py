from django.urls import path
from . import views

urlpatterns = [
    path('videos/<str:video_id>/', views.get_invidious_video_data, name='get_invidious_video_data'),
    path('search/', views.get_invidious_search_results, name='get_invidious_search_results'),
]