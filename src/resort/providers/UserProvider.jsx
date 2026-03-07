import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import normalizeRoomDetails from "../admin/helpers/rooms/normalization/normalizeRoomDetails";

// 1.create context
const UserContext = createContext();

// 2.create provider
export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [treatments, setTreatments] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // ✔️✔️✔️GET TREATMENTS ✔️✔️✔️
  const HandleRegister = async () => {};

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
}

// 3. create custom hook for using the context(optional)
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("You used the message context of the room provider!");
  }
  return context;
};
