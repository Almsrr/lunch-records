import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface GridHeaderProps {
  recordsIds: string[];
  onDelete: () => void;
}

export const GridHeader: FC<GridHeaderProps> = ({ recordsIds, onDelete }) => {
  const navigate = useNavigate();

  const editHandler = () => {
    const id = recordsIds[0];
    navigate(`edit?id=${id}`);
  };

  const addHandler = () => {
    navigate("add");
  };

  return (
    <Container>
      <Title>Records</Title>
      <Actions>
        <Button
          type="button"
          onClick={editHandler}
          disabled={recordsIds.length !== 1}
        >
          Edit <i className="fa-solid fa-pen"></i>
        </Button>
        <Button
          type="button"
          onClick={onDelete}
          disabled={recordsIds.length < 1}
        >
          Delete <i className="fa-solid fa-trash-can"></i>
        </Button>
        <Button type="button" onClick={addHandler}>
          Add <i className="fa-solid fa-plus"></i>
        </Button>
      </Actions>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: #003366;
  color: #fff;
  padding: 1.75rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button<{ disabled?: boolean }>`
  border: none;
  background-color: inherit;
  color: ${props => (!props.disabled ? "#fff" : "#A8A8A8")};
  cursor: ${props => (!props.disabled ? "pointer" : "not-allowed")};
  transition: color 200ms linear;
  padding: 0.5rem;
  font-weight: 500;

  & i {
    margin-left: 5px;
    font-size: 18px;
  }
`;
