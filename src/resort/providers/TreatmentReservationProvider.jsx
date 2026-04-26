import axios from "axios";
import { createContext, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routerDict";
import { useRoom } from "./RoomProvider";
import { useUser } from "./UserProvider";
import normalizeRoomReservation from "../admin/helpers/roomReservations/normalization/normalizeRoomReservationDetails";

const URL = "http://localhost:8000";
// const URL = "http://localhost:3000/api/v1";
const RoomReservationContext = createContext();

// 2.create provider
export default function RoomReservationProvider({ children }) {
  const { checkIn, setCheckIn, guestsCount, checkOut, setCheckOut } = useRoom();
  const [roomReservation, setRoomReservation] = useState(null);
  const [roomReservations, setRoomReservations] = useState([]);

  const [reservationId, setReservationId] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [filteredRoomReservations, setFilteredRoomReservations] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  // ✔️✔️✔️GET RoomReservationS ✔️✔️✔️
  const getRoomReservationsFromServer = async () => {
    const response = await axios.get(`${URL}/room-reservations`);
    const roomReservationData = response.data;
    setRoomReservations(roomReservationData);
    console.log(roomReservationData);
    return roomReservationData;
  };

  // ✔️✔️✔️ CREATE Room RESERVATION ✔️✔️✔️

  const handleCreateRoomReservation = async (reservation) => {
    try {
      sessionStorage.removeItem("currentRoomReservationId");
      const response = await axios.post(
        `${URL}/room-reservations`,
        reservation,
      );

      const newId = response.data?._id;
      setReservationId(newId);
      sessionStorage.setItem("currentRoomReservationId", String(newId));
      console.log(
        "ID Saved to storage:",
        sessionStorage.getItem("currentRoomReservationId"),
      );
      await getRoomReservationsFromServer();
      setIsDialogOpen(false);
      return newId;
    } catch (error) {
      console.log(error);
      console.log(error?.response?.data);
    }
  };

  // ✔️✔️✔️EDIT Room Reservation /admin✔️✔️✔️

  const handleEditRoomReservation = async (id, data) => {
    const roomReservationDetailsForServer = normalizeRoomReservation(data);

    try {
      console.log("data for server", roomReservationDetailsForServer);
      const response = await axios.put(
        `${URL}/room-reservations/${id}`,
        roomReservationDetailsForServer,
      );
      console.log(response);
      getRoomReservationsFromServer();
    } catch (error) {
      console.error("General Error Caught:", error);
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data.message);
      }
    }
  };
  // ✔️✔️✔️EDIT Room Reservation/ParticipantDetails ✔️✔️✔️
  const handleEditExtraPreferencesDetails = async (id, formData) => {
    try {
      const payload = {
        extraPreferencesDetails: {
          mealPlan: formData.level,
          rentScooter: formData.rentScooter,
          shuttleFromFerry: formData.shuttleFromFerry,
          specialRequests: formData.specialRequests,
        },
        status: formData.status,
      };

      console.log("reservation id:", id);
      console.log("payload:", payload);

      const response = await axios.put(
        `${URL}/room-reservations/${id}`,
        payload,
      );

      console.log("update success:", response.data);
      getRoomReservationsFromServer();
      return response.data;
    } catch (error) {
      console.error("General Error Caught:", error);
      console.log(error?.response?.data);
    }
  };

  // ✔️✔️✔️DELETE RoomReservation ✔️✔️✔️
  const handleDeleteRoomReservation = async (id) => {
    try {
      const response = await axios.delete(`${URL}/room-reservations/${id}`);
      await getRoomReservationsFromServer();
    } catch (error) {
      console.log(error);
    }
  };

  // ✔️✔️✔️GET Room Reservation ✔️✔️✔️
  const handleGetRoomReservation = async (id) => {
    try {
      setRoomReservation(null);
      const response = await axios.get(`${URL}/room-reservations/${id}`);
      console.log(response);
      setRoomReservation(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RoomReservationContext.Provider
      value={{
        getRoomReservationsFromServer,
        roomReservations,
        setRoomReservations,
        handleEditExtraPreferencesDetails,

        filteredRoomReservations,
        isDialogOpen,
        setIsDialogOpen,
        handleCreateRoomReservation,
        handleDeleteRoomReservation,
        handleGetRoomReservation,
        handleEditRoomReservation,
        roomReservation,
        setRoomReservation,

        setFilteredRoomReservations,
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,

        guestsCount,
      }}
    >
      {children}
    </RoomReservationContext.Provider>
  );
}

// 3. create custom hook for using the context(optional)
export const useRoomReservation = () => {
  const context = useContext(RoomReservationContext);
  if (!context) {
    throw new Error(
      "You used the message context of the RoomReservation provider!",
    );
  }
  return context;
};
