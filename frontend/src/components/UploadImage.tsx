import React, { useState } from 'react';
import { uploadImageAndGetCaption } from '../api/CaptionAPI';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

const UploadImage: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [caption, setCaption] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null); // Added state for error handling

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        console.log("Button clicked, image:", image);
        if (image) {
            setLoading(true);
            setIsUploading(true);
            setError(null); // Reset any previous errors
            try {
                const data = await uploadImageAndGetCaption(image);
                console.log("Caption received:", data);
                if (data.caption) {
                    setCaption(data.caption);
                } else {
                    setError("Error: Caption not generated.");
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("Axios error:", error.response?.data || error.message);
                    setError("Error generating caption.");
                } else {
                    console.error("Error during image upload:", error);
                    setError("Error generating caption.");
                }
            } finally {
                setLoading(false);
                setIsUploading(false); // End uploading
            }
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file:cursor-pointer file:rounded file:px-4 file:py-2 file:text-white file:bg-blue-700 hover:file:bg-blue-600 mb-6 w-full"
            />
            <button
                onClick={handleSubmit}
                disabled={isUploading || !image}
                className={`bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg 
                ${isUploading ? 'bg-gray-500' : 'hover:bg-blue-700'} 
                transition duration-300 ease-in-out w-full`}
            >
                {isUploading ? 'Uploading...' : 'Generate Caption'}
            </button>
            
            {/* Display a spinner while uploading */}
            {isUploading && (
                <div className="flex justify-center mt-6">
                    <ClipLoader size={50} color="#0000FF" loading={isUploading} />
                </div>
            )}

            {/* Show the generated caption */}
            {caption && !isUploading && (
                <div className="mt-6 bg-white p-4 rounded-md shadow-md text-center">
                    <h3 className="text-lg font-semibold">Generated Caption:</h3>
                    <p className="text-gray-800 text-base">{caption}</p>
                    <button
                        onClick={() => navigator.clipboard.writeText(caption!)}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Copy Caption
                    </button>
                </div>
            )}

            {/* Display error message */}
            {error && !isUploading && (
                <div className="mt-6 bg-red-500 p-4 rounded-md shadow-md text-center">
                    <h3 className="text-lg font-semibold text-white">Error:</h3>
                    <p className="text-white text-base">{error}</p>
                </div>
            )}
        </div>
    );
};

export default UploadImage;
