# Generated by Django 4.0.1 on 2022-01-17 08:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_rename_img_source_switch_image_source'),
    ]

    operations = [
        migrations.AlterField(
            model_name='switch',
            name='image',
            field=models.FileField(null=True, upload_to=''),
        ),
    ]
