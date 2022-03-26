import { FC, ChangeEvent } from "react";
import styled from "styled-components";

interface CheckboxProps {
  label: string;
  id: string;
  value: boolean;
  onChange: (isChecked: boolean) => void;
}

export const Checkbox: FC<CheckboxProps> = ({ id, label, onChange, value }) => {
  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onChange(true);
      return;
    }
    onChange(false);
  };

  return (
    <Flex>
      <Input type="checkbox" id={id} onChange={inputHandler} checked={value} />
      <Label>{label}</Label>
    </Flex>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Input = styled.input`
  width: 16px;
  height: 16px;
`;

const Label = styled.label`
  color: #000;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
`;
