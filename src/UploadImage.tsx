import React, { useState, ChangeEvent } from 'react';

const UploadImage: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    };

    const uploadToS3 = async (url: string, file: File): Promise<void> => {
        try {
            const uploadResponse = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': file.type,
                },
                body: file,
            });

            if (uploadResponse.ok) {
                alert('Image uploaded successfully!');
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Upload failed');
        }
    };

    const handleUpload = async (): Promise<void> => {
        if (!imageFile) {
            alert('Please select an image file');
            return;
        }

        // Get presigned URL
        const presignedUrl = "https://your-api-gateway-url.amazonaws.com/upload-url";
        await uploadToS3(presignedUrl, imageFile);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload} style={{ marginTop: '10px' }}>
                Upload Image
            </button>
        </div>
    );
};

export default UploadImage;