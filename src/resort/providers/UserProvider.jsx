import axios from "axios";
import { createContext, useContext, useState } from "react";

import { useSnackBar } from "./SnackBarProvider";
import normalizeRegisterDetails from "../users/helpers/register/normalization/normalizeRegisterDetails";

import normalizeLoginDetails from "../users/helpers/login/normalization/normalizeLoginDetails";

const URL = "http://localhost:8000";
// const URL = "http://localhost:3000/api/v1";
const UserContext = createContext();

// 2.create provider
export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [OpenLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const { setSnack } = useSnackBar();
  // ✔️✔️✔️GET Users ✔️✔️✔️
  const getUsersFromServer = async () => {
    const response = await axios.get(`${URL}/users`);
    const userData = response.data;
    setUsers(userData);

    console.log(userData);
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
    try {
      const response = await axios.post(
        `${URL}/users/login`,
        loginUserDetailsForServer,
      );
      console.log(response);
      setOpenLogin(false);
      setUser(response.data);
      setSnack("success", "You are Logged in successfully!");
    } catch (error) {
      setSnack("error", error.response.data.message);
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  // ✔️✔️✔️LOG-out ✔️✔️✔️
  const handleLogOutUser = () => {
    setUser(null);
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
      const response = await axios.delete(`${URL}/api/v1/users/${id}`);
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

  return (
    <UserContext.Provider
      value={{
        getUsersFromServer,
        users,
        setUsers,

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
