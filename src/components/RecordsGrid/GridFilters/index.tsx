import { FC, ChangeEvent } from "react";
import styled from "styled-components";

interface GridFiltersProp {
  onFilterFullName: (value: string) => void;
  onFilterEmail: (value: string) => void;
}
export const GridFilters: FC<GridFiltersProp> = ({
  onFilterFullName,
  onFilterEmail,
}) => {
  const filterByName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onFilterFullName(value);
  };

  const filterByEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onFilterEmail(value);
  };
  return (
    <Flex>
      <Title>
        Filters <i className="fa-solid fa-arrow-down-short-wide"></i>
      </Title>
      <Filter onChange={filterByName} placeholder="Name"></Filter>
      <Filter onChange={filterByEmail} placeholder="Email"></Filter>
    </Flex>
  );
};

const Flex = styled.section`
  display: flex;
  align-items: center;
  padding-bottom: 1.5rem;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const Filter = styled.input`
  border-radius: 0.25rem;
  border: 1px solid #d0d0d0;
  padding: 0.5rem;
  width: 200px;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;
