import { useState } from 'react';

export const useForm = <FormType,>( // ErrorType
  initialState: FormType
  // initialErrors: ErrorType,
  // onSubmit: (data: FormType) => void
  // onValidate: (data: FormType) => ErrorType
) => {
  const [formData, setFormData] = useState(initialState);
  // const [errors, setErrors] = useState(initialErrors);

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // const validationErrors = onValidate(formData);
  //   // setErrors(validationErrors);
  //   // if (Object.keys(validationErrors).length === 0) {
  //   onSubmit(formData);
  //   // }
  // };

  // const handleClickSubmit = () => {
  //   // const validationErrors = onValidate(formData);
  //   // setErrors(validationErrors);
  //   // if (Object.keys(validationErrors).length === 0) {
  //   onSubmit(formData);
  //   // }
  // };

  return {
    // errors,
    formData,
    handleChange,
    // handleSubmit,
    // handleClickSubmit,
  };
};
