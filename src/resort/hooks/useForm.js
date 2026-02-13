import { useState } from "react";
import Joi from "joi";

export default function useForm(initialValues, schemaOBJ, onSubmit) {
  const [formDetails, setFormDetails] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const schema = Joi.object(schemaOBJ);
  const handleChange = (event) => {
    const [value, name] = event.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
    console.log(value);

    const fieldSchema = Joi.object({ [name]: schemaOBJ[name] });
    const { error } = fieldSchema.validate(
      { [name]: value },
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
    console.log(formDetails);
    const { error } = schema.validate(formDetails, { abortEarly: false });
    if (!error) {
      onSubmit(formDetails);
    }
  };

  return { handleChange, handleSubmit, errors, formDetails };
}
