function normalizeTreatmentDetails(data) {
  const treatmentDetailsForServer = {
    title: data.title,
    slug: data.slug,
    category: data.category,
    therapist: data.therapist,
    durationMinutes: data.durationMinutes,

    level: data.level,

    price: data.price,
    currency: data.currency,

    isActive: data.isActive,
    isPrivet: data.isPrivet,
    isClosed: data.isClosed,
    description: data.description,
    hero: {
      publicId: data.heroPublicId,
      url: data.heroUrl,
      alt: data.heroAlt,
    },
    gallery: data.gallery || [],
  };
  return treatmentDetailsForServer;
}

export default normalizeTreatmentDetails;
