import { FC, memo, useRef, FormEvent } from "react";
import styled from "styled-components";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface GridFiltersProp {
  onFilter: (name: string, email: string) => void;
}
export const GridFilters: FC<GridFiltersProp> = memo(({ onFilter }) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const filter = (event: FormEvent) => {
    event.preventDefault();

    const name = nameInputRef.current!.value;
    const email = emailInputRef.current!.value;
    onFilter(name, email);
  };

  return (
    <form onSubmit={filter}>
      <Row className="pb-3 align-items-center flex-wrap">
        <Col xs={12} lg={"auto"} className="py-2">
          <Heading>
            Filters <i className="fa-solid fa-arrow-down-short-wide"></i>
          </Heading>
        </Col>
        <Col xs={12} lg={"auto"} className="py-2">
          <Flex>
            <label className="m-0">Name</label>
            <Filter ref={nameInputRef} placeholder="John Doe"></Filter>
          </Flex>
        </Col>
        <Col xs={12} lg={"auto"} className="py-2">
          <Flex>
            <label className="m-0">Email</label>
            <Filter ref={emailInputRef} placeholder="john@domain.com"></Filter>
          </Flex>
        </Col>
        <Col xs={12} lg={"auto"}>
          <Button type="submit">Search</Button>
        </Col>
      </Row>
    </form>
  );
});

const Flex = styled.section`
  display: flex;
  align-items: center;
  gap: 0.75rem;
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
  width: 200px;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const Button = styled.button`
  display: block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  color: #000;
  background-color: #d3d3d3;
`;
