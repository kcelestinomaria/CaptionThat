import axios from 'axios';

const API_URL ='http://127.0.0.1:8000/api/generate-caption/';

export const uploadImageAndGetCaption = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};