import { FC, useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Record } from "../../types/Record";
import { GridHeader } from "./GridHeader";
import { GridTable } from "./GridTable";
import { GridFilters } from "./GridFilters";
import { Modal } from "../Modal";
import { ModalOptions } from "../../types/ModalOptions";

export const RecordsGrid: FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [selectedRecordsIds, setSelectedRecordsIds] = useState<string[]>([]);
  const [modal, setModal] = useState<ModalOptions>({
    show: false,
    type: "",
    message: "",
  });
  const {
    getRecords,
    deleteRecords,
    updateFoodDelivered,
    filterByNameAndEmail,
  } = useLocalStorage();

  const fetchRecords = useCallback(() => {
    const loadedRecords = getRecords();
    if (loadedRecords) {
      setRecords(loadedRecords);
    }
  }, [getRecords]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const selectRecordItem = (selectedRecordId: string) => {
    const exists = selectedRecordsIds.some(id => id === selectedRecordId);
    if (!exists) {
      setSelectedRecordsIds(ids => [...ids, selectedRecordId]);
      return;
    }
    setSelectedRecordsIds(ids => ids.filter(id => id !== selectedRecordId));
  };

  const updateRecordFood = (id: string, foodDelivered: boolean) => {
    updateFoodDelivered(id, foodDelivered);
    fetchRecords();
  };

  const confirmDeletion = () => {
    setModal({
      show: true,
      type: "warning",
      message: "Are you sure do you want to delete this records?",
    });
  };

  const closeModal = () => {
    setModal({
      show: false,
      message: "",
      type: "",
    });
  };

  const deleteSelectedRecords = () => {
    setModal({ show: true, type: "loading", message: "Loading..." });

    deleteRecords(selectedRecordsIds);
    selectedRecordsIds.forEach(id => {
      const index = records.findIndex(record => record.id === id);
      records.splice(index, 1);
    });
    setSelectedRecordsIds([]);

    setModal({
      show: true,
      type: "success",
      message: "Records deleted successfully!",
    });
  };

  const filterNameAndEmail = useCallback(
    (nameExpr: string, emailExpr: string) => {
      setModal({
        show: true,
        type: "loading",
        message: "Filtering...",
      });

      const filteredRecords = filterByNameAndEmail(nameExpr, emailExpr);
      setRecords(filteredRecords);
      setModal({
        show: false,
        type: "",
        message: "",
      });
    },
    [setRecords, filterByNameAndEmail]
  );

  return (
    <Container>
      <GridFilters onFilter={filterNameAndEmail} />
      <GridHeader recordsIds={selectedRecordsIds} onDelete={confirmDeletion} />
      <GridTable
        recordsList={records}
        onSelectRecord={selectRecordItem}
        onUpdateRecordFood={updateRecordFood}
      />
      {modal.show && (
        <Modal
          type={modal.type}
          message={modal.message}
          onClose={closeModal}
          onConfirm={deleteSelectedRecords}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 85%;
`;
