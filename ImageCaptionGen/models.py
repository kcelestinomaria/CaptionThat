from django.db import models

"""
In this file, we define models
for storing uploaded images & captions
"""

class Caption(models.Model):
    image = models.ImageField(upload_to='images/')
    caption = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.caption[:50]
