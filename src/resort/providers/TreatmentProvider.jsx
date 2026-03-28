import axios from "axios";
import { createContext, useContext, useState } from "react";
import normalizeTreatmentDetails from "../admin/helpers/treatments/normalization/normalizeTreatmentDetails";
const URL = "http://localhost:8000";
// const URL = "http://localhost:3000/api/v1";

// 1.create context
const TreatmentContext = createContext();

// 2.create provider
export default function TreatmentProvider({ children }) {
  const [treatment, setTreatment] = useState(null);
  const [treatments, setTreatments] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // ✔️✔️✔️GET TREATMENTS ✔️✔️✔️
  const getTreatmentsFromServer = async () => {
    const response = await axios.get(`${URL}/treatments`);
    const treatmentsData = response.data;
    setTreatments(treatmentsData);

    console.log(treatmentsData);
  };

  // ✔️✔️✔️GET Treatment by id ✔️✔️✔️
  const handleGetTreatment = async (id) => {
    try {
      setTreatment(null);
      const response = await axios.get(`${URL}/treatments/${id}`);
      console.log(response);
      setTreatment(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✔️✔️✔️CREATE ROOM ✔️✔️✔️

  const handleSubmitCreateTreatment = async (data) => {
    const TreatmentDetailsForServer = normalizeTreatmentDetails(data);

    try {
      console.log("data for server", TreatmentDetailsForServer);
      const response = await axios.post(
        `${URL}/treatments`,
        TreatmentDetailsForServer,
      );
      console.log(response);
      getTreatmentsFromServer();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("General Error Caught:", error);
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data.message);
      }
    }
  };

  // ✔️✔️✔️EDIT TREATMENT ✔️✔️✔️

  const handleSubmitEditTreatment = async (id, data) => {
    const TreatmentDetailsForServer = normalizeTreatmentDetails(data);

    try {
      console.log("data for server", TreatmentDetailsForServer);
      const response = await axios.put(
        `${URL}/treatments/${id}`,
        TreatmentDetailsForServer,
      );
      console.log(response);
      getTreatmentsFromServer();
    } catch (error) {
      console.error("General Error Caught:", error);
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data.message);
      }
    }
  };

  // ✔️✔️✔️DELETE TREATMENT ✔️✔️✔️
  const handleDeleteTreatment = async (id) => {
    try {
      const response = await axios.delete(`${URL}/treatments/${id}`);
      await getTreatmentsFromServer();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TreatmentContext.Provider
      value={{
        getTreatmentsFromServer,
        handleSubmitCreateTreatment,
        handleGetTreatment,
        treatments,
        handleDeleteTreatment,
        handleSubmitEditTreatment,
        setTreatment,
        treatment,
        isDialogOpen,
        setIsDialogOpen,
      }}
    >
      {children}
    </TreatmentContext.Provider>
  );
}

// 3. create custom hook for using the context(optional)
export const useTreatment = () => {
  const context = useContext(TreatmentContext);
  if (!context) {
    throw new Error("You used the message context of the room provider!");
  }
  return context;
};
