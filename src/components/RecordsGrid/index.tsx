import { FC, useState } from "react";
import styled from "styled-components";
import { AgGridReact } from "ag-grid-react";
import {
  GridOptions,
  ColDef,
  RowSelectedEvent,
  GridReadyEvent,
  GridApi,
} from "ag-grid-community";

import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { GridHeader } from "./GridHeader";
import { Record } from "../../types/Record";

export const RecordsGrid: FC = () => {
  const [rowsData, setRowsData] = useState<Record[]>([]);
  const [selectedRecords, setSelectedRecords] = useState<Record[]>([]);
  const [gridApi, setGridApi] = useState<GridApi>();
  const [colDef] = useState<ColDef[]>([
    { checkboxSelection: true },
    { field: "id", headerName: "ID", hide: true },
    { field: "firstName", headerName: "First Name" },
    { field: "lastName", headerName: "Last Name" },
    { field: "phoneNumber", headerName: "Phone Number" },
    { field: "email", headerName: "Email" },
    { field: "age", headerName: "Age" },
    { field: "address", headerName: "Address" },
    {
      field: "foodDelivered",
      headerName: "Food Delivered",
      valueGetter: param => {
        if (param.getValue("foodDelivered")) {
          return "Yes";
        }
        return "No";
      },
    },
    { field: "comment", headerName: "Comment" },
  ]);
  const gridOptions: GridOptions = {
    rowSelection: "multiple",
  };

  const updateSelectedRecords = (event: RowSelectedEvent) => {
    const selectedRecord = event.node.data;
    const exists = selectedRecords.some(
      record => record.id === selectedRecord.id
    );

    if (!exists) {
      setSelectedRecords(records => [...records, selectedRecord]);
      return;
    }
    setSelectedRecords(records =>
      records.filter(record => record.id !== selectedRecord.id)
    );
  };

  const gridReadyHandler = (event: GridReadyEvent) => {
    setGridApi(event.api);
    setRowsData([
      {
        id: "0",
        firstName: "Alam",
        lastName: "Sierra",
        phoneNumber: "1112223333",
        email: "alam@domain.com",
        age: 34,
        address: "Sabana Perdida",
        foodDelivered: false,
        comment: "some comment",
      },
      {
        id: "1",
        firstName: "Alam",
        lastName: "Sierra",
        phoneNumber: "1112223333",
        email: "alam@domain.com",
        age: 34,
        address: "Sabana Perdida",
        foodDelivered: false,
        comment: "some comment",
      },
      {
        id: "3",
        firstName: "Alam",
        lastName: "Sierra",
        phoneNumber: "1112223333",
        email: "alam@domain.com",
        age: 34,
        address: "Sabana Perdida",
        foodDelivered: false,
        comment: "some comment",
      },
    ]);
  };

  const deleteRecords = () => {
    gridApi!.applyTransaction({ remove: selectedRecords });
  };

  return (
    <Container>
      <GridHeader selectedRecords={selectedRecords} onDelete={deleteRecords} />
      <GridBody className="ag-theme-alpine">
        <AgGridReact
          gridOptions={gridOptions}
          rowData={rowsData}
          columnDefs={colDef}
          onRowSelected={updateSelectedRecords}
          onGridReady={gridReadyHandler}
        />
      </GridBody>
    </Container>
  );
};

const Container = styled.div`
  width: 85%;
  overflow-x: scroll;
`;

const GridBody = styled.div`
  width: 100%;
  height: 500px;
`;
