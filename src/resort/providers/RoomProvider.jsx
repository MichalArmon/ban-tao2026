import axios from "axios";
import { createContext, useCallback, useContext, useState } from "react";
import normalizeRoomDetails from "../admin/helpers/rooms/normalization/normalizeRoomDetails";

import { useSnackBar } from "./SnackBarProvider";
import dayjs from "dayjs";
import { useUser } from "./UserProvider";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routerDict";

const URL = "http://localhost:8000";
// const URL = "http://localhost:3000/api/v1";
const RoomContext = createContext();

const today = dayjs().format("ddd, MMM D, YYYY");

const tomorrow = dayjs().add(1, "day").format("ddd, MMM D, YYYY");

// 2.create provider
export default function RoomProvider({ children }) {
  const [room, setRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guestsCount, setGuestsCount] = useState(0);
  const [reservationId, setReservationId] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [filteredRooms, setFilteredRooms] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  const { setSnack } = useSnackBar();
  // ✔️✔️✔️GET ROOMS ✔️✔️✔️
  const getRoomsFromServer = async () => {
    const response = await axios.get(`${URL}/rooms`);
    const roomData = response.data;
    setRooms(roomData);
    setFilteredRooms(roomData);
    console.log(roomData);
  };

  const handleChange = (event) => {
    const value = event.target.value.toLowerCase();
    console.log(value);

    setFilteredRooms(
      rooms.filter((room) =>
        room.name.official.toLowerCase().trim().includes(value),
      ),
    );
  };

  // ✔️✔️✔️CREATE ROOM ✔️✔️✔️

  const handleSubmitCreateRoom = async (data) => {
    const roomDetailsForServer = normalizeRoomDetails(data);

    try {
      const response = await axios.post(`${URL}/rooms`, roomDetailsForServer);
      console.log(response);
      getRoomsFromServer();
      setIsDialogOpen(false);
      setSnack("success", "Data saved successfully!");
    } catch (error) {
      setSnack("error", error.response.data);
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  // ✔️✔️✔️EDIT ROOM ✔️✔️✔️

  const handleSubmitEditRoom = async (id, data) => {
    const roomDetailsForServer = normalizeRoomDetails(data);

    try {
      console.log("data for server", roomDetailsForServer);
      const response = await axios.put(
        `${URL}/rooms/${id}`,
        roomDetailsForServer,
      );
      console.log(response);
      getRoomsFromServer();
    } catch (error) {
      console.error("General Error Caught:", error);
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data.message);
      }
    }
  };

  // ✔️✔️✔️DELETE ROOM ✔️✔️✔️
  const handleDeleteRoom = async (id) => {
    try {
      const response = await axios.delete(`${URL}/rooms/${id}`);
      await getRoomsFromServer();
    } catch (error) {
      console.log(error);
    }
  };

  // ✔️✔️✔️GET ROOM By SLUG✔️✔️✔️
  const handleGetRoomBySlug = async (slug) => {
    try {
      console.log("handleGetRoomBySlug got slug:", slug);
      setRoom(null);

      const response = await axios.get(`${URL}/rooms/${slug}`);
      console.log("server response:", response);

      setRoom(response.data);
      return response.data;
    } catch (error) {
      console.log("get room by slug error:", error);
    }
  };
  // ✔️✔️✔️GET ROOM By ID✔️✔️✔️
  const handleGetRoom = async (id) => {
    try {
      setRoom(null);
      const response = await axios.get(`${URL}/rooms/id/${id}`);
      console.log(response);
      setRoom(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // ✔️✔️✔️ ROOM AVAILABILITY ✔️✔️✔️
  const handleGetRoomsAvailability = useCallback(
    async ({ checkIn, checkOut, roomType, guestsCount }) => {
      try {
        setRoom(null);

        const response = await axios.get(
          `${URL}/rooms/availability?checkIn=${checkIn}&checkOut=${checkOut}&roomType=${roomType}&guestsCount=${guestsCount}`,
        );
        console.log(response);
        setFilteredRooms(response.data);
        console.log("rooms:", filteredRooms);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setGuestsCount(guestsCount);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    [],
  ); // <--- המערך הריק הזה הוא הקסם שעוצר את הלולאה!

  return (
    <RoomContext.Provider
      value={{
        getRoomsFromServer,
        rooms,
        setRooms,
        handleChange,
        filteredRooms,
        isDialogOpen,
        setIsDialogOpen,
        handleSubmitCreateRoom,
        handleDeleteRoom,
        handleGetRoom,
        handleSubmitEditRoom,
        room,
        setRoom,
        handleGetRoomsAvailability,

        setReservationId,
        reservationId,

        setFilteredRooms,
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        handleGetRoomBySlug,
        guestsCount,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

// 3. create custom hook for using the context(optional)
export const useRoom = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("You used the message context of the room provider!");
  }
  return context;
};
