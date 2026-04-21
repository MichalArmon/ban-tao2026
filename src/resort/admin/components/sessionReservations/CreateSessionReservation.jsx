import { useSessionReservation } from "../../../providers/SessionReservationProvider";
import initialSessionReservationValues from "../../helpers/sessionReservations/initialValues/fullSessionReservations/initialSessionReservationValues";

initialSessionReservationValues;
import SessionReservationForm from "./SessionReservationForm";
function CreateSessionReservation() {
  const { handleCreateSessionReservation } = useSessionReservation();

  return (
    <SessionReservationForm
      isEditMode={false}
      initialSessionReservationValues={initialSessionReservationValues}
      handleSubmitForm={handleCreateSessionReservation}
    />
  );
}

export default CreateSessionReservation;
