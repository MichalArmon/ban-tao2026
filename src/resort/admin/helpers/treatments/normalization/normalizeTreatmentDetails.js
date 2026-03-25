function normalizeTreatmentDetails(data) {
  const TreatmentDetailsForServer = {
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
    images: data.images || [],
  };
  return TreatmentDetailsForServer;
}

export default normalizeTreatmentDetails;
