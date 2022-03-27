import { v4 as uuidv4 } from "uuid";

import { NewRecord } from "../types/NewRecord";
import { Record } from "../types/Record";

export const useLocalStorage = () => {
  const addRecord = (record: NewRecord) => {
    const newRecord = { id: uuidv4(), ...record };
    const records: Record[] = JSON.parse(localStorage.getItem("records")!);

    if (records) {
      const updatedRecords = JSON.stringify([...records, newRecord]);
      localStorage.setItem("records", updatedRecords);
      return;
    }
    const newRecords = JSON.stringify(Array(newRecord));
    localStorage.setItem("records", newRecords);
  };

  const updateRecord = (id: string, record: NewRecord) => {
    const records: Record[] = JSON.parse(localStorage.getItem("records")!);

    const index = records.findIndex(record => record.id === id);
    records[index] = { id, ...record };

    const updatedRecords = JSON.stringify(records);
    localStorage.setItem("records", updatedRecords);
  };
  const getRecords = () => {};
  const getRecord = () => {};
  const deleteRecord = () => {};

  return { addRecord, updateRecord };
};
