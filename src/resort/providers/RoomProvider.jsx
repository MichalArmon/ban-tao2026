import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

// 1.create context
const RoomContext = createContext();

// 2.create provider
export default function RoomProvider({ children }) {
  const [rooms, setRooms] = useState([]);

  const [filteredRooms, setFilteredRooms] = useState([]);

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

  return (
    <RoomContext.Provider
      value={{
        getRoomsFromServer,
        rooms,
        setRooms,
        handleChange,
        filteredRooms,
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
