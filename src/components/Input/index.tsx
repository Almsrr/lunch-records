import { FC, Fragment, ChangeEvent } from "react";
import styled from "styled-components";

interface InputProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  pattern?: string;
  errorMessage?: string;
}

export const Input: FC<InputProps> = props => {
  const { label, id, type, value, onChange, onBlur, pattern, errorMessage } =
    props;

  return (
    <Fragment>
      <Label htmlFor={id}>{label}</Label>
      <Control
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        pattern={pattern}
      />
      <ErrorMessage>{errorMessage || "Invalid input"}</ErrorMessage>
    </Fragment>
  );
};

const Label = styled.label`
  display: inline-block;
  color: #000;
  font-size: 14px;
  font-weight: 500;
`;

const Control = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d0d0d0;
  border-radius: 0.25rem;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const ErrorMessage = styled.p`
  display: none;
  color: #ce2029;
  font-size: 14px;
  padding: 0.5rem 0;
  margin: 0;
`;
