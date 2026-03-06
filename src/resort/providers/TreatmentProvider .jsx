import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import normalizeRoomDetails from "../admin/helpers/rooms/normalization/normalizeRoomDetails";

// 1.create context
const TreatmentContext = createContext();

// 2.create provider
export default function TreatmentProvider({ children }) {
  const [treatment, setTreatment] = useState(null);
  const [treatments, setTreatments] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // ✔️✔️✔️GET TREATMENTS ✔️✔️✔️
  const getTreatmentsFromServer = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/treatments");
    const treatmentsData = response.data.items;
    setTreatments(treatmentsData);

    console.log(treatmentsData);
  };

  return (
    <TreatmentContext.Provider
      value={{
        getTreatmentsFromServer,
        treatments,
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
