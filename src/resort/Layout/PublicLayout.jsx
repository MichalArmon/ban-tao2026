import { ROUTES } from "../../routes/routerDict";
import Header from "./header/Header";

import Main from "./main/Main";
import { Outlet } from "react-router-dom";
import UserExtraNav from "./header/UserExtraNav";

const Pages = [
  {
    label: "Home",
    path: ROUTES.home,
    icon: null,
  },
  {
    label: "About",
    path: ROUTES.about,
    icon: null,
  },
  {
    label: "Rooms",
    path: ROUTES.rooms,
    icon: null,
  },
  {
    label: "Treatments",
    path: ROUTES.treatments,
    icon: null,
  },
  {
    label: "Favorites",
    path: ROUTES.favorite,
    icon: null,
  },
  {
    label: "Sand Box",
    path: ROUTES.sandBox,
    icon: null,
  },
  {
    label: "Register",
    path: ROUTES.register,
    icon: null,
  },

  {
    label: "Login",
    path: ROUTES.login,
    icon: null,
  },
];

function PublicLayout() {
  return (
    <>
      <UserExtraNav />
      <Header Pages={Pages} />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default PublicLayout;
