import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

import { useSnackBar } from "./SnackBarProvider";

import {
  getUser,
  setTokenInLocalStorage,
  removeToken,
  getToken,
} from "../../../services/localStorageService";
import normalizeRegisterDetails from "../admin/helpers/users/normalization/normalizeRegisterDetails";
import normalizeLoginDetails from "../admin/helpers/users/normalization/normalizeLoginDetails";
import { useLoading } from "./LoadingProvider";

const URL = "http://localhost:8000";
// const URL = "http://localhost:3000/api/v1";
const UserContext = createContext();

// 2.create provider
export default function UserProvider({ children }) {
  const { setIsLoading } = useLoading();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [OpenLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const { setSnack } = useSnackBar();
  const [favorites, setFavorites] = useState({
    rooms: [],
    treatments: [],
    workshops: [],
  });

  // ✔️✔️✔️GET Users ✔️✔️✔️
  const getUsersFromServer = async () => {
    const response = await axios.get(`${URL}/users`);
    const userData = response.data;
    setUsers(userData);

    console.log(userData);
    return userData;
  };

  // ✔️✔️✔️register User ✔️✔️✔️

  const handleSubmitCreateUser = async (data) => {
    const userDetailsForServer = normalizeRegisterDetails(data);

    try {
      const response = await axios.post(`${URL}/users`, userDetailsForServer);
      console.log(response);
      getUsersFromServer();
      setOpenSignup(false);
      setSnack("success", "Account created successfully!");
      await handleSubmitLoginUser(userDetailsForServer);
    } catch (error) {
      setSnack("error", error.response.data);
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };
  // ✔️✔️✔️LOGIN ✔️✔️✔️
  const handleSubmitLoginUser = async (data) => {
    const loginUserDetailsForServer = normalizeLoginDetails(data);
    console.log("loginUserDetailsForServer:", loginUserDetailsForServer);
    try {
      const response = await axios.post(
        `${URL}/users/login`,
        loginUserDetailsForServer,
      );
      const token = response.data;
      setTokenInLocalStorage(token);
      const user = getUser(response.data);
      console.log(user);
      setOpenLogin(false);
      setUser(user);
      handleGetUserFavorites();
      setSnack("success", "You are Logged in successfully!");
    } catch (error) {
      setSnack("error", error.response.data.message);
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  // ✔️✔️✔️Create User ✔️✔️✔️

  const handleSubmitAdminCreateUser = async (data) => {
    const userDetailsForServer = normalizeRegisterDetails(data);

    try {
      const response = await axios.post(`${URL}/users`, userDetailsForServer);
      console.log(response);
      getUsersFromServer();
      setOpenSignup(false);
    } catch (error) {
      setSnack("error", error.response.data);
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  // ✔️✔️✔️LOG-out ✔️✔️✔️
  const handleLogOutUser = () => {
    setUser(null);
    removeToken();
  };

  // ✔️✔️✔️EDIT User ✔️✔️✔️

  const handleSubmitEditUser = async (id, data) => {
    const userDetailsForServer = normalizeRegisterDetails(data);

    try {
      console.log("data for server", userDetailsForServer);
      const response = await axios.put(
        `${URL}/users/${id}`,
        userDetailsForServer,
      );
      console.log(response);
      getUsersFromServer();
    } catch (error) {
      console.error("General Error Caught:", error);
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data.message);
      }
    }
  };

  // ✔️✔️✔️DELETE User ✔️✔️✔️
  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(`${URL}/users/${id}`);
      await getUsersFromServer();
    } catch (error) {
      console.log(error);
    }
  };

  // ✔️✔️✔️GET User ✔️✔️✔️
  const handleGetUser = async (id) => {
    try {
      setUser(null);
      const response = await axios.get(`${URL}/users/${id}`);
      console.log(response);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✔️✔️✔️LIKE ✔️✔️✔️
  const handleLike = async (entityId, entityType) => {
    const token = getToken();
    if (!token) {
      console.log("Authentication error: please login!");
      return;
    }

    try {
      const response = await axios.patch(
        `${URL}/users/like`,
        {
          entityId,
          entityType,
        },
        { headers: { "x-auth-token": token } },
      );
      console.log(response.data.message);
      const massage = response.data.message;
      setSnack("warning", massage);
      setFavorites(response.data.favorites);
    } catch (error) {
      console.log(error);
    }
  };

  // ✔️✔️✔️GET  USER FAVORITE ✔️✔️✔️
  const handleGetUserFavorites = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await axios.get(`${URL}/users/my-favorites`, {
        headers: { "x-auth-token": token },
      });
      setFavorites(response.data);
    } catch (error) {
      console.error("Failed to fetch favorites", error);
    }
  };
  useEffect(() => {
    if (!user) {
      getUser();
    }
    handleGetUserFavorites();
  }, []);

  return (
    <UserContext.Provider
      value={{
        getUsersFromServer,
        users,
        setUsers,
        handleLike,
        handleGetUserFavorites,
        favorites,

        isDialogOpen,
        setIsDialogOpen,
        handleSubmitCreateUser,
        handleDeleteUser,
        handleGetUser,
        handleSubmitEditUser,
        user,
        setUser,
        OpenLogin,
        setOpenLogin,
        openSignup,
        setOpenSignup,
        handleSubmitLoginUser,
        handleLogOutUser,
        handleSubmitAdminCreateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// 3. create custom hook for using the context(optional)
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("You used the message context of the User provider!");
  }
  return context;
};
