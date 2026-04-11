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
    label: "Workshops",
    path: ROUTES.workshops,
    icon: null,
  },
];

function PublicLayout(props) {
  return (
    <>
      <UserExtraNav />
      <Header Pages={Pages} top={props.offsetTop || 35} />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default PublicLayout;
