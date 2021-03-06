# Generated by Django 4.0.1 on 2022-01-15 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_switch_type'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='switch',
            options={'verbose_name_plural': 'Switches'},
        ),
        migrations.AddField(
            model_name='switch',
            name='image',
            field=models.FileField(null=True, upload_to='media/'),
        ),
        migrations.AddField(
            model_name='switch',
            name='img_source',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
