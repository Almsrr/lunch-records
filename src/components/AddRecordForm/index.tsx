import { FC, Fragment, useState, ReactElement } from "react";
import { useNavigate } from "react-router-dom";

import { RecordForm } from "../RecordForm";
import { NewRecord } from "../../types/NewRecord";
import { Modal } from "../Modal";

export interface ModalConfig {
  show: boolean;
  error?: boolean;
  loading?: boolean;
  message: ReactElement;
}

export const AddRecordForm: FC = () => {
  const [modal, setModal] = useState<ModalConfig>({
    show: false,
    error: false,
    message: <p></p>,
    loading: false,
  });
  const navigate = useNavigate();

  const sendNewRecord = (newRecord: NewRecord) => {
    const message = <p className="m-0">Loading...</p>;
    setModal({ show: true, error: false, message, loading: true });

    setTimeout(() => {
      const message = <p className="m-0">Record added successfully</p>;
      setModal({ show: true, error: false, message });
      // const message = <p className="m-0">Something went wrong</p>;
      // setModal({ show: true, error: true, message });
    }, 2000);
  };

  const goToHome = () => {
    navigate("/");
  };

  const closeModal = () => {
    setModal({ show: false, error: false, message: <p></p>, loading: false });
  };

  return (
    <Fragment>
      <RecordForm
        onSubmit={sendNewRecord}
        onFinish={goToHome}
        title={"New Record"}
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
