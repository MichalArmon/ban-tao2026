function normalizeWorkshopDetails(data) {
  const workshopDetailsForServer = {
    title: data.title,
    slug: data.slug,
    blurb: data.blurb,
    description: data.description,
    bullets: data.bullets,
    tags: data.tags,
    price: data.price,
    currency: data.currency,
    category: data.category,

    instructor: data.instructor,
    duration: data.duration,

    level: data.level,

    isActive: data.isActive,
    isPrivate: data.isPrivate,
    isClosed: data.isClosed,

    hero: {
      publicId: data.heroPublicId,
      url: data.heroUrl,
      alt: data.heroAlt,
    },
    gallery: data.gallery || [],
  };
  return workshopDetailsForServer;
}

export default normalizeWorkshopDetails;
