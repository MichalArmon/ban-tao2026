const initialTreatmentValues = {
  title: "Signature Coconut Oil Massage",
  slug: "signature-coconut-oil-massage",
  blurb:
    "A deeply relaxing full-body massage using warm, locally sourced organic coconut oil.",
  description:
    "Melt away stress with our signature Ban-Tao massage. Our expert therapists use long, flowing strokes combined with the nourishing properties of warm organic coconut oil to hydrate your skin and soothe tired muscles. Perfect for unwinding after a long day of surfing or exploring the island.",
  bullets: [
    "Warm organic coconut oil",
    "Deep tissue relaxation techniques",
    "Hydrates and nourishes the skin",
  ],
  tags: ["massage", "coconut-oil", "relaxation", "full-body"],
  price: 2500,
  currency: "THB",

  heroPublicId: "ban-tao/treatments/coconut-massage/hero",
  heroUrl:
    "https://res.cloudinary.com/dhje7hbxd/image/upload/v1730890000/ban-tao/treatments/coconut-massage/hero.jpg",
  heroAlt: "Therapist pouring warm coconut oil",

  gallery: [
    {
      publicId: "ban-tao/treatments/coconut-massage/gallery1",
      url: "https://res.cloudinary.com/dhje7hbxd/image/upload/v1730890000/ban-tao/treatments/coconut-massage/gallery1.jpg",
      alt: "Relaxing massage room setup",
    },
    {
      publicId: "ban-tao/treatments/coconut-massage/gallery2",
      url: "https://res.cloudinary.com/dhje7hbxd/image/upload/v1730890000/ban-tao/treatments/coconut-massage/gallery2.jpg",
      alt: "Fresh coconuts and massage oils",
    },
  ],

  therapist: "Mali",
  duration: 90, // זכרי שבסכמה הגדרנו את זה כמספר (דקות)
  level: "all",

  isActive: true,
  isPrivate: true,
  isClosed: false,
  intensity: "medium",
  contraindications: [],
};

export default initialTreatmentValues;
