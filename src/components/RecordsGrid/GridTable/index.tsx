import { FC } from "react";
import styled from "styled-components";

import { Record } from "../../../types/Record";
import { RecordItem } from "./RecordItem";

interface GridTableProps {
  recordsList: Record[];
  onSelectRecord: (id: string) => void;
  onUpdateRecordFood: (id: string, foodDelivered: boolean) => void;
}

export const GridTable: FC<GridTableProps> = ({
  recordsList,
  onSelectRecord,
  onUpdateRecordFood,
}) => {
  return (
    <RecordsTable>
      <thead>
        <tr>
          <th></th>
          <th>No.</th>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Age</th>
          <th>Address</th>
          <th>Food Delivered</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {recordsList.map((item, i) => (
          <RecordItem
            key={item.id}
            record={item}
            index={i}
            onSelect={onSelectRecord}
            onUpdateFood={onUpdateRecordFood}
          />
        ))}
      </tbody>
    </RecordsTable>
  );
};

const RecordsTable = styled.table`
  width: 100%;
  background-color: #fff;
  font-size: 14px;

  & th,
  & td {
    padding: 0.75rem;
    border: 1px solid #d0d0d0;
    vertical-align: baseline;
  }

  & tr:hover {
    background-color: rgba(208, 208, 208, 0.5);
  }
`;
