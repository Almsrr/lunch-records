import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Record } from "../../../types/Record";

interface GridHeaderProps {
  selectedRecords: Record[];
  onDelete: () => void;
}

export const GridHeader: FC<GridHeaderProps> = ({
  selectedRecords,
  onDelete,
}) => {
  const navigate = useNavigate();

  const editHandler = () => {
    const id = selectedRecords[0].id;
    navigate(`edit?id=${id}`);
  };

  const deleteHandler = () => {
    const confirmed = window.confirm(
      "Are you sure do you want to delete this record?"
    );
    if (confirmed) {
      onDelete();
    }
  };
  const addHandler = () => {
    navigate("add");
  };

  return (
    <Header>
      <h1 className="m-0">Records</h1>
      {/* <Actions>
        {selectedRecords.length === 1 && (
          <Button type="button" onClick={editHandler}>
            Edit <i className="fa-solid fa-pen"></i>
          </Button>
        )}
        {selectedRecords.length > 0 && (
          <Button type="button" onClick={deleteHandler}>
            Delete <i className="fa-solid fa-trash-can"></i>
          </Button>
        )}
        <Button type="button" onClick={addHandler}>
          Add <i className="fa-solid fa-plus"></i>
        </Button>
      </Actions> */}
      <Actions>
        <Button
          type="button"
          onClick={editHandler}
          disabled={!(selectedRecords.length === 1)}
        >
          Edit <i className="fa-solid fa-pen"></i>
        </Button>

        <Button
          type="button"
          onClick={deleteHandler}
          disabled={!(selectedRecords.length > 0)}
        >
          Delete <i className="fa-solid fa-trash-can"></i>
        </Button>
        <Button type="button" onClick={addHandler}>
          Add <i className="fa-solid fa-plus"></i>
        </Button>
      </Actions>
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: #003366;
  color: #fff;
  padding: 1.75rem;
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

  & i {
    margin-left: 5px;
    font-size: 18px;
  }
`;
