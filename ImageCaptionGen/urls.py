from django.urls import path
from .views import CaptionGeneratorView

urlpatterns = [
    path('generate-caption/', CaptionGeneratorView.as_view(), name='generate-caption'),
]

