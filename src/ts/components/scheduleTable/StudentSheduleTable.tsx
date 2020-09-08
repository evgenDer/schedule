import React, { useState } from 'react';
import { Table } from 'antd';
import { IData, TableDataColumns } from '../../constants/types-interfaces';
import { Button, Tooltip } from 'antd';
import { CheckOutlined, CloseOutlined, MinusSquareOutlined } from '@ant-design/icons';
// import VirtualTable from './VirtualTable';

type StudentSheduleTableProps = {
  dataSource: IData[];
  columns: TableDataColumns;
};

const StudentSheduleTable: React.FC<StudentSheduleTableProps> = ({ dataSource, columns }) => {
  const [data, setData] = useState(dataSource);
  const [hiddenData, setHiddenData] = useState<IData[]>([]);

  const setTaskDone = (idx: number) => {
    const newData = [...data];
    const index = newData.findIndex(({ key }) => key === idx);
    newData[index].isComplited = !newData[index].isComplited;
    setData(newData);
  };

  const setRowHidden = (idx: number) => {
    const newHidden = data.find(({ key }) => key === idx);
    if (newHidden) {
      setHiddenData([...hiddenData, newHidden]);
    }
    const newData = [...data].filter(({ key }) => key !== idx);
    setData(newData);
  };

  const showHiddenRows = () => {
    const newData = [...data, ...hiddenData].sort((a: IData, b: IData) => a.key - b.key);
    setData(newData);
    setHiddenData([]);
  };

  const newColumns = columns.map((col) => {
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
  });

  type TableHeaderProps = {
    hiddenRowsAmnt: number;
    onClick: () => void;
  };

  const TableHeader: React.FC<TableHeaderProps> = ({ hiddenRowsAmnt, onClick }) => {
    const hideButton = hiddenRowsAmnt ? (
      <Button onClick={onClick}>Показать скрытые строки ({hiddenRowsAmnt})</Button>
    ) : (
      <Button disabled={true}>Нет скрытых строк</Button>
    );

    return <React.Fragment>{hideButton}</React.Fragment>;
  };

  return (
    <React.Fragment>
      {/* <VirtualTable dataSource={dataSource} columns={columns} scroll={{ x: 1600, y: 300 }} /> */}
      <Table<IData>
        dataSource={data}
        columns={newColumns}
        scroll={{ x: 1600 }}
        sticky
        title={() => <TableHeader hiddenRowsAmnt={hiddenData.length} onClick={showHiddenRows} />}
      />
    </React.Fragment>
  );
};

export default StudentSheduleTable;
