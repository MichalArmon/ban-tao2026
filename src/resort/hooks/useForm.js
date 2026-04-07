import { useState } from "react";
import Joi from "joi";

export default function useForm(initialValues, schemaOBJ, onSubmit) {
  const [formDetails, setFormDetails] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const schema = Joi.object(schemaOBJ);

  const validateField = (name, value) => {
    const fieldSchema = Joi.object({ [name]: schemaOBJ[name] });
    const { error } = fieldSchema.validate(
      { [name]: value },
      { abortEarly: false },
    );

    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error.details[0].message }));
    } else {
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

  const handleSubmit = () => {
    const { error } = schema.validate(formDetails, { abortEarly: false });
    if (!error) {
      onSubmit(formDetails);
    } else {
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
