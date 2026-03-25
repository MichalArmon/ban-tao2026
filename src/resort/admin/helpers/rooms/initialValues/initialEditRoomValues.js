export default function initialEditRoomValues(room) {
  const initialEditRoomValuesOBG = {
    title: room.title,
    slug: room.slug,
    blurb: room.blurb,
    description: room.description,
    bullets: room.bullets,
    tags: room.tags,
    price: room.price,
    currency: room.currency,
    heroPublicId: room.hero.publicId,
    heroUrl: room.hero.url,
    isActive: room.isActive,

    heroAlt: room.hero.alt,
    gallery: room.gallery || [],

    features: room.features,
    maxGuests: room.maxGuests,
    sizeM2: room.sizeM2,
    bedType: room.bedType,

    stock: room.stock,
  };
  return initialEditRoomValuesOBG;
}
