import { FC, useState, FormEvent, ChangeEvent } from "react";

import { NewRecord } from "../../types/NewRecord";

interface RecordFormProps {
  edit?: boolean;
  onSubmit(record: NewRecord): void;
  onFinish?: () => void;
}

export const RecordForm: FC<RecordFormProps> = ({
  edit,
  onSubmit,
  onFinish,
}) => {
  const [editMode] = useState(edit || false);
  const [name, setName] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();

    //validate data

    const record = {
      firstName: "",
      lastName: "",
      phone: "",
      age: "",
      address: "",
      foodDelivered: false,
      email: "",
      comment: "",
    };
    onSubmit(record);

    //clean inputs
    setName("");
  };

  const finish = () => {
    //if there is data in form
    const confirmed = window.confirm(
      "Are you sure do you want leave this page? All the data will be lost"
    );
    if (confirmed) {
      onFinish!();
    }
  };

  const nameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <form onSubmit={submit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" value={name} onChange={nameHandler} />
      <button type="button" onClick={finish}>
        {!editMode ? "Finish" : "Cancel"}
      </button>
      <button type="submit" onClick={submit}>
        {!editMode ? "Add" : "Save changes"}
      </button>
    </form>
  );
};
