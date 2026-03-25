import { useTreatment } from "../../../providers/TreatmentProvider";
import initialTreatmentValues from "../../helpers/treatments/initialValues/initialTreatmentValues";
import TreatmentForm from "./TreatmentForm";
function CreateTreatment() {
  const { handleSubmitCreateTreatment } = useTreatment();
  return (
    <TreatmentForm
      initialTreatmentValues={initialTreatmentValues}
      handleSubmitForm={handleSubmitCreateTreatment}
    />
  );
}

export default CreateTreatment;
