import { useOrder } from "../../../providers/OrderProvider";
import initialOrderValues from "../../helpers/orders/initialValues/initialOrderValues";
import OrderForm from "./OrderForm";
function CreateOrder() {
  const { handleSubmitCreateOrder } = useOrder();
  return (
    <OrderForm
      initialOrderValues={initialOrderValues}
      handleSubmitForm={handleSubmitCreateOrder}
    />
  );
}

export default CreateOrder;
