import { FC, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { RecordForm } from "../RecordForm";
import { NewRecord } from "../../types/NewRecord";

export const EditRecordForm: FC = () => {
  const navigate = useNavigate();

  const updateRecord = (record: NewRecord) => {};

  const goToHome = () => {
    navigate("/");
  };

  return (
    <Fragment>
      <RecordForm
        edit
        onSubmit={updateRecord}
        onFinish={goToHome}
        title={"Edit record"}
      />
    </Fragment>
  );
};
