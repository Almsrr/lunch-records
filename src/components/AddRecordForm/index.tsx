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
      <RecordForm
        onSubmit={sendNewRecord}
        onFinish={goToHome}
        title={"New Record"}
      />
    </Fragment>
  );
};
