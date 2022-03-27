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

  const updateRecordFood = (id: string, foodDelivered: boolean) => {
    updateFoodDelivered(id, foodDelivered);
    fetchRecords();
  };

  const deleteSelectedRecords = () => {
    deleteRecords(selectedRecordsIds);
    fetchRecords();
  };

  const filterFullName = useCallback(
    (expr: string) => {
      const filteredRecords = filterByFullName(expr);
      setRecords(filteredRecords);
    },
    [setRecords, filterByFullName]
  );

  const filterEmail = useCallback(
    (expr: string) => {
      const filteredRecords = filterByEmail(expr);
      setRecords(filteredRecords);
    },
    [setRecords, filterByEmail]
  );

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
        onUpdateRecordFood={updateRecordFood}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 85%;
  overflow-x: scroll;
`;
