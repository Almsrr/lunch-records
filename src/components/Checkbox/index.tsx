import { FC, ChangeEvent } from "react";
import styled from "styled-components";

interface CheckboxProps {
  id: string;
  label?: string;
  value?: boolean;
  onChange: (isChecked: boolean) => void;
  size?: number;
}

export const Checkbox: FC<CheckboxProps> = ({
  id,
  label,
  onChange,
  value,
  size,
}) => {
  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onChange(true);
      return;
    }
    onChange(false);
  };

  if (!label) {
    <Input
      type="checkbox"
      id={id}
      onChange={inputHandler}
      checked={value}
      size={size}
    />;
  }

  return (
    <Flex>
      <Input
        type="checkbox"
        id={id}
        onChange={inputHandler}
        checked={value}
        size={size}
      />
      <Label>{label}</Label>
    </Flex>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Input = styled.input<{ size?: number }>`
  width: ${props => props.size || 16}px;
  height: ${props => props.size || 16}px;
`;

const Label = styled.label`
  color: #000;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
`;
