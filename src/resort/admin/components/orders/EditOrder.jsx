import { useEffect } from "react";
import { useOrder } from "../../../providers/OrderProvider";
import initialEditOrderValues from "../../helpers/Orders/initialValues/initialEditOrderValues";
import OrderForm from "./OrderForm";

function EditOrder({ OrderSelected, setIsDialogOpen }) {
  const { handleGetOrder, handleSubmitEditOrder, order } = useOrder();
  useEffect(() => {
    if (OrderSelected) {
      handleGetOrder(OrderSelected);
    }
  }, [OrderSelected]);
  if (!order) return <>Loading...</>;

  const handleSaveAndCloseEdit = async (formData) => {
    try {
      await handleSubmitEditOrder(OrderSelected, formData);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving Order:", error);
    }
  };

  return (
    <>
      <OrderForm
        initialOrderValues={initialEditOrderValues(Order)}
        handleSubmitForm={handleSaveAndCloseEdit}
      />
    </>
  );
}

export default EditOrder;
