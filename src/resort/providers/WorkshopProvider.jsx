import axios from "axios";
import { createContext, useContext, useState } from "react";
import normalizeWorkshopDetails from "../admin/helpers/workshops/normalization/normalizeWorkshopDetails.js";
import { useLoading } from "./LoadingProvider";
const URL = "http://localhost:8000";
// const URL = "http://localhost:3000/api/v1";

// 1.create context
const WorkshopContext = createContext();

// 2.create provider
export default function WorkshopProvider({ children }) {
  const { setIsLoading } = useLoading();
  const [workshop, setWorkshop] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // ✔️✔️✔️GET WorkshopS ✔️✔️✔️
  const getWorkshopsFromServer = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${URL}/workshops`);
      const workshopsData = response.data;
      setWorkshops(workshopsData);

      console.log(workshopsData);
      return workshopsData;
    } finally {
      setIsLoading(false);
    }
  };

  // ✔️✔️✔️GET Workshop by id ✔️✔️✔️
  const handleGetWorkshop = async (id) => {
    try {
      setIsLoading(true);
      setWorkshop(null);
      const response = await axios.get(`${URL}/workshops/${id}`);
      console.log(response);
      setWorkshop(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✔️✔️✔️CREATE workshop ✔️✔️✔️
  const handleSubmitCreateWorkshop = async (data) => {
    const workshopDetailsForServer = normalizeWorkshopDetails(data);

    try {
      setIsLoading(true);
      console.log("data for server", workshopDetailsForServer);
      const response = await axios.post(
        `${URL}/Workshops`,
        workshopDetailsForServer,
      );
      console.log(response);
      getWorkshopsFromServer();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("General Error Caught:", error);
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ✔️✔️✔️workshop TITLE ✔️✔️✔️
  const getWorkshopTitle = (workshopId) => {
    const foundWorkshop = workshops?.find(
      (workshop) => workshop._id === workshopId,
    );

    return foundWorkshop ? foundWorkshop.title : "Loading title...";
  };

  // ✔️✔️✔️workshop DURATION ✔️✔️✔️
  const getWorkshopDuration = (workshopId) => {
    const foundWorkshop = workshops?.find(
      (workshop) => workshop._id === workshopId,
    );

    return foundWorkshop ? foundWorkshop.duration : "Loading title...";
  };

  // ✔️✔️✔️workshop detail ✔️✔️✔️
  const getWorkshopDetails = (workshopId) => {
    return workshops?.find((workshop) => workshop._id === workshopId);
  };

  // ✔️✔️✔️EDIT Workshop ✔️✔️✔️
  const handleSubmitEditWorkshop = async (id, data) => {
    const workshopDetailsForServer = normalizeWorkshopDetails(data);

    try {
      setIsLoading(true);
      console.log("data for server", workshopDetailsForServer);
      const response = await axios.put(
        `${URL}/workshops/${id}`,
        workshopDetailsForServer,
      );
      console.log(response);
      getWorkshopsFromServer();
    } catch (error) {
      console.error("General Error Caught:", error);
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ✔️✔️✔️DELETE Workshop ✔️✔️✔️
  const handleDeleteWorkshop = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`${URL}/Workshops/${id}`);
      await getWorkshopsFromServer();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WorkshopContext.Provider
      value={{
        getWorkshopsFromServer,
        handleSubmitCreateWorkshop,
        handleGetWorkshop,
        workshops,
        setWorkshops,
        handleDeleteWorkshop,
        handleSubmitEditWorkshop,
        setWorkshop,
        workshop,
        isDialogOpen,
        setIsDialogOpen,
        getWorkshopTitle,
        getWorkshopDuration,
        getWorkshopDetails,
      }}
    >
      {children}
    </WorkshopContext.Provider>
  );
}

// 3. create custom hook for using the context(optional)
export const useWorkshop = () => {
  const context = useContext(WorkshopContext);
  if (!context) {
    throw new Error("You used the message context of the room provider!");
  }
  return context;
};
