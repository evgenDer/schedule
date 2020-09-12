import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { IData, TableDataColumns, ITimeZone } from '../../constants/types-interfaces';
import SheduleTableHeader from './tableHeader/SheduleTableHeader';

type OrganizerSheduleTableProps = {
  data: IData[];
  setData: (data: any) => void;
  columns: TableDataColumns;
  finalColumns: TableDataColumns;
  setFinalColumns: (finalColumns: TableDataColumns) => void;
  scroll: { x: number };
  timezone: ITimeZone;
  setTimezone: (timezone: ITimeZone) => void;
};

const OrganizerSheduleTable: React.FC<OrganizerSheduleTableProps> = ({
  data,
  setData,
  columns,
  finalColumns,
  setFinalColumns,
  scroll,
  timezone,
  setTimezone,
}) => {
  const [newColumns] = useState(columns);

  useEffect(() => {
    setFinalColumns(newColumns);
  }, []);

  return (
    <React.Fragment>
      <Table<IData>
        dataSource={data}
        columns={finalColumns}
        scroll={scroll}
        sticky
        title={() => (
          <SheduleTableHeader
            userType={true}
            onEditButtonClick={() => console.log('tmp')}
            columns={newColumns}
            finalColumns={finalColumns}
            setFinalColumns={setFinalColumns}
            timezone={timezone}
            setTimezone={setTimezone}
          />
        )}
      />
    </React.Fragment>
  );
};

export default OrganizerSheduleTable;
