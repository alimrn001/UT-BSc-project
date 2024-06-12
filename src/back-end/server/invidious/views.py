from django.shortcuts import render
from django.http import FileResponse, HttpResponseNotFound, JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .invapi import get_search_results, get_video_data


@api_view(['GET'])
def get_invidious_video_data(request, video_id):
    video_data = get_video_data(video_id)
    return Response(video_data)


@api_view(['GET'])
def get_invidious_search_results(request):
    q = request.GET.get('q', '')
    search_type = request.GET.getlist('type', [])
    page = request.GET.get('page', '1')
    search_results = get_search_results(q, search_type, page)
    return Response(search_results)

