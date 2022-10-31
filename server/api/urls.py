from django.urls import path
from .views import *


urlpatterns = [
    path("switch/", switch.switch),
    path("switch/<str:brand>", switch.switch),
    path("switch/<str:brand>/<str:model>", switch.switch),
    path("brand/", brand.brand),
    path("brand/<str:name>", brand.brand),
    path("logo/", logo.navlogo),
]
