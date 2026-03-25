export default function initialEditTreatmentValues(treatment) {
  const initialEditTreatmentValuesOBG = {
    title: treatment.title,
    slug: treatment.slug,
    blurb: treatment.blurb,
    description: treatment.description,
    bullets: treatment.bullets,
    tags: treatment.tags,
    price: treatment.price,
    currency: treatment.currency,

    heroPublicId: treatment.hero.publicId,
    heroUrl: treatment.hero.url,

    heroAlt: treatment.hero.alt,
    gallery: treatment.gallery || [],

    therapist: treatment.therapist,
    duration: treatment.duration,

    level: treatment.level,

    isActive: treatment.isActive,
    isPrivate: treatment.isPrivate,
    isClosed: treatment.isClosed,
    intensity: treatment.intensity,
    contraindications: treatment.contraindications,
  };
  return initialEditTreatmentValuesOBG;
}
