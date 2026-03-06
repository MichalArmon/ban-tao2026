import { useEffect } from "react";
import { useRoom } from "../../../providers/RoomProvider";
import initialEditRoomValues from "../../helpers/rooms/initialValues/initialEditRoomValues";
import RoomForm from "./RoomForm";
import { cache } from "react";

function EditRoom({ roomSelected, setIsDialogOpen }) {
  const { handleGetRoom, handleSubmitEditRoom, room } = useRoom();
  useEffect(() => {
    if (roomSelected) {
      handleGetRoom(roomSelected);
    }
  }, [roomSelected]);
  if (!room) return <>Loading...</>;

  const handleSaveAndCloseEdit = async (formData) => {
    try {
      await handleSubmitEditRoom(roomSelected, formData);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving room:", error);
    }
  };

  return (
    <>
      <RoomForm
        initialRoomValues={initialEditRoomValues(room)}
        handleSubmitForm={handleSaveAndCloseEdit}
      />
    </>
  );
}

export default EditRoom;

// ==========================================
// הנה פונקציית המתאם שלנו כתובה כפונקציה רגילה!
// ==========================================
// function handleSaveAdapter(formData) {
// 1. הפונקציה הזו מקבלת מהטופס את החבילה (formData)

// 2. בגלל שהיא חיה בתוך EditRoom, היא רואה גם את המדבקה למעלה (roomSelected)

// 3. עכשיו היא פשוט שולחת את שניהם לפונקציה האמיתית של השרת
//   handleSubmitEditRoom(roomSelected, formData);
// }
