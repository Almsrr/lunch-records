import { FC, Fragment, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { RecordForm } from "../RecordForm";
import { NewRecord } from "../../types/NewRecord";
import { Modal } from "../Modal";
import { ModalOptions } from "../../types/ModalOptions";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const EditRecordForm: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getRecord, updateRecord } = useLocalStorage();
  const [initials, setInitials] = useState<NewRecord>();
  const [modal, setModal] = useState<ModalOptions>({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    const recordId = searchParams.get("id");
    const record = getRecord(recordId!);
    if (record) {
      setInitials(record);
    }
  }, [searchParams, getRecord]);

  const modifyRecord = (record: NewRecord) => {
    modalHandler({ show: true, type: "loading", message: "Loading..." });

    const recordId = searchParams.get("id");
    updateRecord(recordId!, record);

    modalHandler({
      show: true,
      type: "success",
      message: "Record updated successfully!",
    });
  };

  const goToHome = () => {
    navigate("/");
  };

  const modalHandler = (opts: ModalOptions) => {
    setModal(opts);
  };

  const closeModal = () => {
    modalHandler({
      show: false,
      type: "",
      message: "",
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
          type={modal.type}
          message={modal.message}
          onClose={closeModal}
          onConfirm={goToHome}
        />
      )}
    </Fragment>
  );
};
