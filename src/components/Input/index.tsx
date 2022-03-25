import { FC, Fragment, ChangeEvent } from "react";

import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";

interface InputProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

export const Input: FC<InputProps> = props => {
  const { label, id, type, value, onChange, onBlur } = props;

  return (
    <Fragment>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <FormControl
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </Fragment>
  );
};
