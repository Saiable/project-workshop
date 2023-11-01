from django.urls import path

from . import views
app_name = 'fileserver'
urlpatterns = [
    # path('download/<str:filename>/', views.download_file, name='download_file'),
    path('download/', views.download_file, name='download_file'),
]