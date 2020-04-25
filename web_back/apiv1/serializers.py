from django_filters import rest_framework as filters
from rest_framework import serializers

from clubs.models import Club


class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = '__all__'


class ClubFilter(filters.FilterSet):
    activity = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Club
        fields = ['kind', 'is_officially_approved', 'activity']
