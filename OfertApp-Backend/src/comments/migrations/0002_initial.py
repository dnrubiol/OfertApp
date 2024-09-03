# Generated by Django 3.2.16 on 2023-05-25 05:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('publications', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('comments', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='reaction',
            name='user',
            field=models.ForeignKey(db_column='usrId', on_delete=django.db.models.deletion.CASCADE, related_name='reactions', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='comment',
            name='parent',
            field=models.ForeignKey(db_column='parentComId', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='comments.comment'),
        ),
        migrations.AddField(
            model_name='comment',
            name='publication',
            field=models.ForeignKey(db_column='pubId', on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='publications.publication'),
        ),
        migrations.AddField(
            model_name='comment',
            name='user',
            field=models.ForeignKey(db_column='usrId', on_delete=django.db.models.deletion.CASCADE, related_name='comments', to=settings.AUTH_USER_MODEL),
        ),
    ]
