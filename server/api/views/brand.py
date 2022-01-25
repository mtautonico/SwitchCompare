from django.http import HttpResponse, JsonResponse
from django.forms.models import model_to_dict
from ..models import Brand


def brand(request, name=None):
    if request.method == "GET":

        if name:
            brand_objects = Brand.objects.filter(name__iexact=name)
        else:
            brand_objects = Brand.objects.all()

        brand_list = []
        for item in brand_objects:

            json_brand = model_to_dict(item, fields=['name', 'website'])
            json_brand['logo'] = item.logo.url
            brand_list.append(json_brand)
        payload = {
            "status": "success",
            "data": brand_list
        }
        return JsonResponse(payload)
    else:
        return HttpResponse(status=405)
