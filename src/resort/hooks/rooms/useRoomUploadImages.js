import useCloudinaryUpload from "../useCloudinaryUpload";

export default function useRoomUploadImages(setFormDetails, type) {
  const { uploadImage } = useCloudinaryUpload();
  const handleUploadGalleryImage = async (event, roomSlug) => {
    const file = event.target.files[0];
    if (!file) return;
    const uploadedData = await uploadImage(file, `ban-tao/${type}/${roomSlug}`);
    if (uploadedData) {
      setFormDetails((prev) => ({
        ...prev,
        images: [
          ...(prev.images || []),
          {
            publicId: uploadedData.publicId,
            url: uploadedData.url,
            alt: uploadedData.alt,
          },
        ],
      }));
    }
  };
  const handleUploadHeroImage = async (event, roomSlug) => {
    const file = event.target.files[0];
    if (!file) return;

    // מעלים את התמונה ומקבלים חזרה נתונים מ-Cloudinary
    const uploadedData = await uploadImage(
      file,
      `ban-tao/rooms/${roomSlug}/hero`,
    );

    if (uploadedData) {
      setFormDetails((prev) => ({
        ...prev,
        // דורסים את אובייקט ה-hero הקיים עם הנתונים החדשים

        heroPublicId: uploadedData.publicId,
        heroUrl: uploadedData.url,
        heroAlt: "hero image",
      }));
    }
  };
  const handleDeleteImageFromGallery = (indexToRemove) => {
    setFormDetails((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };
  return {
    handleUploadHeroImage,
    handleUploadGalleryImage,
    handleDeleteImageFromGallery,
  };
}
