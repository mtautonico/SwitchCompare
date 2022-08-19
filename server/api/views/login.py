from django.contrib.auth import authenticate
from django.contrib.auth import login as stock_login
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.permissions import AllowAny


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    if request.user.is_authenticated:
        return JsonResponse({}, status=200)

    if request.method == "POST":
        username = request.data.get("username")
        password = request.data.get("password")
        if not username or not password:
            return JsonResponse({"msg": "invalid data"}, status=403)

        user = authenticate(request._request, username=username, password=password)
        # login(request, user, backend='django.contrib.auth.backends.ModelBackend')
        stock_login(request._request, user)

        return JsonResponse({"msg": "success"})
