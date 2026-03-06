function normalizeRoomDetails(data) {
  const roomDetailsForServer = {
    title: data.title,
    slug: data.slug,
    blurb: data.blurb,

    features: data.features,
    maxGuests: data.maxGuests,
    sizeM2: data.sizeM2,
    bedType: data.bedType,
    priceBase: data.priceBase,
    currency: data.currency,
    stock: data.stock,
    active: data.active,
    hero: {
      publicId: data.heroPublicId,
      url: data.heroUrl,
      alt: data.heroAlt,
    },
    images: data.images || [],
  };
  return roomDetailsForServer;
}

export default normalizeRoomDetails;
