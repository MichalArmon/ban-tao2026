export default function initialEditWorkshopValues(workshop) {
  const initialEditWorkshopValuesOBG = {
    title: workshop.title,
    slug: workshop.slug,
    blurb: workshop.blurb,
    description: workshop.description,
    bullets: workshop.bullets,
    tags: workshop.tags,
    price: workshop.price,
    currency: workshop.currency,

    heroPublicId: workshop.hero.publicId,
    heroUrl: workshop.hero.url,

    heroAlt: workshop.hero.alt,
    gallery: workshop.gallery || [],

    instructor: workshop.instructor,
    duration: workshop.duration,

    level: workshop.level,

    isActive: workshop.isActive,
    isPrivate: workshop.isPrivate,
    isClosed: workshop.isClosed,
  };
  return initialEditWorkshopValuesOBG;
}
