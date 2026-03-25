import { useEffect } from "react";

import { useTreatment } from "../../../providers/TreatmentProvider";
import TreatmentForm from "./TreatmentForm";
import initialEditTreatmentValues from "../../helpers/treatments/initialValues/initialEditTreatmentValues ";

function EditTreatment({ TreatmentSelected, setIsDialogOpen }) {
  const { handleGetTreatment, handleSubmitEditTreatment, treatment } =
    useTreatment();
  useEffect(() => {
    if (TreatmentSelected) {
      handleGetTreatment(TreatmentSelected);
    }
  }, [TreatmentSelected]);
  if (!treatment) return <>Loading...</>;

  const handleSaveAndCloseEdit = async (formData) => {
    try {
      await handleSubmitEditTreatment(TreatmentSelected, formData);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving room:", error);
    }
  };

  return (
    <>
      <TreatmentForm
        initialTreatmentValues={initialEditTreatmentValues(treatment)}
        handleSubmitForm={handleSaveAndCloseEdit}
      />
    </>
  );
}

export default EditTreatment;

// ==========================================
// הנה פונקציית המתאם שלנו כתובה כפונקציה רגילה!
// ==========================================
// function handleSaveAdapter(formData) {
// 1. הפונקציה הזו מקבלת מהטופס את החבילה (formData)

// 2. בגלל שהיא חיה בתוך EditRoom, היא רואה גם את המדבקה למעלה (roomSelected)

// 3. עכשיו היא פשוט שולחת את שניהם לפונקציה האמיתית של השרת
//   handleSubmitEditRoom(roomSelected, formData);
// }
