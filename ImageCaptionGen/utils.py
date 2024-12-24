from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image 

"""
Here we use the Hugging Face Transformers Library
to implement an image-captioning model.
For simplicity, we'll use a pre-trained model
like BLIP
"""

# Load model and processor (do this once to save time)
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

def generate_caption(image_path):
    image = Image.open(image_path).convert("RGB")
    inputs = processor(image, return_tensors="pt")
    output = model.generate(**inputs)
    caption = processor.decode(output[0], skip_special_tokens=True)
    return caption

