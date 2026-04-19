import axios from "axios";
import { createContext, useContext, useState } from "react";
import normalizeRoomReservation from "../admin/helpers/RoomReservation/normalization/normalizeRoomReservationDetails";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routerDict";
import { useRoom } from "./RoomProvider";
import { useUser } from "./UserProvider";

const URL = "http://localhost:8000";
// const URL = "http://localhost:3000/api/v1";
const RoomReservationContext = createContext();

// 2.create provider
export default function RoomReservationProvider({ children }) {
  const { checkIn, setCheckIn, guestsCount, checkOut, setCheckOut } = useRoom();
  const [RoomReservation, setRoomReservation] = useState(null);
  const [RoomReservations, setRoomReservations] = useState([]);

  const [reservationId, setReservationId] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [filteredRoomReservations, setFilteredRoomReservations] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  // ✔️✔️✔️GET RoomReservationS ✔️✔️✔️
  const getRoomReservationsFromServer = async () => {
    const response = await axios.get(`${URL}/workshop-reservations`);
    const RoomReservationData = response.data;
    setRoomReservations(RoomReservationData);

    console.log(RoomReservationData);
  };

  // ✔️✔️✔️ CRETE Room RESERVATION ✔️✔️✔️

  const handleCreateRoomReservation = async (reservation) => {
    try {
      RoomStorage.removeItem("currentRoomReservationId");
      const response = await axios.post(
        `${URL}/workshop-reservations`,
        reservation,
      );

      const newId = response.data?._id;
      setReservationId(newId);
      RoomStorage.setItem("currentRoomReservationId", String(newId));
      console.log(
        "ID Saved to storage:",
        RoomStorage.getItem("currentRoomReservationId"),
      );
      return newId;
    } catch (error) {
      console.log(error);
      console.log(error?.response?.data);
    }
  };

  // ✔️✔️✔️EDIT Room Reservation /admin✔️✔️✔️

  const handleEditRoomReservation = async (id, data) => {
    const RoomReservationDetailsForServer = normalizeRoomReservation(data);

    try {
      console.log("data for server", RoomReservationDetailsForServer);
      const response = await axios.put(
        `${URL}/workshop-reservations/${id}`,
        RoomReservationDetailsForServer,
      );
      console.log(response);
    } catch (error) {
      console.error("General Error Caught:", error);
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data.message);
      }
    }
  };
  // ✔️✔️✔️EDIT Room Reservation/ParticipantDetails ✔️✔️✔️
  const handleEditParticipantDetails = async (id, formData) => {
    try {
      const payload = {
        participantDetails: {
          level: formData.level,
          goals: formData.goals,
          injuriesNotes: formData.injuriesNotes,
          extras: formData.extras,
          instructorNotes: formData.instructorNotes,
        },
      };

      console.log("reservation id:", id);
      console.log("payload:", payload);

      const response = await axios.put(
        `${URL}/workshop-reservations/${id}`,
        payload,
      );

      console.log("update success:", response.data);
      return response.data;
    } catch (error) {
      console.error("General Error Caught:", error);
      console.log(error?.response?.data);
    }
  };

  // ✔️✔️✔️DELETE RoomReservation ✔️✔️✔️
  const handleDeleteRoomReservation = async (id) => {
    try {
      const response = await axios.delete(`${URL}/workshop-reservations/${id}`);
      await getRoomReservationsFromServer();
    } catch (error) {
      console.log(error);
    }
  };

  // ✔️✔️✔️GET Room Reservation ✔️✔️✔️
  const handleGetRoomReservation = async (id) => {
    try {
      setRoomReservation(null);
      const response = await axios.get(`${URL}/workshop-reservations/${id}`);
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
        RoomReservations,
        setRoomReservations,
        handleEditParticipantDetails,

        filteredRoomReservations,
        isDialogOpen,
        setIsDialogOpen,
        handleCreateRoomReservation,
        handleDeleteRoomReservation,
        handleGetRoomReservation,
        handleEditRoomReservation,
        RoomReservation,
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
