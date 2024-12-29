import axios from 'axios';

// Replace with your actual API endpoint URL if needed
const API_URL = 'http://127.0.0.1:8000/api/generate-caption/';

/**
 * Uploads an image and retrieves a generated caption.
 * @param {File} file - The image file to be uploaded.
 * @returns {Promise<{ caption: string }>} - The generated caption for the uploaded image.
 */
export const uploadImageAndGetCaption = async (file: File): Promise<{ caption: string }> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
        // Sending POST request to the server to generate the caption
        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Ensure the server handles this as a form-data upload
            },
        });

        // Debugging: log the response to verify the data returned from the backend
        console.log('Response from backend:', response);

        // If the response is successful and contains a caption
        if (response.status === 201 && response.data.caption) {
            return { caption: response.data.caption }; // Return the caption if available in the response
        } else {
            // Handle cases where the caption is not returned or response status is not 200/201
            console.error('Failed to generate caption, response data:', response.data);
            throw new Error('Failed to generate caption: Missing or invalid caption data');
        }
    } catch (error: any) {
        // Log error and provide more detailed information if possible
        console.error('Error uploading image:', error.response ? error.response.data : error.message);
        
        // Provide additional feedback in the error message
        throw new Error('Error uploading image or generating caption. Please check the backend or image upload.');
    }
};
