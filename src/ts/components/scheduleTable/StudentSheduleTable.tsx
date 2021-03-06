import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { IData, TableDataColumns, ITimeZone, ITaskType } from '../../constants/types-interfaces';
import { Button, Tooltip } from 'antd';
import { CheckOutlined, CloseOutlined, MinusSquareOutlined } from '@ant-design/icons';
import SheduleTableHeader from './tableHeader/SheduleTableHeader';
import Task from '../Task/Task';
import { findTask, sortDataByDate } from '../../helpers/dataHelper';
import * as Storage from '../../helpers/storage';

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
          render: (_: any, { key, name, typeId, date }: IData) => (
            <Task id={key} name={name} type={findTask(typeId).name} deadline={date} />
          ),
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
    const filteredColumns = Storage.getSelectedColumns();
    setFinalColumns(newColumns.filter((col) => filteredColumns.includes(col.key?.toString() || '')));
  }, []);

  const setTaskDone = (idx: string) => {
    setData((prev: IData[]) => {
      const newData = [...prev];
      const index = newData.findIndex(({ key }) => key === idx);
      newData[index].isComplited = !newData[index].isComplited;
      Storage.setTaskDone(newData[index].key);
      return newData;
    });
  };

  const setRowsHidden = () => {
    const newHidden = data.filter(({ key }) => selectedRowsKeys.includes(key));
    if (newHidden.length) {
      setHiddenData((prev) => {
        const newHiddenData = [...prev, ...newHidden];
        Storage.setHiddenRows(newHiddenData.map((element) => element.key));
        return newHiddenData;
      });
    }
    setData((prev: IData[]) => prev.filter(({ key }) => !selectedRowsKeys.includes(key)));
    setSelectedRowsKeys([]);
  };

  const showHiddenRows = () => {
    setData((prev: IData[]) => [...prev, ...hiddenData].sort(sortDataByDate));
    setHiddenData([]);
    Storage.setHiddenRows([]);
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

  useEffect(() => {
    setHiddenData((prev) => {
      if (data.length) {
        const hiddenDataKeys = Storage.getHiddenRows();
        const dataToHide = data.filter((element) => hiddenDataKeys.includes(element.key));
        setData((prev: IData[]) => prev.filter(({ key }) => !hiddenDataKeys.includes(key)));
        return dataToHide;
      }
      return prev;
    });

    setData((prev) => {
      if (data.length) {
        const tasksDone = Storage.getTasksDone();
        prev.forEach((element) => {
          if (tasksDone.includes(element.key)) {
            element.isComplited = true;
          }
        });
      }
      return prev;
    });
  }, [data.length !== 0]);

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
