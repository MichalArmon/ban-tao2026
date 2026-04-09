import axios from "axios";
import { createContext, useContext, useState } from "react";

import dayjs from "dayjs";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routerDict";
import { useRoom } from "./RoomProvider";
import { useUser } from "./UserProvider";

const URL = "http://localhost:8000";
// const URL = "http://localhost:3000/api/v1";
const OrderContext = createContext();

const today = dayjs().format("ddd, MMM D, YYYY");

const tomorrow = dayjs().add(1, "day").format("ddd, MMM D, YYYY");

// 2.create provider
export default function OrderProvider({ children }) {
  const {
    checkIn,
    setCheckIn,
    guestsCount,
    checkOut,
    setCheckOut,
    setGuestsCount,
  } = useRoom();
  const [order, setOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  const [reservationId, setReservationId] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [filteredOrders, setFilteredOrders] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  // ✔️✔️✔️GET OrderS ✔️✔️✔️
  const getOrdersFromServer = async () => {
    const response = await axios.get(`${URL}/orders`);
    const OrderData = response.data;
    setOrders(OrderData);

    console.log(OrderData);
  };

  // ✔️✔️✔️CREATE Order ✔️✔️✔️

  const handleSubmitCreateOrder = async (order) => {
    const savedId = sessionStorage.getItem("currentReservationId");
    try {
      console.log("Data from Form:", order);
      console.log("ID from Provider State:", reservationId);
      const newOrder = {
        ...order,
        userId: user._id,
        roomReservations: [savedId],
      };

      const response = await axios.post(`${URL}/orders`, newOrder);
      console.log(response);
      navigate(ROUTES.thankYou);
    } catch (error) {
      console.log(error);
    }
  };

  // ✔️✔️✔️EDIT Order ✔️✔️✔️

  const handleSubmitEditOrder = async (id, data) => {
    const OrderDetailsForServer = normalizeOrderDetails(data);

    try {
      console.log("data for server", OrderDetailsForServer);
      const response = await axios.put(
        `${URL}/Orders/${id}`,
        OrderDetailsForServer,
      );
      console.log(response);
      getOrdersFromServer();
    } catch (error) {
      console.error("General Error Caught:", error);
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data.message);
      }
    }
  };

  // ✔️✔️✔️DELETE Order ✔️✔️✔️
  const handleDeleteOrder = async (id) => {
    try {
      const response = await axios.delete(`${URL}/api/v1/Orders/${id}`);
      await getOrdersFromServer();
    } catch (error) {
      console.log(error);
    }
  };

  // ✔️✔️✔️GET Order ✔️✔️✔️
  const handleGetOrder = async (id) => {
    try {
      setOrder(null);
      const response = await axios.get(`${URL}/Orders/${id}`);
      console.log(response);
      setOrder(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        getOrdersFromServer,
        orders,
        setOrders,

        filteredOrders,
        isDialogOpen,
        setIsDialogOpen,
        handleSubmitCreateOrder,
        handleDeleteOrder,
        handleGetOrder,
        handleSubmitEditOrder,
        order,
        setOrder,

        setFilteredOrders,
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,

        guestsCount,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

// 3. create custom hook for using the context(optional)
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("You used the message context of the Order provider!");
  }
  return context;
};
