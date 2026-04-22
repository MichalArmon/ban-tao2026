import { ADMIN_ROUTES } from "../../routes/routerDict";
import Header from "./header/Header";

import Main from "./main/Main";
import { Outlet } from "react-router-dom";
import AdminOrderPageNev from "./header/AdminOrderPageNev";

const Pages = [
  {
    label: "rooms",
    path: ADMIN_ROUTES.rooms,
  },
  {
    label: "treatments",
    path: ADMIN_ROUTES.treatments,
  },
  {
    label: "workshops",
    path: ADMIN_ROUTES.workshops,
  },
  {
    label: "users",
    path: ADMIN_ROUTES.users,
  },

  {
    label: "retreats",
    path: ADMIN_ROUTES.retreats,
  },
  {
    label: "orders",
    path: ADMIN_ROUTES.orders,
  },
  {
    label: "sessions",
    path: ADMIN_ROUTES.sessions,
  },
  {
    label: "rec rules",
    path: ADMIN_ROUTES.recRules,
  },
];

function AdminOrdersPageLayout() {
  return (
    <>
      <Header Pages={Pages} />
      <AdminOrderPageNev />
      <Main paddingTop={1}>
        <Outlet />
      </Main>
    </>
  );
}

export default AdminOrdersPageLayout;
