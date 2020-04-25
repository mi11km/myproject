from rest_framework import permissions, viewsets

from clubs.models import Club
from .serializers import ClubSerializer, ClubFilter


class ClubViewSet(viewsets.ModelViewSet):
    """ サークルモデルのCRUD用のAPI """
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_class = ClubFilter
