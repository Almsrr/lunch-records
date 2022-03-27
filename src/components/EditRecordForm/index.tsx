import { FC, Fragment, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { RecordForm } from "../RecordForm";
import { NewRecord } from "../../types/NewRecord";
import { Modal } from "react-bootstrap";
import { ModalConfig } from "../../types/ModalConfig";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const EditRecordForm: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getRecord, updateRecord } = useLocalStorage();
  const [initials, setInitials] = useState<NewRecord>();
  const [modal, setModal] = useState<ModalConfig>({
    show: false,
    error: false,
    loading: false,
    message: <p></p>,
  });

  useEffect(() => {
    const recordId = searchParams.get("id");
    const record = getRecord(recordId!);
    if (record) {
      setInitials(record);
    }
  }, [searchParams, getRecord]);

  const modifyRecord = (record: NewRecord) => {
    const recordId = searchParams.get("id");
    updateRecord(recordId!, record);
    goToHome();
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
        onSubmit={modifyRecord}
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
