from django.http import HttpResponse, JsonResponse
from django.forms.models import model_to_dict

from ..models import Switch


# /api/switch/brand/model/
def switch(request, brand=None, model=None):
    if request.method == "GET":
        if brand:
            switch_objects = Switch.objects.filter(brand__name__iexact=brand)
            if model:
                switch_objects = switch_objects.filter(model__iexact=model)
        else:
            switch_objects = Switch.objects.all()

        switch_list = []

        for switch_obj in switch_objects:
            image_url = switch_obj.image.url
            brand_image_url = switch_obj.brand.logo.url

            json_switch = model_to_dict(switch_obj, fields=[field.name for field in switch_obj._meta.fields if
                                                            field.name not in ["image", "brand_image"]])
            json_switch["image"] = image_url
            json_switch["brand_image"] = brand_image_url
            json_switch["brand"] = switch_obj.brand.name
            switch_list.append(json_switch)

        payload = {
            "status": "success",
            "data": switch_list
        }
        return JsonResponse(payload)
    else:
        return HttpResponse(status=405)
