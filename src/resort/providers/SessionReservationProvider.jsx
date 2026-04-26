import axios from "axios";
import { createContext, useContext, useState } from "react";
import normalizeSessionReservation from "../admin/helpers/sessionReservations/normalization/normalizeSessionReservationDetails";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routerDict";
import { useRoom } from "./RoomProvider";
import { useUser } from "./UserProvider";

const URL = "http://localhost:8000";
// const URL = "http://localhost:3000/api/v1";
const SessionReservationContext = createContext();

// 2.create provider
export default function SessionReservationProvider({ children }) {
  const { checkIn, setCheckIn, guestsCount, checkOut, setCheckOut } = useRoom();
  const [sessionReservation, setSessionReservation] = useState(null);
  const [sessionReservations, setSessionReservations] = useState([]);

  const [reservationId, setReservationId] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [filteredSessionReservations, setFilteredSessionReservations] =
    useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  // ✔️✔️✔️GET SessionReservationS ✔️✔️✔️
  const getSessionReservationsFromServer = async () => {
    const response = await axios.get(`${URL}/workshop-reservations`);
    const sessionReservationData = response.data;
    setSessionReservations(sessionReservationData);

    console.log(sessionReservationData);
  };

  // ✔️✔️✔️ CRETE Session RESERVATION ✔️✔️✔️

  const handleCreateSessionReservation = async (reservation) => {
    try {
      sessionStorage.removeItem("currentSessionReservationId");
      const response = await axios.post(
        `${URL}/workshop-reservations`,
        reservation,
      );

      const newId = response.data?._id;
      setReservationId(newId);
      sessionStorage.setItem("currentSessionReservationId", String(newId));
      console.log(
        "ID Saved to storage:",
        sessionStorage.getItem("currentSessionReservationId"),
      );

      getSessionReservationsFromServer();
      setIsDialogOpen(false);
      return newId;
    } catch (error) {
      console.log(error);
      console.log(error?.response?.data);
    }
  };

  // ✔️✔️✔️EDIT Session Reservation /admin✔️✔️✔️

  const handleEditSessionReservation = async (id, data) => {
    const sessionReservationDetailsForServer =
      normalizeSessionReservation(data);

    try {
      console.log("data for server", sessionReservationDetailsForServer);
      const response = await axios.put(
        `${URL}/workshop-reservations/${id}`,
        sessionReservationDetailsForServer,
      );
      console.log(response);
      await getSessionReservationsFromServer();
    } catch (error) {
      console.error("General Error Caught:", error);
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data.message);
      }
    }
  };
  // ✔️✔️✔️EDIT Session Reservation/ParticipantDetails ✔️✔️✔️
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
        status: formData.status,
      };

      console.log("reservation id:", id);
      console.log("payload:", payload);

      const response = await axios.put(
        `${URL}/workshop-reservations/${id}`,
        payload,
      );

      console.log("update success:", response.data);
      await getSessionReservationsFromServer();

      return response.data;
    } catch (error) {
      console.error("General Error Caught:", error);
      console.log(error?.response?.data);
    }
  };

  // ✔️✔️✔️DELETE SessionReservation ✔️✔️✔️
  const handleDeleteSessionReservation = async (id) => {
    try {
      const response = await axios.delete(`${URL}/workshop-reservations/${id}`);
      await getSessionReservationsFromServer();
    } catch (error) {
      console.log(error);
    }
  };

  // ✔️✔️✔️GET Session Reservation ✔️✔️✔️
  const handleGetSessionReservation = async (id) => {
    try {
      setSessionReservation(null);
      const response = await axios.get(`${URL}/workshop-reservations/${id}`);
      console.log(response);
      setSessionReservation(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SessionReservationContext.Provider
      value={{
        getSessionReservationsFromServer,
        sessionReservations,
        setSessionReservations,
        handleEditParticipantDetails,

        filteredSessionReservations,
        isDialogOpen,
        setIsDialogOpen,
        handleCreateSessionReservation,
        handleDeleteSessionReservation,
        handleGetSessionReservation,
        handleEditSessionReservation,
        sessionReservation,
        setSessionReservation,

        setFilteredSessionReservations,
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,

        guestsCount,
      }}
    >
      {children}
    </SessionReservationContext.Provider>
  );
}

// 3. create custom hook for using the context(optional)
export const useSessionReservation = () => {
  const context = useContext(SessionReservationContext);
  if (!context) {
    throw new Error(
      "You used the message context of the SessionReservation provider!",
    );
  }
  return context;
};
