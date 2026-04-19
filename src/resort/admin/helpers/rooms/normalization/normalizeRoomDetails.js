function normalizeRoomDetails(data) {
  const roomDetailsForServer = {
    title: data.title,
    slug: data.slug,
    blurb: data.blurb,
    description: data.description,
    bullets: data.bullets,
    tags: data.tags,
    price: data.price,
    currency: data.currency,
    features: data.features,
    maxGuests: data.maxGuests,
    sizeM2: data.sizeM2,
    bedType: data.bedType,

    stock: data.stock,
    isActive: data.isActive,
    hero: {
      publicId: data.heroPublicId,
      url: data.heroUrl,
      alt: data.heroAlt,
    },
    gallery: data.gallery || [],
    roomType: data.roomType,
    view: data.view,
  };
  return roomDetailsForServer;
}

export default normalizeRoomDetails;
