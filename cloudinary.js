import { useState } from "react";
import axios from "axios";

export default function useCloudinaryUpload() {
  // 1. משתנים (סטייט) שנועדו לעדכן את המסך שלנו:
  // המשתנה הזה יגיד לנו אם התמונה עכשיו באמצע עליה (כדי שנוכל להציג ספינר טעינה)
  const [isUploading, setIsUploading] = useState(false);

  // המשתנה הזה ישמור טקסט של שגיאה, למקרה שמשהו ישתבש בדרך
  const [uploadError, setUploadError] = useState(null);

  // 2. זו הפונקציה המרכזית שתעשה את כל העבודה.
  // היא מקבלת שני דברים: את הקובץ של התמונה, ואת השם של התיקייה שבה נרצה לשמור אותה (למשל "ban-tao/rooms")
  const uploadImage = async (file, folderName) => {
    // מדליקים את מצב ה"טעינה" כדי שהמשתמש ידע שמשהו קורה עכשיו
    setIsUploading(true);
    // מנקים שגיאות ישנות אם היו כאלה
    setUploadError(null);

    try {
      // ---------------------------------------------------------
      // שלב א': מבקשים אישור (חתימה) מהשרת שלנו
      // ---------------------------------------------------------
      // אנחנו פונים לראוט שבנית ב-Node.js ושולחים לו את שם התיקייה
      const signResponse = await axios.post(
        "http://localhost:3000/api/v1/uploads/sign-cloudinary",
        { folder: folderName },
      );

      // השרת ענה לנו! אנחנו מושכים מתוך התשובה שלו את כל הנתונים שהוא הכין לנו:
      // את החתימה הסודית (signature), את ה-API Key, את השעה (timestamp) ועוד.
      const { timestamp, folder, signature, apiKey, cloudName } =
        signResponse.data;

      // ---------------------------------------------------------
      // שלב ב': אורזים את הכל לחבילה אחת
      // ---------------------------------------------------------
      // אי אפשר לשלוח קבצים סתם ככה. FormData זה בעצם "ארגז" וירטואלי שריאקט נותן לנו.
      const formData = new FormData();

      // אנחנו מכניסים לתוך הארגז את הקובץ של התמונה...
      formData.append("file", file);
      // ואז מכניסים לאותו ארגז את כל האישורים שקיבלנו מהשרת שלנו הרגע:
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", folder);

      // ---------------------------------------------------------
      // שלב ג': שולחים את הארגז לקלאודינרי!
      // ---------------------------------------------------------
      // הטיסה יוצאת: אנחנו שולחים את הארגז המלא ישירות לכתובת של קלאודינרי
      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
      );

      // סיימנו! התמונה עלתה. מכבים את מצב ה"טעינה"
      setIsUploading(false);

      // קלאודינרי החזיר לנו תשובה שיש בה את הכתובת הסופית של התמונה.
      // אנחנו מחזירים את זה החוצה כדי שהטופס שלנו יוכל להשתמש בזה ולהכניס למונגו.
      return {
        url: cloudinaryResponse.data.secure_url,
        publicId: cloudinaryResponse.data.public_id,
      };
    } catch (error) {
      // אם משהו בדרך נכשל (אין אינטרנט, השרת נפל וכו') נגיע לפה
      console.error("Upload error:", error);
      setUploadError("שגיאה בהעלאת התמונה"); // שומרים את השגיאה כדי להציג למשתמש
      setIsUploading(false); // מכבים את הטעינה למרות שנכשלנו, כדי שהאתר לא ייתקע
      return null; // מחזירים כלום (null) כי אין תמונה
    }
  };

  // בסוף הקובץ, ההוק חושף החוצה את הפונקציה ואת המשתנים, כדי שכל טופס באתר יוכל להשתמש בהם
  return { uploadImage, isUploading, uploadError };
}
