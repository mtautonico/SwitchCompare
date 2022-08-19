from django.contrib.auth import logout as stock_logout
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
@api_view(["POST"])
def logout(request):
    stock_logout(request._request)
    return JsonResponse({"msg": "success"})
