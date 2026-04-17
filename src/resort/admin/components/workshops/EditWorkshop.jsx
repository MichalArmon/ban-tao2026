import { useEffect } from "react";

import { useWorkshop } from "../../../providers/WorkshopProvider";
import WorkshopForm from "./WorkshopForm";
import initialEditWorkshopValues from "../../helpers/workshops/initialValues/initialEditWorkshopValues";

function EditWorkshop({ workshopSelected, setIsDialogOpen }) {
  const { handleGetWorkshop, handleSubmitEditWorkshop, workshop } =
    useWorkshop();
  console.log("workshopSelected:", workshopSelected);
  console.log("workshop from context:", workshop);
  useEffect(() => {
    if (workshopSelected) {
      handleGetWorkshop(workshopSelected);
    }
  }, [workshopSelected]);
  if (!workshop) return <>Loading...</>;

  const handleSaveAndCloseEdit = async (formData) => {
    try {
      await handleSubmitEditWorkshop(workshopSelected, formData);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving room:", error);
    }
  };

  return (
    <>
      <WorkshopForm
        initialWorkshopValues={initialEditWorkshopValues(workshop)}
        handleSubmitForm={handleSaveAndCloseEdit}
      />
    </>
  );
}

export default EditWorkshop;

// ==========================================
// הנה פונקציית המתאם שלנו כתובה כפונקציה רגילה!
// ==========================================
// function handleSaveAdapter(formData) {
// 1. הפונקציה הזו מקבלת מהטופס את החבילה (formData)

// 2. בגלל שהיא חיה בתוך EditRoom, היא רואה גם את המדבקה למעלה (roomSelected)

// 3. עכשיו היא פשוט שולחת את שניהם לפונקציה האמיתית של השרת
//   handleSubmitEditRoom(roomSelected, formData);
// }
