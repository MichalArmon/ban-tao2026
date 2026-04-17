import useCloudinaryUpload from "./useCloudinaryUpload";

export default function useUploadImages(setFormDetails, type) {
  const { uploadImage } = useCloudinaryUpload();
  const handleUploadGalleryImage = async (event, slug) => {
    const file = event.target.files[0];
    if (!file) return;
    const uploadedData = await uploadImage(file, `ban-tao/${type}/${slug}`);
    if (uploadedData) {
      setFormDetails((prev) => ({
        ...prev,
        gallery: [
          ...(prev.gallery || []),
          {
            publicId: uploadedData.publicId,
            url: uploadedData.url,
            alt: uploadedData.alt,
          },
        ],
      }));
    }
  };
  const handleUploadHeroImage = async (event, slug) => {
    const file = event.target.files[0];
    if (!file) return;

    // מעלים את התמונה ומקבלים חזרה נתונים מ-Cloudinary
    const uploadedData = await uploadImage(
      file,
      `ban-tao/${type}/${slug}/hero`,
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
      gallery: (prev.gallery || []).filter(
        (_, index) => index !== indexToRemove,
      ),
    }));
  };
  return {
    handleUploadHeroImage,
    handleUploadGalleryImage,
    handleDeleteImageFromGallery,
  };
}
