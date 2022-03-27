import { FC, Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RecordForm } from "../RecordForm";
import { NewRecord } from "../../types/NewRecord";
import { Modal } from "../Modal";
import { ModalOptions } from "../../types/ModalOptions";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const AddRecordForm: FC = () => {
  const navigate = useNavigate();
  const { addRecord } = useLocalStorage();
  const [modal, setModal] = useState<ModalOptions>({
    show: false,
    type: "",
    message: "",
  });

  const addNewRecord = (newRecord: NewRecord) => {
    modalHandler({
      show: true,
      type: "loading",
      message: "Loading...",
    });

    addRecord(newRecord);

    modalHandler({
      show: true,
      type: "success",
      message: "Record added successfully",
    });
  };

  const modalHandler = (opts: ModalOptions) => {
    setModal(opts);
  };

  const goToHome = () => {
    navigate("/");
  };

  const closeModal = () => {
    modalHandler({
      show: false,
      message: "",
      type: "",
    });
  };

  return (
    <Fragment>
      <RecordForm
        onSubmit={addNewRecord}
        onFinish={goToHome}
        title={"New Record"}
        onModal={modalHandler}
      />
      {modal.show && (
        <Modal
          type={modal.type}
          message={modal.message}
          onClose={closeModal}
          onConfirm={goToHome}
          onSuccess={goToHome}
        />
      )}
    </Fragment>
  );
};
