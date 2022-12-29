import { useState } from 'react';

export const useForm = <FormType,>(initialState: FormType) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    formData,
    handleChange,
  };
};
