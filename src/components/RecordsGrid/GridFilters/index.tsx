import { FC, ChangeEvent, memo } from "react";
import styled from "styled-components";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface GridFiltersProp {
  onFilterFullName: (expr: string) => void;
  onFilterEmail: (expr: string) => void;
}
export const GridFilters: FC<GridFiltersProp> = memo(
  ({ onFilterFullName, onFilterEmail }) => {
    const filterByName = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      onFilterFullName(value);
    };

    const filterByEmail = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      onFilterEmail(value);
    };
    return (
      <Row className="pb-3 align-items-center flex-wrap">
        <Col xs={12} lg={"auto"}>
          <Heading>
            Filters <i className="fa-solid fa-arrow-down-short-wide"></i>
          </Heading>
        </Col>
        <Col xs={12} lg={4}>
          <Flex>
            <label className="m-0">Name</label>
            <Filter onChange={filterByName} placeholder="John Doe"></Filter>
          </Flex>
        </Col>
        <Col xs={12} lg={4}>
          <Flex>
            <label className="m-0">Email</label>
            <Filter
              onChange={filterByEmail}
              placeholder="john@domain.com"
            ></Filter>
          </Flex>
        </Col>
      </Row>
    );
  }
);

const Flex = styled.section`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const Filter = styled.input`
  flex: 1;
  border-radius: 0.25rem;
  border: 1px solid #d0d0d0;
  padding: 0.5rem;
  max-width: 300px;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;
