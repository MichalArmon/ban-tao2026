import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import normalizeRoomDetails from "../admin/helpers/normalization/normalizeRoomDetails";

// 1.create context
const RoomContext = createContext();

// 2.create provider
export default function RoomProvider({ children }) {
  const [rooms, setRooms] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [filteredRooms, setFilteredRooms] = useState([]);
  // ✔️✔️✔️GET ROOMS ✔️✔️✔️
  const getRoomsFromServer = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/rooms");
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
      console.log("data for server", roomDetailsForServer);
      const response = await axios.post(
        "http://localhost:3000/api/v1/rooms",
        roomDetailsForServer,
      );
      console.log(response);
      getRoomsFromServer();
      setIsDialogOpen(false);
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
      const response = await axios.delete(
        `http://localhost:3000/api/v1/rooms/${id}`,
      );
      await getRoomsFromServer();
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
