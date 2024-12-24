#from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import Caption
from .utils import generate_caption
from .serializers import CaptionSerializer

"""
Here, we handle image uploads
and AI caption generation
"""
class CaptionGeneratorView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        print("Request Data:", request.data)  # Debugging: Check all data in request
        print("Files:", request.FILES)  # Debugging: Check the uploaded files

        serializer = CaptionSerializer(data=request.data)
        if serializer.is_valid():
            # Save the image and generate caption
            file_obj = serializer.validated_data['image']
            caption_obj = Caption.objects.create(image=file_obj)

            # Generate caption
            caption_path = caption_obj.image.path
            generated_caption = generate_caption(caption_path)
            caption_obj.caption = generated_caption
            caption_obj.save()

            return Response({
                "id": caption_obj.id,
                "image_url": caption_obj.image.url,
                "caption": caption_obj.caption,
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
