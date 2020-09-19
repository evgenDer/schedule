import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { IData, TableDataColumns, ITimeZone } from '../../constants/types-interfaces';
import { Button, Tooltip } from 'antd';
import { CheckOutlined, CloseOutlined, MinusSquareOutlined } from '@ant-design/icons';
import SheduleTableHeader from './tableHeader/SheduleTableHeader';
// import VirtualTable from './VirtualTable';

type StudentSheduleTableProps = {
  data: IData[];
  setData: (data: any) => void;
  columns: TableDataColumns;
  finalColumns: TableDataColumns;
  setFinalColumns: (finalColumns: TableDataColumns) => void;
  scroll: { x: number };
};

const StudentSheduleTable: React.FC<StudentSheduleTableProps> = ({
  data,
  setData,
  columns,
  finalColumns,
  setFinalColumns,
  scroll,
}) => {
  const [hiddenData, setHiddenData] = useState<IData[]>([]);
  const [newColumns] = useState(
    columns.map((col) => {
      if (col.key === 'taskDone') {
        return {
          ...col,
          render: (_: any, { isComplited, key }: IData) => {
            const toolTipText = `Mark as ${isComplited ? 'in' : ''}complited!`;
            const icon = isComplited ? <CloseOutlined /> : <CheckOutlined />;
            return (
              <Tooltip placement="topRight" title={toolTipText}>
                <Button type="ghost" onClick={setTaskDone.bind(null, key)}>
                  {icon}
                </Button>
              </Tooltip>
            );
          },
        };
      }
      if (col.key === 'hideRow') {
        return {
          ...col,
          render: (_: any, { key }: IData) => (
            <Tooltip placement="topRight" title="Hide this row!">
              <Button type="ghost" onClick={setRowHidden.bind(null, key)}>
                <MinusSquareOutlined />
              </Button>
            </Tooltip>
          ),
        };
      }
      return col;
    })
  );

  useEffect(() => {
    setFinalColumns(newColumns);
  }, []);

  const setTaskDone = (idx: number) => {
    setData((prev: IData[]) => {
      const newData = [...prev];
      const index = newData.findIndex(({ key }) => key === idx);
      newData[index].isComplited = !newData[index].isComplited;
      return newData;
    });
  };

  const setRowHidden = (idx: number) => {
    const newHidden = data.find(({ key }) => key === idx);
    if (newHidden) {
      setHiddenData((prev) => [...prev, newHidden]);
    }
    setData((prev: IData[]) => prev.filter(({ key }) => key !== idx));
  };

  const showHiddenRows = () => {
    setData((prev: IData[]) => [...prev, ...hiddenData].sort((a: IData, b: IData) => a.key - b.key));
    setHiddenData([]);
  };

  return (
    <React.Fragment>
      {/* <VirtualTable dataSource={dataSource} columns={columns} scroll={{ x: 1600, y: 300 }} /> */}
      <Table<IData>
        dataSource={data}
        columns={finalColumns}
        scroll={scroll}
        sticky
        title={() => (
          <SheduleTableHeader
            hiddenRowsAmnt={hiddenData.length}
            onShowHiddenButtonClick={showHiddenRows}
            columns={newColumns}
            finalColumns={finalColumns}
            setFinalColumns={setFinalColumns}
          />
        )}
      />
    </React.Fragment>
  );
};

export default StudentSheduleTable;
