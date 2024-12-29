from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import Caption
from .utils import generate_caption
from .serializers import CaptionSerializer

class CaptionGeneratorView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        print("Request Data:", request.data)  # Debugging: Check all data in request
        print("Files:", request.FILES)  # Debugging: Check the uploaded files

        # Ensure that the file is being validated properly through the serializer
        serializer = CaptionSerializer(data=request.data)
        if serializer.is_valid():
            # Save the image and generate caption
            file_obj = serializer.validated_data['image']
            caption_obj = Caption.objects.create(image=file_obj)

            # Generate caption
            try:
                caption_path = caption_obj.image.path  # Get the path to the image
                generated_caption = generate_caption(caption_path)
                
                # If caption generation fails or returns empty, handle it.
                if not generated_caption:
                    return Response({"error": "Failed to generate a caption."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
                caption_obj.caption = generated_caption
                caption_obj.save()

                return Response({
                    "id": caption_obj.id,
                    "image_url": caption_obj.image.url,
                    "caption": caption_obj.caption,
                }, status=status.HTTP_201_CREATED)

            except Exception as e:
                # Catch any error during caption generation
                print(f"Error generating caption: {e}")
                return Response({"error": "Error generating caption."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # If the serializer is not valid, return error
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
