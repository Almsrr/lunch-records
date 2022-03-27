import { FC, Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RecordForm } from "../RecordForm";
import { NewRecord } from "../../types/NewRecord";
import { Modal } from "../Modal";
import { ModalConfig } from "../../types/ModalConfig";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const AddRecordForm: FC = () => {
  const navigate = useNavigate();
  const { addRecord } = useLocalStorage();
  const [modal, setModal] = useState<ModalConfig>({
    show: false,
    error: false,
    message: <p></p>,
    loading: false,
  });

  const sendNewRecord = (newRecord: NewRecord) => {
    modalHandler({
      show: true,
      error: false,
      loading: true,
      message: <p className="m-0">Loading...</p>,
    });

    addRecord(newRecord);

    modalHandler({
      show: true,
      error: false,
      message: <p className="m-0">Record added successfully</p>,
    });
  };

  const modalHandler = (config: ModalConfig) => {
    setModal(config);
  };

  const goToHome = () => {
    navigate("/");
  };

  const closeModal = () => {
    modalHandler({
      show: false,
      error: false,
      message: <p></p>,
      loading: false,
    });
  };

  return (
    <Fragment>
      <RecordForm
        onSubmit={sendNewRecord}
        onFinish={goToHome}
        title={"New Record"}
        onModal={modalHandler}
      />
      {modal.show && (
        <Modal
          error={modal.error}
          message={modal.message}
          onClose={closeModal}
          loading={modal.loading}
        />
      )}
    </Fragment>
  );
};
