import { SetStateAction, useState } from 'react';
import { Form } from 'react-bootstrap';

import { FormTextfieldTypes } from '../form-textfield.types';

export const FormTextfieldComponent = ({
  placeholder,
  value,
  onChange,
}: FormTextfieldTypes) => {
  const [valueTextfield, setValueTextfield] = useState(value || '');

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setValueTextfield(e.target.value);
    onChange(e.target.value.toString());
  };

  return (
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Control
        placeholder={placeholder}
        value={valueTextfield}
        onChange={handleChange}
      />
    </Form.Group>
  );
};
