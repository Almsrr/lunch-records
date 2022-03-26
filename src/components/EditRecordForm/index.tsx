import { FC, Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RecordForm } from "../RecordForm";
import { NewRecord } from "../../types/NewRecord";
import { Modal } from "react-bootstrap";
import { ModalConfig } from "../../types/ModalConfig";

export const EditRecordForm: FC = () => {
  const navigate = useNavigate();
  const [initials, setInitials] = useState<NewRecord>();
  const [modal, setModal] = useState<ModalConfig>({
    show: false,
    error: false,
    loading: false,
    message: <p></p>,
  });

  useEffect(() => {
    setInitials({
      firstName: "Alam",
      lastName: "Sierra",
      age: 89,
      address: "Lotes",
      email: "alam@domain.com",
      phoneNumber: "1233333",
      foodDelivered: true,
      comment: "come mucho",
    });
  }, []);
  const updateRecord = (record: NewRecord) => {
    console.log(record);
  };

  const goToHome = () => {
    navigate("/");
  };

  const modalHandler = (config: ModalConfig) => {
    setModal(config);
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
        edit
        onSubmit={updateRecord}
        onFinish={goToHome}
        title={"Edit record"}
        initials={initials}
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
