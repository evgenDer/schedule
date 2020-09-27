import { List } from 'antd';
import React from 'react';
import { RsSchoolEvent } from '../../constants/types-interfaces';
import ListItemTable from '../listItemTable/listItemTable';

type ScheduleListProps = {
  events: RsSchoolEvent[];
};

const ScheduleList: React.FC<ScheduleListProps> = ({ events }) => {
  return (
    <List
      dataSource={events}
      size="large"
      renderItem={(item: RsSchoolEvent) => {
        return (
          <List.Item key={item.id} style={{ backgroundColor: item.tableData.type.fontColor }}>
            {item.tableData.name}
            <ListItemTable event={item} />
          </List.Item>
        );
      }}
    ></List>
  );
};

export default ScheduleList;
