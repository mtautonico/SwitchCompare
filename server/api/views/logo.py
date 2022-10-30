from django.http import HttpResponse


def navlogo(response):
    if response.method == "GET":
        with open(f"api/static/navbar-logo.png", "rb") as i:
            return HttpResponse(i.read(), content_type="image/png")
    else:
        return HttpResponse(status=405)
