from django.urls import path

from . import views

urlpatterns = [
    path("index/", views.index, name="index"),
    path("project/list/", views.project_list, name="project_list"),
    path("project/add/", views.project_add, name="project_add"),
    path("project/project_id_check/", views.project_id_check, name="project_id_check"),
    path("project/project_update/", views.project_update, name="porject_update"),
    path("project/project_per_list/", views.project_per_list, name="project_per_list"),
    path("project/project_delete/", views.project_delete, name="project_delete"),
    path("batch/list/", views.batch_list, name="batch_list"),
    path("batch/add/", views.batch_add, name="batch_add"),
    path("project/batch_update/", views.batch_update, name="batch_update"),
]