export default function initialEditRoomValues(room) {
  const initialEditRoomValuesOBG = {
    title: room.title,
    slug: room.slug,
    blurb: room.blurb,

    features: room.features,
    maxGuests: room.maxGuests,
    sizeM2: room.sizeM2,
    bedType: room.bedType,
    priceBase: room.priceBase,
    currency: room.currency,
    stock: room.stock,
    active: room.active,

    heroPublicId: room.hero.publicId,
    heroUrl: room.hero.url,

    heroAlt: room.hero.alt,
    images: room.images || [],
  };
  return initialEditRoomValuesOBG;
}
