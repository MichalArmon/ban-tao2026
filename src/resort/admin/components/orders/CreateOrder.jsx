import { useRoom } from "../../../providers/RoomProvider";
import initialOrderValues from "../../helpers/orders/initialValues/initialOrderValues";
import OrderForm from "./OrderForm";

function CreateOrder() {
  const { handleSubmitCreateOrder } = useRoom();
  return (
    <OrderForm
      initialOrderValues={initialOrderValues}
      handleSubmitForm={handleSubmitCreateOrder}
    />
  );
}

export default CreateOrder;
