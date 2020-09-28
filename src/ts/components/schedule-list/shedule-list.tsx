import { List } from 'antd';
import React from 'react';
import { IData } from '../../constants/types-interfaces';
import { findTask } from '../../helpers/dataHelper';
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
        const { typeId } = item;
        const taskType = findTask(typeId);

        return (
          <List.Item key={item.key} style={{ backgroundColor: taskType.color }}>
            <div className="schedule-list-item">
              <Task id={item.key} name={item.name} type={taskType.name} deadline={item.date} />
              <ListItemTable event={item} />
            </div>
          </List.Item>
        );
      }}
    ></List>
  );
};

export default ScheduleList;
