import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { IData, TableDataColumns, ITimeZone } from '../../constants/types-interfaces';
import SheduleTableHeader from './tableHeader/SheduleTableHeader';
import EditableTable from './EditableTable';
import Task from '../Task/Task';
import * as Storage from '../../helpers/storage';

type OrganizerSheduleTableProps = {
  data: IData[];
  setData: (data: any) => void;
  columns: TableDataColumns;
  finalColumns: TableDataColumns;
  setFinalColumns: (finalColumns: TableDataColumns) => void;
  scroll: { x: number };
  timezone: ITimeZone;
  updateTableData: (newTableDta: IData[]) => void;
};

const OrganizerSheduleTable: React.FC<OrganizerSheduleTableProps> = ({
  data,
  setData,
  columns,
  finalColumns,
  setFinalColumns,
  scroll,
  timezone,
  updateTableData,
}) => {
  const [editableData, setEditableData] = useState(data);
  const [newColumns] = useState(
    columns.map((col) => {
      if (col.key === 'name') {
        return {
          ...col,
          render: (_: any, { key, name, type, date }: IData) => {
            return <Task id={key} name={name} isMentor={true} deadline={date} type={type.name} />;
          },
        };
      }
      return col;
    })
  );
  const [isTableEditable, setIsTableEditable] = useState(false);

  useEffect(() => {
    const filteredColumns = Storage.getSelectedColumns();
    setFinalColumns(newColumns.filter((col) => filteredColumns.includes(col.key?.toString() || '')));
  }, []);

  const tableHeader = (
    <SheduleTableHeader
      userType={true}
      onEditButtonClick={() => setIsTableEditable(true)}
      onSaveButtonClick={() => {
        setData(editableData);
        setIsTableEditable(false);
        updateTableData(editableData);
      }}
      columns={newColumns}
      finalColumns={finalColumns}
      setFinalColumns={setFinalColumns}
      isEditing={isTableEditable}
    />
  );

  const props = {
    columns: finalColumns,
    scroll,
    sticky: true,
    title: () => tableHeader,
  };

  return (
    <React.Fragment>
      {isTableEditable ? (
        <EditableTable {...props} data={editableData} setData={setEditableData} timezone={timezone} />
      ) : (
        <Table<IData> {...props} dataSource={data} />
      )}
    </React.Fragment>
  );
};

export default OrganizerSheduleTable;
