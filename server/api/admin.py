from django import forms
from django.contrib import admin
from .models import Switch


class SwitchAdminForm(forms.ModelForm):
    TYPE_CHOICES = (
        ("tactile", "Tactile"),
        ("linear", "Linear"),
        ("clicky", "Clicky")
    )

    MOUNT_CHOICES = (
        ("pcb", "PCB"),
        ("plate", "Plate"),
    )

    type = forms.ChoiceField(choices=TYPE_CHOICES)
    mount = forms.ChoiceField(choices=MOUNT_CHOICES)


class SwitchAdmin(admin.ModelAdmin):
    form = SwitchAdminForm
    list_display = ('id', "brand", "model", 'type', 'mount')
    list_filter = ('brand',)
    search_fields = (
        "brand", "model", "type", "actuation_distance", "bottom_distance", "operating_force", "bottom_force",)


# Register your models here.
admin.site.register(Switch, SwitchAdmin)
