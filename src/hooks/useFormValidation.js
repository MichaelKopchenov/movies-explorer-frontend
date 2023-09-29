import { useCallback, useState } from "react";

export default function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isInputValid, setIsInputValid] = useState({});
  const [isValid, setIsValid] = useState(false);

  const setValue = useCallback((name, value) => {
    setValues((val) => {
      return { ...val, [name]: value };
    });
  }, []
  );

  const resetForm = useCallback((data = {}) => {
    setValues(data);
    setErrors({});
    setIsInputValid({});
    setIsValid(false);
  },[]
  );

  function handleChange(evt) {
    const name = evt
      .target
      .name;
    const value = evt
      .target
      .value;
    const validationMessage = evt
      .target
      .validationMessage;
    const valid = evt
      .target
      .validity
      .valid;
    const form = evt
      .target
      .form;

    setValues((val) => {
      return { ...val, [name]: value };
    });
    setErrors(err => {
      return { ...err, [name]: validationMessage };
    });
    setIsInputValid((vali) => {
      return { ...vali, [name]: valid };
    });
    setIsValid(form.checkValidity());
  };

  return {
    values,
    errors,
    isInputValid,
    isValid,
    handleChange,
    setValue,
    resetForm
  };
};
