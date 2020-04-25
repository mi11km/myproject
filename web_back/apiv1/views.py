from django.contrib.auth.models import User
from rest_framework import generics, permissions, viewsets

from clubs.models import Club
from .serializers import ClubSerializer, ClubFilter


class ClubViewSet(viewsets.ModelViewSet):
    """ サークルモデルのCRUD用のAPI """
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_class = ClubFilter


class UserDelete(generics.DestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]
