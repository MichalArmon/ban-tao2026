import { useEffect } from "react";
import { useOrder } from "../../../providers/OrderProvider";
import initialEditOrderValues from "../../helpers/Orders/initialValues/initialEditOrderValues";
import OrderForm from "./OrderForm";

function EditOrder({ orderSelected, setIsDialogOpen }) {
  const { handleGetOrder, handleSubmitEditOrder, order } = useOrder();

  console.log("orderSelected ID:", orderSelected); // האם קיבלנו ID בכלל?
  console.log("Order data from Provider:", order); // האם הנתונים הגיעו?
  useEffect(() => {
    if (orderSelected) {
      handleGetOrder(orderSelected);
    }
  }, [orderSelected]);
  if (!order) return <>Loading...</>;

  const handleSaveAndCloseEdit = async (formData) => {
    try {
      await handleSubmitEditOrder(orderSelected, formData);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving Order:", error);
    }
  };

  return (
    <>
      <OrderForm
        initialOrderValues={initialEditOrderValues(order)}
        handleSubmitForm={handleSaveAndCloseEdit}
      />
    </>
  );
}

export default EditOrder;
