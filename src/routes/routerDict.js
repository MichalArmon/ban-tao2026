export const ROUTES = {
  home: "/resort",
  about: "/resort/about",
  register: "/resort/register",
  login: "/resort/login",
  rooms: "/resort/rooms",
  treatments: "/resort/treatments",
  workshops: "/resort/workshops",

  thankYou: "/resort/thank-you",
};
// export const ADMIN_ROUTES = {
//   home: "/admin",
//   rooms: "/admin/rooms",

//   createRoom: "/admin/rooms/new",
//   updateRoom: "/admin/rooms/edit/:id",
//   retreats: "/admin/retreats",
//   createRetreats: "/admin/retreats/new",
//   updateRetreat: "/admin/retreats/edit/:id",
//   treatments: "/admin/treatments",
//   workshops: "/admin/workshops",
//   sessions: "/admin/sessions",
//   users: "/admin/users",
//   orders: "/admin/orders",
//   roomReservation: "/admin/rooms/reservations",
//   workshopReservation: "/admin/workshops/reservations",
//   recRules: "/admin/rules",
// };

export const ADMIN_ROUTES = {
  home: "/admin",
  rooms: "/admin/rooms",

  createRoom: "/admin/rooms/new",
  updateRoom: "/admin/rooms/edit/:id",

  retreats: "/admin/retreats",
  createRetreats: "/admin/retreats/new",
  updateRetreat: "/admin/retreats/edit/:id",

  treatments: "/admin/treatments",
  workshops: "/admin/workshops",
  sessions: "/admin/sessions",
  users: "/admin/users",

  // 👇 זה נשאר ראשי
  orders: "/admin/orders",

  // 👇 אלה נהיים children (ללא / בהתחלה!)
  roomReservation: "room-reservations",
  workshopReservation: "workshop-reservations",
  treatmentReservation: "treatment-reservations",

  recRules: "/admin/rules",
};
