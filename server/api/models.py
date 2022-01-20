from django.db import models


def logo_dir_path(instance, filename):
    extension = filename.split('.')[-1]
    new_filename = f"{instance.brand}-{instance.model}.{extension}"
    return new_filename


# Create your models here.
class Switch(models.Model):
    brand = models.CharField(max_length=50)
    model = models.CharField(max_length=50)

    type = models.CharField(max_length=50, null=True)

    actuation_distance = models.DecimalField(max_digits=5, decimal_places=2)
    bottom_distance = models.DecimalField(max_digits=5, decimal_places=2)

    operating_force = models.IntegerField()
    bottom_force = models.IntegerField()

    mount = models.CharField(max_length=50)

    image = models.FileField(upload_to=logo_dir_path, null=True)
    image_source = models.CharField(max_length=50, null=True)
    image_source_url = models.CharField(max_length=250, null=True)

    class Meta:
        verbose_name_plural = "Switches"

    def __str__(self):
        return f"Switch({self.brand}, {self.model})"

    def __repr__(self):
        return f"Switch({self.brand}, {self.model})"
