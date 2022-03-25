import { FC, ChangeEvent } from "react";
import styled from "styled-components";

interface CheckboxProps {
  label: string;
  id: string;
  onChange: (isChecked: boolean) => void;
}

export const Checkbox: FC<CheckboxProps> = ({ id, label, onChange }) => {
  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onChange(true);
      return;
    }
    onChange(false);
  };

  return (
    <Flex>
      <Input type="checkbox" id={id} onChange={inputHandler} />
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
  width: 18px;
  height: 18px;
`;

const Label = styled.label`
  margin: 0;
`;
