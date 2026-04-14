import axios from "axios";
import { createContext, useContext, useState } from "react";
import normalizeSessionDetails from "../admin/helpers/Sessions/normalization/normalizeSessionDetails";
import { Email } from "@mui/icons-material";
const URL = "http://localhost:8000";
// const URL = "http://localhost:3000/api/v1";

// 1.create context
const SessionContext = createContext();

// 2.create provider
export default function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // ✔️✔️✔️GET SessionS ✔️✔️✔️
  const getSessionsFromServer = async () => {
    const response = await axios.get(`${URL}/workshop-sessions`);
    const sessionsData = response.data;
    setSessions(sessionsData);

    console.log(sessionsData);
  };

  // ✔️✔️✔️GET Session by id ✔️✔️✔️
  const handleGetSession = async (id) => {
    try {
      setSession(null);
      const response = await axios.get(`${URL}/workshop-sessions/${id}`);
      console.log(response.data);
      setSession(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✔️✔️✔️GET Session by Workshop ✔️✔️✔️
  const handleGetSessionByWorkshop = async (workshopId) => {
    try {
      setSession(null);
      const response = await axios.get(
        `${URL}/workshop-sessions/workshop/${workshopId}`,
      );

      setSession(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✔️✔️✔️CREATE SESSION ✔️✔️✔️

  const handleSubmitCreateSession = async (data) => {
    const sessionDetailsForServer = normalizeSessionDetails(data);

    try {
      console.log("data for server", sessionDetailsForServer);
      const response = await axios.post(
        `${URL}/workshop-sessions`,
        sessionDetailsForServer,
      );
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

  // ✔️✔️✔️RECURSIVE✔️✔️✔️

  const handleSubmitCreateRecursiveSession = async (data) => {
    const sessionDetailsForServer = normalizeSessionDetails(data);

    try {
      console.log("data for server", sessionDetailsForServer);
      const response = await axios.post(
        `${URL}/workshop-sessions/recursive`,
        sessionDetailsForServer,
      );
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

  return (
    <SessionContext.Provider
      value={{
        getSessionsFromServer,
        handleSubmitCreateSession,
        handleGetSession,
        sessions,
        handleDeleteSession,
        handleSubmitEditSession,
        setSession,
        session,
        isDialogOpen,
        setIsDialogOpen,
        handleGetSessionByWorkshop,
        handleSubmitCreateRecursiveSession,
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
