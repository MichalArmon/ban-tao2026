import { useState } from "react";
import Joi from "joi";

export default function useForm(initialValues, schemaOBJ, onSubmit) {
  const [formDetails, setFormDetails] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const schema = Joi.object(schemaOBJ);

  // const validateField = (name, value) => {
  //   const fieldSchema = Joi.object({ [name]: schemaOBJ[name] });
  //   const { error } = fieldSchema.validate(
  //     { [name]: value },
  //     { abortEarly: false },
  //   );

  //   if (error) {
  //     setErrors((prev) => ({ ...prev, [name]: error.details[0].message }));
  //   } else {
  //     setErrors((prev) => {
  //       const newErrors = { ...prev };
  //       delete newErrors[name];
  //       return newErrors;
  //     });
  //   }
  // };

  const validateField = (name, value) => {
    // 1. בונים אובייקט זמני שכולל את כל נתוני הטופס הקיימים + הערך החדש שהוזן הרגע
    const updatedFormDetails = { ...formDetails, [name]: value };

    // 2. בודקים את *כל* האובייקט המעודכן מול *כל* הסכימה (כדי ש-Joi.ref יעבוד)
    const { error } = schema.validate(updatedFormDetails, {
      abortEarly: false,
    });

    if (error) {
      // 3. מחפשים בתוך מערך השגיאות: האם יש שגיאה שקשורה ספציפית לשדה הנוכחי?
      const currentFieldError = error.details.find(
        (item) => item.path[0] === name,
      );

      if (currentFieldError) {
        // אם מצאנו שגיאה לשדה הזה, נעדכן אותה בסטייט
        setErrors((prev) => ({ ...prev, [name]: currentFieldError.message }));
      } else {
        // אם יש שגיאות בטופס, אבל *לא* בשדה הזה - ננקה את השגיאה של השדה הזה
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    } else {
      // 4. אם אין שגיאות בכלל באף שדה, ננקה את השגיאה של השדה הנוכחי
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  const handleChange = (event) => {
    const { value, name, type, checked } = event.target;
    const finalValue = type === "checkbox" ? checked : value;

    setFormDetails((prev) => ({ ...prev, [name]: finalValue }));
    validateField(name, finalValue);
  };

  const handleManualChange = (name, value) => {
    setFormDetails((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { error } = schema.validate(formDetails, { abortEarly: false });
    if (!error) {
      console.log("FORM DATA BEFORE SUBMIT:", formDetails);
      onSubmit(formDetails);
    } else {
      console.log("Joi full error:", error);
      console.log("Joi details:", error?.details);
      const joiErrors = {};
      error.details.forEach((item) => {
        joiErrors[item.path[0]] = item.message;
      });

      setErrors(joiErrors);
    }
  };

  return {
    handleChange,
    handleManualChange,
    handleSubmit,
    errors,
    formDetails,
    setFormDetails,
  };
}
