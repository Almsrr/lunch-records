import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { NewRecord } from "../types/NewRecord";
import { Record } from "../types/Record";

const { stringify, parse } = JSON;

const retrieveFromStorage = (): Record[] => {
  return parse(localStorage.getItem("records")!);
};

const updateStorage = (records: Record[]): void => {
  localStorage.setItem("records", stringify(records));
};

export const useLocalStorage = () => {
  //CREATE
  const addRecord = useCallback((newRecord: NewRecord) => {
    const record = { id: uuidv4(), ...newRecord };
    const records = retrieveFromStorage();

    if (records) {
      updateStorage([...records, record]);
      return;
    }
    const newRecords = Array(record);
    updateStorage(newRecords);
  }, []);

  //READ
  const getRecords = useCallback(() => {
    return retrieveFromStorage();
  }, []);

  const getRecord = useCallback((id: string) => {
    const records = retrieveFromStorage();
    return records.find(record => record.id === id);
  }, []);

  //UPDATE
  const updateRecord = useCallback((id: string, newRecord: NewRecord) => {
    const records = retrieveFromStorage();

    const index = records.findIndex(record => record.id === id);
    records[index] = { id, ...newRecord };

    updateStorage(records);
  }, []);

  const updateFoodDelivered = useCallback((id: string, value: boolean) => {
    const records = retrieveFromStorage();

    const index = records.findIndex(record => record.id === id);
    records[index].foodDelivered = value;

    updateStorage(records);
  }, []);

  // DELETE
  const deleteRecords = useCallback((ids: string[]) => {
    const records = retrieveFromStorage();

    ids.forEach(id => {
      const index = records.findIndex(record => record.id === id);
      records.splice(index, 1);
    });
    updateStorage(records);
  }, []);

  // FILTER
  const filterBy = useCallback((field: string, value: string) => {
    const records = retrieveFromStorage();

    const validField = records.every(record => {
      return Object.keys(record).includes(field);
    });

    if (validField) {
      return records.filter(record => (record as any)[field].includes(value));
    }
    return records;
  }, []);

  const filterByFullName = useCallback((value: string) => {
    const records = retrieveFromStorage();

    return records.filter(record => {
      const fullName = (record.firstName + record.lastName).toLowerCase();
      const term = value.toLowerCase();
      if (fullName.includes(term)) {
        return true;
      }
      return false;
    });
  }, []);

  const filterByEmail = useCallback((value: string) => {
    const records = retrieveFromStorage();

    return records.filter(record => {
      const email = record.email.toLowerCase();
      const term = value.toLowerCase();
      if (email.includes(term)) {
        return true;
      }
      return false;
    });
  }, []);

  const filterByNameAndEmail = useCallback(
    (fullNameExpr: string, emailExpr: string) => {
      const records = retrieveFromStorage();

      // By email
      if (!fullNameExpr.trim()) {
        return filterByEmail(emailExpr);
      }

      //By names
      if (!emailExpr.trim()) {
        return filterByFullName(fullNameExpr);
      }

      //By both
      return records.filter(record => {
        const fullName = (record.firstName + record.lastName).toLowerCase();
        const email = record.email.toLowerCase();
        const fullNameTerm = fullNameExpr.toLowerCase();
        const emailTerm = emailExpr.toLowerCase();

        if (fullName.includes(fullNameTerm) && email.includes(emailTerm)) {
          return true;
        }
        return false;
      });
    },
    [filterByEmail, filterByFullName]
  );

  return {
    addRecord,
    updateRecord,
    getRecord,
    getRecords,
    deleteRecords,
    updateFoodDelivered,
    filterBy,
    filterByFullName,
    filterByEmail,
    filterByNameAndEmail,
  };
};
