import { FC, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { Record } from "../../types/Record";
import { GridHeader } from "./GridHeader";
import { GridTable } from "./GridTable";
import { GridFilters } from "./GridFilters";

export const RecordsGrid: FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [selectedRecordsIds, setSelectedRecordsIds] = useState<string[]>([]);
  const {
    getRecords,
    deleteRecords,
    updateFoodDelivered,
    filterByFullName,
    filterByEmail,
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

  const updateRecordItem = (id: string, foodDelivered: boolean) => {
    updateFoodDelivered(id, foodDelivered);
    fetchRecords();
  };

  const deleteSelectedRecords = () => {
    deleteRecords(selectedRecordsIds);
    fetchRecords();
  };

  const filterFullName = (value: string) => {
    const filteredRecords = filterByFullName(value);
    setRecords(filteredRecords);
  };

  const filterEmail = (value: string) => {
    const filteredRecords = filterByEmail(value);
    setRecords(filteredRecords);
  };

  return (
    <Container>
      <GridFilters
        onFilterFullName={filterFullName}
        onFilterEmail={filterEmail}
      />
      <GridHeader
        recordsIds={selectedRecordsIds}
        onDelete={deleteSelectedRecords}
      />
      <GridTable
        recordsList={records}
        onSelectRecord={selectRecordItem}
        onUpdateRecordFood={updateRecordItem}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 85%;
  overflow-x: scroll;
`;
