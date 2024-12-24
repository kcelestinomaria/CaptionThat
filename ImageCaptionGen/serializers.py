from rest_framework import serializers

class CaptionSerializer(serializers.Serializer):
    image = serializers.ImageField()

    