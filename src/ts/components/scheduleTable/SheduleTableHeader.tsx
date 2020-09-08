import React from 'react';
import { IData, TableDataColumns } from '../../constants/types-interfaces';
import { Button, Select } from 'antd';
import { ColumnType } from 'antd/es/table';

type TableHeaderProps = {
  hiddenRowsAmnt: number;
  onClick: () => void;
  columns: TableDataColumns,
  finalColumns: TableDataColumns,
  setFinalColumns: (columns: TableDataColumns) => void,
}; 

const SheduleTableHeader: React.FC<TableHeaderProps> = ({ hiddenRowsAmnt, onClick, columns, finalColumns, setFinalColumns }) => {
  const hideButton = hiddenRowsAmnt ? (
    <Button onClick={onClick}>Показать скрытые строки ({hiddenRowsAmnt})</Button>
  ) : (
    <Button disabled={true}>Нет скрытых строк</Button>
  );

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
    console.log(value);
    setFinalColumns(
      columns.filter(({ title }) => value.includes(title as string) || title === 'Name' || title === '')
    );
  };

  return (
    <React.Fragment>
      <div className="shedule-table__header">
        <Select
          className="shedule-table__select"
          mode="multiple"
          allowClear
          placeholder="Select table columns"
          defaultValue={finalColumns.filter(columnsFiltrator).map((col) => (col.title ? col.title.toString() : ''))}
          onChange={handleSelection}
        >
          {selectChildren}
        </Select>
        {hideButton}
      </div>
    </React.Fragment>
  );
};

export default SheduleTableHeader;
