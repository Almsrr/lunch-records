import { FC } from "react";

import Table from "react-bootstrap/Table";
import { Record } from "../../../types/Record";
import { RecordItem } from "./RecordItem";

interface GridTableProps {
  recordsList: Record[];
  onSelectRecord: (id: string) => void;
  onUpdateRecord: () => void;
}

export const GridTable: FC<GridTableProps> = ({
  recordsList,
  onSelectRecord,
  onUpdateRecord,
}) => {
  return (
    <Table bordered>
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
            onUpdate={onUpdateRecord}
          />
        ))}
      </tbody>
    </Table>
  );
};
