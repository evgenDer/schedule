import { List } from 'antd';
import React from 'react';
import { IData } from '../../constants/types-interfaces';
import ListItemTable from '../listItemTable/listItemTable';
import Task from '../Task/Task';

type ScheduleListProps = {
  events: IData[];
};

const ScheduleList: React.FC<ScheduleListProps> = ({ events }) => {
  return (
    <List
      dataSource={events}
      size="large"
      renderItem={(item: IData) => {
        return (
          <List.Item key={item.key} style={{ backgroundColor: item.type.color }}>
            <div className="schedule-list-item">
              <Task id={item.key} name={item.name} type={item.type.name} deadline={item.date} />
              <ListItemTable event={item} />
            </div>
          </List.Item>
        );
      }}
    ></List>
  );
};

export default ScheduleList;
