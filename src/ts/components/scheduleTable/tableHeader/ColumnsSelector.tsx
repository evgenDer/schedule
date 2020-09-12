import React from 'react';
import { IData, TableDataColumns } from '../../../constants/types-interfaces';
import { Select } from 'antd';
import { ColumnType } from 'antd/es/table';

type ColumnsSelectorProps = {
  columns: TableDataColumns;
  finalColumns: TableDataColumns;
  setFinalColumns: (columns: TableDataColumns) => void;
};

const ColumnsSelector: React.FC<ColumnsSelectorProps> = ({ columns, finalColumns, setFinalColumns }) => {
  const columnsFiltrator = (col: ColumnType<IData>) => col.title !== '' && col.title !== 'Name';

  const selectChildren = columns.filter(columnsFiltrator).map((col) =>
    col.title ? (
      <Select.Option key={col.title.toString()} value={col.title.toString()}>
        {col.title}
      </Select.Option>
    ) : (
      ''
    )
  );

  const handleSelection = (value: string[]) => {
    setFinalColumns(columns.filter(({ title }) => value.includes(title as string) || title === 'Name' || title === ''));
  };

  return (
    <React.Fragment>
      <Select
        className="shedule-table__columns-selector"
        mode="multiple"
        allowClear
        placeholder="Select table columns"
        defaultValue={finalColumns.filter(columnsFiltrator).map((col) => (col.title ? col.title.toString() : ''))}
        onChange={handleSelection}
      >
        {selectChildren}
      </Select>
    </React.Fragment>
  );
};

export default ColumnsSelector;
