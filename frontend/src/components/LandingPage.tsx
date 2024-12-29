import React, { useState } from 'react';
import { uploadImageAndGetCaption } from '../api/CaptionAPI';
import { ClipLoader } from 'react-spinners';

const LandingPage: React.FC = () => {
  // State to manage image file, caption, and upload status
  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Handles image selection
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  // Handles the submit action for uploading the image and generating a caption
  const handleSubmit = async () => {
    if (image) {
      setIsUploading(true); // Set uploading state to true

      try {
        const data = await uploadImageAndGetCaption(image); // Upload image and get caption
        setCaption(data.caption); // Set the caption received from the backend
      } catch (error) {
        console.error("Error uploading image or generating caption:", error);
        setCaption('Error generating caption'); // Set error message in case of failure
      } finally {
        setIsUploading(false); // End the uploading process
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white flex flex-col justify-center items-center text-center">
      {/* Hero Section */}
      <div className="max-w-4xl p-6 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to the Image Caption Generator</h1>
        <p className="text-lg md:text-xl mb-6">Upload your image and let our AI generate a smart caption for you.</p>

        {/* File Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload} // Set the image when the user uploads a file
          className="file:cursor-pointer file:rounded file:px-4 file:py-2 file:text-white file:bg-blue-700 hover:file:bg-blue-600 mb-6"
        />

        {/* Button for generating caption */}
        <button
          onClick={handleSubmit} // Trigger caption generation on button click
          disabled={isUploading || !image} // Disable button if uploading or no image selected
          className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg 
                    hover:bg-blue-700 transition duration-300 ease-in-out w-full"
        >
          {isUploading ? 'Uploading...' : 'Generate Caption'} {/* Button text changes based on upload status */}
        </button>

        {/* Show a loading spinner when uploading */}
        {isUploading && (
          <div className="flex justify-center mt-6">
            <ClipLoader size={50} color="#ffffff" loading={isUploading} />
          </div>
        )}

        {/* Display generated caption if available */}
        {caption && !isUploading && (
          <div className="mt-6 bg-white p-4 rounded-md shadow-md text-center">
            <h3 className="text-lg font-semibold text-black">Generated Caption:</h3>
            <p className="text-gray-800 text-base">{caption}</p>

            {/* Button to copy the generated caption */}
            <button
              onClick={() => navigator.clipboard.writeText(caption!)} // Copy the caption to clipboard
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Copy Caption
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
