import axios from "axios";
import { createContext, useContext, useState, useCallback } from "react";
import normalizeSessionDetails from "../admin/helpers/Sessions/normalization/normalizeSessionDetails";

const URL = "http://localhost:8000";

// const URL = "http://localhost:3000/api/v1";

// 1.create context
const SessionContext = createContext();

// 2.create provider
export default function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [workshopId, setWorkshopId] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reservationId, setReservationId] = useState("");

  // ✔️✔️✔️GET SessionS ✔️✔️✔️
  const getSessionsFromServer = async () => {
    const response = await axios.get(`${URL}/workshop-sessions`);
    const sessionsData = response.data;
    setSessions(sessionsData);
    return sessionsData;
  };

  // ✔️✔️✔️GET Session by id ✔️✔️✔️
  const handleGetSession = async (id) => {
    try {
      setSession(null);
      const response = await axios.get(`${URL}/workshop-sessions/${id}`);
      console.log(response.data);
      setSession(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // ✔️✔️✔️GET Session by Workshop ✔️✔️✔️
  const handleGetSessionByWorkshop = async (workshopId) => {
    try {
      setSessions(null);
      const response = await axios.get(
        `${URL}/workshop-sessions/workshop/${workshopId}`,
      );

      setSessions(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // ✔️✔️✔️CREATE SESSION ✔️✔️✔️

  const handleSubmitCreateSession = async (data) => {
    try {
      console.log("data for server", data);
      const response = await axios.post(`${URL}/workshop-sessions`, data);
      console.log(response);
      getSessionsFromServer();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("General Error Caught:", error);
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data.message);
      }
    }
  };

  // ✔️✔️✔️EDIT Session ✔️✔️✔️

  const handleSubmitEditSession = async (id, data) => {
    const sessionDetailsForServer = normalizeSessionDetails(data);

    try {
      console.log("data for server", sessionDetailsForServer);
      const response = await axios.put(
        `${URL}/workshop-sessions/${id}`,
        sessionDetailsForServer,
      );
      console.log(response);
      getSessionsFromServer();
    } catch (error) {
      console.error("General Error Caught:", error);
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data.message);
      }
    }
  };

  // ✔️✔️✔️DELETE Session ✔️✔️✔️
  const handleDeleteSession = async (id) => {
    try {
      const response = await axios.delete(`${URL}/workshop-sessions/${id}`);
      await getSessionsFromServer();
    } catch (error) {
      console.log(error);
    }
  };
  // ✔️✔️✔️ Sessions AVAILABILITY ✔️✔️✔️

  const handleSessionsAvailability = useCallback(
    async ({ startTime, workshopId }) => {
      try {
        setFilteredSessions(null);

        const response = await axios.get(
          `${URL}/workshop-sessions/availability?startTime=${startTime}&workshopId=${workshopId}`,
        );

        setFilteredSessions(response.data);
        console.log("sessions:", response.data);

        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  return (
    <SessionContext.Provider
      value={{
        getSessionsFromServer,
        handleSubmitCreateSession,
        handleGetSession,
        sessions,
        setSessions,
        handleDeleteSession,
        handleSubmitEditSession,
        setSession,
        session,
        isDialogOpen,
        setIsDialogOpen,
        handleGetSessionByWorkshop,
        handleSessionsAvailability,
        setFilteredSessions,
        filteredSessions,
        startTime,
        setStartTime,
        workshopId,
        setWorkshopId,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

// 3. create custom hook for using the context(optional)
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("You used the message context of the session provider!");
  }
  return context;
};
