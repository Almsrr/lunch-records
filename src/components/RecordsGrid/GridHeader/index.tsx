import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const GridHeader: FC = () => {
  const navigate = useNavigate();

  const editHandler = () => {
    navigate(`edit?id=${0}`);
  };

  const deleteHandler = () => {
    const confirmed = window.confirm(
      "Are you sure do you want to delete this record?"
    );
    if (confirmed) {
      //do something
    }
  };
  const addHandler = () => {
    navigate("add");
  };

  return (
    <div>
      <h1>Records</h1>
      <button type="button" onClick={editHandler}>
        Edit
      </button>
      <button type="button" onClick={deleteHandler}>
        Delete
      </button>
      <button type="button" onClick={addHandler}>
        Add
      </button>
    </div>
  );
};
