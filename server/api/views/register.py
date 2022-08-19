"""
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login

@api_view(["POST"])
def register(request):
    if request.user.is_authenticated:
        return JsonResponse({}, status=304)

    if request.method == "POST":
        username = request.data.get("username")
        password = request.data.get("password")
        if not username or not password:
            return JsonResponse({"msg": "invalid data"}, status=403)

        user = User(username=username, password=password)

        user.save()

        user = authenticate(username=username, password=password)

        login(request, user, backend='django.contrib.auth.backends.ModelBackend')

        return JsonResponse({"msg": "success"})
"""

from django.contrib.auth import get_user_model

from rest_framework import status, serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = "__all__"


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    VALID_USER_FIELDS = [f.name for f in get_user_model()._meta.fields]
    DEFAULTS = {
        # you can define any defaults that you would like for the user, here
    }
    serialized = UserSerializer(data=request.data)
    if serialized.is_valid():
        user_data = {field: data for (field, data) in request.data.items() if field in VALID_USER_FIELDS}
        user_data.update(DEFAULTS)
        user = get_user_model().objects.create_user(
            **user_data
        )
        return Response(UserSerializer(instance=user).data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)
