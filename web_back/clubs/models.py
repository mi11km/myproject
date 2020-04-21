import uuid

from django.contrib.auth.models import User
from django.db import models


class Club(models.Model):
    class Meta:
        db_table = 'club'
        ordering = ['modified_at']

    CLUB_KINDS_CHOICES = [
        ('運動系', '運動系'), ('文化系', '文化系'),
        ('技術系', '技術系'), ('音楽系', '音楽系'), ('委員会系', '委員会系')]
    IS_OFFICIALLY_APPROVED_CHOICES = [('公認', '公認'), ('非公認', '非公認')]

    user = models.OneToOneField(User, unique=True, on_delete=models.CASCADE)

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    name = models.CharField(verbose_name='サークル名', max_length=100)
    university = models.CharField(verbose_name='主要大学', max_length=50)
    kind = models.CharField(verbose_name='サークルの系統', max_length=10,
                            choices=CLUB_KINDS_CHOICES)
    is_officially_approved = models.CharField(verbose_name='大学公認かどうか', max_length=5,
                                              choices=IS_OFFICIALLY_APPROVED_CHOICES)
    image = models.ImageField(upload_to='media/profile/', blank=True, null=True)

    activity = models.TextField(verbose_name='活動内容', blank=True, null=True)
    message = models.TextField(verbose_name='メッセージ', blank=True, null=True)

    def __str__(self):
        return self.name
