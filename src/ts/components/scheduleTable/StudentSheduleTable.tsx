import React, { useState, useEffect } from 'react';
import { Input, Table } from 'antd';
import { IData, TableDataColumns, ITimeZone } from '../../constants/types-interfaces';
import { Button, Tooltip } from 'antd';
import { CheckOutlined, CloseOutlined, MinusSquareOutlined } from '@ant-design/icons';
import SheduleTableHeader from './tableHeader/SheduleTableHeader';
import Task from '../Task/Task';
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
      if (col.key === 'name') {
        return {
          ...col,
          render: (_: any, { key, name }: IData) => {
            return <Task id={key} name={name} />;
          },
        };
      }
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

  const setTaskDone = (idx: string) => {
    setData((prev: IData[]) => {
      const newData = [...prev];
      const index = newData.findIndex(({ key }) => key === idx);
      newData[index].isComplited = !newData[index].isComplited;
      return newData;
    });
  };

  const setRowHidden = (idx: string) => {
    const newHidden = data.find(({ key }) => key === idx);
    if (newHidden) {
      setHiddenData((prev) => [...prev, newHidden]);
    }
    setData((prev: IData[]) => prev.filter(({ key }) => key !== idx));
  };

  const showHiddenRows = () => {
    setData((prev: IData[]) => [...prev, ...hiddenData]); // .sort((a: IData, b: IData) => a.key - b.key));
    setHiddenData([]);
  };

  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('radio');

  const shiftDownEvent = ({ key }: KeyboardEvent) => {
    if (key === 'Shift') {
      setSelectionType('checkbox');
    }
  };

  const shiftUpEvent = ({ key }: KeyboardEvent) => {
    if (key === 'Shift') {
      setSelectionType('radio');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', shiftDownEvent);
    document.addEventListener('keyup', shiftUpEvent);
    return () => {
      document.removeEventListener('keydown', shiftDownEvent);
      document.removeEventListener('keyup', shiftUpEvent);
    };
  }, []);

  const selectRow = (rowIndex: number | undefined) => {
    if (rowIndex !== undefined) {
      const clickElement = document.querySelector(
        `tr[data-row-key="${rowIndex}"] input.ant-${selectionType}-input`
      ) as HTMLElement;
      clickElement.click();
    }
  };

  return (
    <React.Fragment>
      {/* <VirtualTable dataSource={dataSource} columns={columns} scroll={{ x: 1600, y: 300 }} /> */}
      <Table<IData>
        dataSource={data}
        columns={finalColumns}
        scroll={scroll}
        sticky
        onRow={(data, rowIndex) => ({
          // onClick: (event) => {
          //   selectRow(rowIndex);
          // },
          // onClick: selectRow.bind(null, rowIndex),
        })}
        rowSelection={{
          type: selectionType,
          preserveSelectedRowKeys: true,
          hideSelectAll: true,
          columnWidth: 0,
        }}
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
