import React, { useState, useEffect } from 'react';
import { notification, Table } from 'antd';
import { IData, TableDataColumns, ITimeZone } from '../../constants/types-interfaces';
import SheduleTableHeader from './tableHeader/SheduleTableHeader';
import EditableTable from './EditableTable';

type OrganizerSheduleTableProps = {
  data: IData[];
  setData: (data: any) => void;
  columns: TableDataColumns;
  finalColumns: TableDataColumns;
  setFinalColumns: (finalColumns: TableDataColumns) => void;
  scroll: { x: number };
  timezone: ITimeZone;
};

const OrganizerSheduleTable: React.FC<OrganizerSheduleTableProps> = ({
  data,
  setData,
  columns,
  finalColumns,
  setFinalColumns,
  scroll,
  timezone,
}) => {
  const [editableData, setEditableData] = useState(data);
  const [newColumns] = useState(columns);
  const [isTableEditable, setIsTableEditable] = useState(false);

  useEffect(() => {
    setFinalColumns(newColumns);
  }, []);

  const tableHeader = (
    <SheduleTableHeader
      userType={true}
      onEditButtonClick={() => setIsTableEditable(true)}
      onSaveButtonClick={() => {
        setData(editableData);
        setIsTableEditable(false);
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
