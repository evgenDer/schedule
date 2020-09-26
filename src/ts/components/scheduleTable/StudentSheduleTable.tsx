import React, { useState, useEffect } from 'react';
import { Input, Table } from 'antd';
import { IData, TableDataColumns, ITimeZone } from '../../constants/types-interfaces';
import { Button, Tooltip } from 'antd';
import { CheckOutlined, CloseOutlined, MinusSquareOutlined } from '@ant-design/icons';
import SheduleTableHeader from './tableHeader/SheduleTableHeader';
import Task from '../Task/Task';
import { sortDataByDate } from '../../helpers/dataHelper';

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
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('radio');
  const [selectedRowsKeys, setSelectedRowsKeys] = useState<string[]>([]);
  const [newColumns] = useState(
    columns.map((col) => {
      if (col.key === 'name') {
        return {
          ...col,
          render: (_: any, { key, name, type }: IData) => {
            return <Task id={key} name={name} type={type.name}/>;
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

  const setRowsHidden = () => {
    const newHidden = data.filter(({ key }) => selectedRowsKeys.includes(key));
    if (newHidden.length) {
      setHiddenData((prev) => [...prev, ...newHidden]);
    }
    setData((prev: IData[]) => prev.filter(({ key }) => !selectedRowsKeys.includes(key)));
    setSelectedRowsKeys([]);
  };

  const showHiddenRows = () => {
    setData((prev: IData[]) => [...prev, ...hiddenData].sort(sortDataByDate));
    setHiddenData([]);
  };

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

  const selectRow = (rowData: IData) => {
    const rowKey = data.find((element) => element.key === rowData.key)?.key;
    if (rowKey) {
      const clickElement = document.querySelector(
        `tr[data-row-key="${rowKey}"] input.ant-${selectionType}-input`
      ) as HTMLElement;
      clickElement.click();

      setSelectedRowsKeys((prev) => {
        const rowKeyIndex = prev.indexOf(rowKey);
        if (selectionType === 'checkbox') {
          if (rowKeyIndex === -1) {
            prev.push(rowKey);
          } else {
            prev.splice(rowKeyIndex, 1);
          }
        } else {
          prev = [rowKey];
        }
        return prev;
      });
    }
  };

  return (
    <React.Fragment>
      <Table<IData>
        dataSource={data}
        columns={finalColumns}
        scroll={scroll}
        sticky
        onRow={(data) => ({
          onClick: selectRow.bind(null, data),
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
            onHideRowsButtonClick={setRowsHidden}
            selectedRowsAmnt={selectedRowsKeys.length}
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
