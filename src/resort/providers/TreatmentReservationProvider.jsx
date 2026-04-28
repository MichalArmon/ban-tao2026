import axios from "axios";
import { createContext, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routerDict";
import { useTreatment } from "./TreatmentProvider";
import { useUser } from "./UserProvider";
import { useLoading } from "./LoadingProvider";
import normalizeTreatmentReservation from "../admin/helpers/treatmentReservations/normalization/normalizeTreatmentReservationDetails";

const URL = "http://localhost:8000";
// const URL = "http://localhost:3000/api/v1";
const TreatmentReservationContext = createContext();

// 2.create provider
export default function TreatmentReservationProvider({ children }) {
  const { setIsLoading } = useLoading();
  const { date, treatmentId } = useTreatment();
  const [treatmentReservation, setTreatmentReservation] = useState(null);
  const [treatmentReservations, setTreatmentReservations] = useState([]);

  const [reservationId, setReservationId] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [filteredTreatmentReservations, setFilteredTreatmentReservations] =
    useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  // ✔️✔️✔️GET TreatmentReservationS ✔️✔️✔️
  const getTreatmentReservationsFromServer = async () => {
    const response = await axios.get(`${URL}/treatment-reservations`);
    const treatmentReservationData = response.data;
    setTreatmentReservations(treatmentReservationData);
    console.log(treatmentReservationData);
    return treatmentReservationData;
  };

  // ✔️✔️✔️ CREATE Treatment RESERVATION ✔️✔️✔️

  const handleCreateTreatmentReservation = async (reservation) => {
    try {
      sessionStorage.removeItem("currentTreatmentReservationId");
      const response = await axios.post(
        `${URL}/treatment-reservations`,
        reservation,
      );

      const newId = response.data?._id;
      setReservationId(newId);
      sessionStorage.setItem("currentTreatmentReservationId", String(newId));
      console.log(
        "ID Saved to storage:",
        sessionStorage.getItem("currentTreatmentReservationId"),
      );
      await getTreatmentReservationsFromServer();
      setIsDialogOpen(false);
      return newId;
    } catch (error) {
      console.log(error);
      console.log(error?.response?.data);
    }
  };

  // ✔️✔️✔️EDIT Treatment Reservation /admin✔️✔️✔️

  const handleEditTreatmentReservation = async (id, data) => {
    const treatmentReservationDetailsForServer =
      normalizeTreatmentReservation(data);

    try {
      console.log("data for server", treatmentReservationDetailsForServer);
      const response = await axios.put(
        `${URL}/treatment-reservations/${id}`,
        treatmentReservationDetailsForServer,
      );
      console.log(response);
      getTreatmentReservationsFromServer();
    } catch (error) {
      console.error("General Error Caught:", error);
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data.message);
      }
    }
  };
  // ✔️✔️✔️EDIT Treatment Reservation/ParticipantDetails ✔️✔️✔️
  const handleEditExtraPreferencesDetails = async (id, formData) => {
    try {
      const payload = {
        treatmentParticipantDetails: {
          pressureLevels: formData.pressureLevels,
          focusAreasOptions: formData.focusAreasOptions,
          medicalConditionsOptions: formData.medicalConditionsOptions,
          extraSpaOptions: formData.extraSpaOptions,
          specialRequests: formData.specialRequests,
        },
        status: formData.status,
      };

      console.log("reservation id:", id);
      console.log("payload:", payload);

      const response = await axios.put(
        `${URL}/treatment-reservations/${id}`,
        payload,
      );

      console.log("update success:", response.data);
      getTreatmentReservationsFromServer();
      return response.data;
    } catch (error) {
      console.error("General Error Caught:", error);
      console.log(error?.response?.data);
    }
  };

  // ✔️✔️✔️DELETE TreatmentReservation ✔️✔️✔️
  const handleDeleteTreatmentReservation = async (id) => {
    try {
      const response = await axios.delete(
        `${URL}/treatment-reservations/${id}`,
      );
      await getTreatmentReservationsFromServer();
    } catch (error) {
      console.log(error);
    }
  };

  // ✔️✔️✔️GET Treatment Reservation ✔️✔️✔️
  const handleGetTreatmentReservation = async (id) => {
    try {
      setTreatmentReservation(null);
      const response = await axios.get(`${URL}/treatment-reservations/${id}`);
      console.log(response);
      setTreatmentReservation(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TreatmentReservationContext.Provider
      value={{
        getTreatmentReservationsFromServer,
        treatmentReservations,
        setTreatmentReservations,
        handleEditExtraPreferencesDetails,

        filteredTreatmentReservations,
        isDialogOpen,
        setIsDialogOpen,
        handleCreateTreatmentReservation,
        handleDeleteTreatmentReservation,
        handleGetTreatmentReservation,
        handleEditTreatmentReservation,
        treatmentReservation,
        setTreatmentReservation,

        setFilteredTreatmentReservations,
      }}
    >
      {children}
    </TreatmentReservationContext.Provider>
  );
}

// 3. create custom hook for using the context(optional)
export const useTreatmentReservation = () => {
  const context = useContext(TreatmentReservationContext);
  if (!context) {
    throw new Error(
      "You used the message context of the TreatmentReservation provider!",
    );
  }
  return context;
};
