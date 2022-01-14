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

            switch_list = [model_to_dict(switch_object) for switch_object in switch_objects]

            return JsonResponse({"status": "success", "data": switch_list})

        else:
            switch_objects = Switch.objects.all()

            payload = {
                "status": "success",
                "data": [model_to_dict(switch_object) for switch_object in switch_objects]
            }
            return JsonResponse(payload)
    else:
        return HttpResponse(status=405)
