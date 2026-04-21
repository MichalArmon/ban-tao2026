import axios from "axios";
import { createContext, useContext, useState } from "react";
import normalizeWorkshopDetails from "../admin/helpers/workshops/normalization/normalizeWorkshopDetails.js";
const URL = "http://localhost:8000";
// const URL = "http://localhost:3000/api/v1";

// 1.create context
const WorkshopContext = createContext();

// 2.create provider
export default function WorkshopProvider({ children }) {
  const [workshop, setWorkshop] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // ✔️✔️✔️GET WorkshopS ✔️✔️✔️
  const getWorkshopsFromServer = async () => {
    const response = await axios.get(`${URL}/workshops`);
    const workshopsData = response.data;
    setWorkshops(workshopsData);

    console.log(workshopsData);
    return workshopsData;
  };

  // ✔️✔️✔️GET Workshop by id ✔️✔️✔️
  const handleGetWorkshop = async (id) => {
    try {
      setWorkshop(null);
      const response = await axios.get(`${URL}/workshops/${id}`);
      console.log(response);
      setWorkshop(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // ✔️✔️✔️CREATE workshop ✔️✔️✔️

  const handleSubmitCreateWorkshop = async (data) => {
    const workshopDetailsForServer = normalizeWorkshopDetails(data);

    try {
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
    }
  };

  // ✔️✔️✔️DELETE Workshop ✔️✔️✔️
  const handleDeleteWorkshop = async (id) => {
    try {
      const response = await axios.delete(`${URL}/Workshops/${id}`);
      await getWorkshopsFromServer();
    } catch (error) {
      console.log(error);
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
