import { useTreatmentReservation } from "../../../providers/TreatmentReservationProvider";
import initialTreatmentReservationValues from "../../helpers/treatmentReservations/initialValues/fullTreatmentReservations/initialTreatmentReservationValues";

initialTreatmentReservationValues;
import TreatmentReservationForm from "./TreatmentReservationForm";
function CreateTreatmentReservation() {
  const { handleCreateTreatmentReservation } = useTreatmentReservation();

  return (
    <TreatmentReservationForm
      isEditMode={false}
      initialTreatmentReservationValues={initialTreatmentReservationValues}
      handleSubmitForm={handleCreateTreatmentReservation}
    />
  );
}

export default CreateTreatmentReservation;
