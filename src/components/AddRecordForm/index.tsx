import { FC, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { RecordForm } from "../RecordForm";
import { NewRecord } from "../../types/NewRecord";

export const AddRecordForm: FC = () => {
  const navigate = useNavigate();

  const sendNewRecord = (newRecord: NewRecord) => {};

  const goToHome = () => {
    navigate("/");
  };

  return (
    <Fragment>
      <h1>New Record</h1>
      <RecordForm onSubmit={sendNewRecord} onFinish={goToHome} />
    </Fragment>
  );
};
