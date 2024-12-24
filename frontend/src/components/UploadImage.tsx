import React, { useState } from 'react';
import { uploadImageAndGetCaption } from '../api/CaptionAPI';
import axios from 'axios';

const UploadImage: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [caption, setCaption] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (image) {
            setLoading(true);
            try {
                const data = await uploadImageAndGetCaption(image);
                setCaption(data.caption);
            } catch(error) {
                if (axios.isAxiosError(error)) {
                    console.error("Axios error:", error.response?.data || error.message);
                } else {
                    console.error("Error during image upload:", error);
                }
                setCaption('Error generating caption');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Uploading...' : 'Generate Caption'}
            </button>
            {caption && (
                <div>
                    <h3>Generated Caption:</h3>
                    <p>{caption}</p>
                </div>
            )}
        </div>
    );
};

export default UploadImage;