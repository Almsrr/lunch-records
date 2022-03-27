import { FC } from "react";
import styled from "styled-components";

import { Record } from "../../../../types/Record";
import { Checkbox } from "../../../Checkbox";

interface RecordItemProps {
  record: Record;
  index: number;
  onSelect: (id: string) => void;
  onUpdate: () => void;
}

export const RecordItem: FC<RecordItemProps> = ({
  index,
  record,
  onSelect,
  onUpdate,
}) => {
  return (
    <tr>
      <td>
        <SelectionCheckbox
          type="checkbox"
          onChange={onSelect.bind(null, record.id)}
          size={18}
        />
      </td>
      <td>{++index}</td>
      <td>{`${record.firstName} ${record.lastName}`}</td>
      <td>{record.phoneNumber}</td>
      <td>{record.email}</td>
      <td>{record.age}</td>
      <td>{record.address}</td>
      <td>
        <Checkbox
          id="selection"
          value={record.foodDelivered}
          onChange={onUpdate}
          size={18}
        />
      </td>
      <td>{record.comment}</td>
    </tr>
  );
};

const SelectionCheckbox = styled.input<{ size?: number }>`
  width: ${props => props.size || 16}px;
  height: ${props => props.size || 16}px;
`;
