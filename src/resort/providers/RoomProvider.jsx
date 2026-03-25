import axios from "axios";
import { createContext, useContext, useState } from "react";
import normalizeRoomDetails from "../admin/helpers/rooms/normalization/normalizeRoomDetails";
import { useSnackBar } from "./SnackBarProvider";
const URL = "http://localhost:8000";
// const URL = "http://localhost:3000/api/v1";
const RoomContext = createContext();

// 2.create provider
export default function RoomProvider({ children }) {
  const [room, setRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [filteredRooms, setFilteredRooms] = useState([]);

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
      const response = await axios.delete(`${URL}/api/v1/rooms/${id}`);
      await getRoomsFromServer();
    } catch (error) {
      console.log(error);
    }
  };

  // ✔️✔️✔️GET ROOM ✔️✔️✔️
  const handleGetRoom = async (id) => {
    try {
      setRoom(null);
      const response = await axios.get(`${URL}/api/v1/rooms/${id}`);
      console.log(response);
      setRoom(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
