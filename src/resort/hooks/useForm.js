import { useState } from "react";
import Joi from "joi";

export default function useForm(initialValues, schemaOBJ, onSubmit) {
  const [formDetails, setFormDetails] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const schema = Joi.object(schemaOBJ);
  const handleChange = (event) => {
    const { value, name, type, checked } = event.target;
    const finalValue = type === "checkbox" ? checked : value;
    setFormDetails((prev) => ({ ...prev, [name]: finalValue }));
    console.log(finalValue);

    const fieldSchema = Joi.object({ [name]: schemaOBJ[name] });
    const { error } = fieldSchema.validate(
      { [name]: finalValue },
      { abortEarly: false },
    );
    if (error) {
      console.log(error.details[0].message);
      setErrors((prev) => ({ ...prev, [name]: error.details[0].message }));
    } else {
      setErrors((prev) => {
        delete prev[name];
        return prev;
      });
    }
  };

  const handleSubmit = () => {
    const { error } = schema.validate(formDetails, { abortEarly: false });
    if (!error) {
      onSubmit(formDetails);
    }
  };

  return { handleChange, handleSubmit, errors, formDetails };
}
