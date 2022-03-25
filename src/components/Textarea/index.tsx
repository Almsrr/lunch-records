import { FC, Fragment, ChangeEvent } from "react";
import styled from "styled-components";

interface TextareaProps {
  id: string;
  label: string;
  value: string;
  rows?: number;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea: FC<TextareaProps> = props => {
  const { id, label, value, rows, onChange } = props;
  return (
    <Fragment>
      <label htmlFor={id}>{label}</label>
      <Area
        className="form-control"
        id={id}
        rows={rows || 8}
        value={value}
        onChange={onChange}
        placeholder="Write here..."
      ></Area>
    </Fragment>
  );
};

const Area = styled.textarea`
  display: block;
  width: 100%;
`;
