from django.http import HttpResponse, JsonResponse
from django.forms.models import model_to_dict

from ..models import Switch


# /api/switch/brand/model/
def switch(request, brand=None, model=None):
    if request.method == "GET":
        if brand:

            switch_objects = Switch.objects.filter(brand__iexact=brand)

            if model:
                switch_objects = switch_objects.filter(model__iexact=model)

            switch_list = []

            for switch in switch_objects:
                image_url = switch.image.url
                json_switch = model_to_dict(switch, fields=[field.name for field in switch._meta.fields if field.name != "image"])
                json_switch["image"] = image_url
                switch_list.append(json_switch)

            return JsonResponse({"status": "success", "data": switch_list})

        else:
            switch_objects = Switch.objects.all()

            switch_list = []

            for switch in switch_objects:
                image_url = switch.image.url
                json_switch = model_to_dict(switch, fields=[field.name for field in switch._meta.fields if field.name != "image"])
                json_switch["image"] = image_url
                switch_list.append(json_switch)

            payload = {
                "status": "success",
                "data": switch_list
            }
            return JsonResponse(payload)
    else:
        return HttpResponse(status=405)
