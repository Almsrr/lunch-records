import { FC, Fragment, ChangeEvent } from "react";
import styled from "styled-components";

interface TextareaProps {
  id: string;
  label: string;
  value: string;
  rows?: number;
  onChange: (value: string) => void;
}

export const Textarea: FC<TextareaProps> = props => {
  const { id, label, value, rows, onChange } = props;

  const changeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };
  return (
    <Fragment>
      <Label htmlFor={id}>{label}</Label>
      <Area
        id={id}
        rows={rows || 8}
        value={value}
        onChange={changeHandler}
        placeholder="Write here..."
      ></Area>
    </Fragment>
  );
};

const Label = styled.label`
  display: inline-block;
  color: #000;
  font-size: 14px;
  font-weight: 500;
`;

const Area = styled.textarea`
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
