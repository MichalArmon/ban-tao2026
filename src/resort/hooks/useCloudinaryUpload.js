import axios from "axios";
import { useState } from "react";

export default function useCloudinaryUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // ✔️✔️✔️UPLOAD IMG ✔️✔️✔️

  const uploadImage = async (file, folderName) => {
    setIsUploading(true);
    setUploadError(null);
    try {
      const signResponse = await axios.post(
        "http://localhost:3000/api/v1/uploads/sign-cloudinary",
        { folder: folderName },
      );
      const { timestamp, folder, signature, apiKey, cloudName } =
        signResponse.data;

      const formData = new FormData();
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", folder);

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
      );
      setIsUploading(false);
      return {
        url: cloudinaryResponse.data.secure_url,
        publicId: cloudinaryResponse.data.public_id,
      };
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("Error uploading image!");
      setIsUploading(false);
      return null;
    }
  };

  return { uploadImage };
}
