import React from 'react';
import { Descriptions, Tag } from 'antd';
import { IData } from '../../constants/types-interfaces';

interface PropsOfListItem {
  event: IData;
}

const ListItemTable: React.FC<PropsOfListItem> = ({ event }) => {
  const { type } = event;
  return (
    <Descriptions bordered style={{ backgroundColor: 'white' }}>
      <Descriptions.Item label="Type:">
        <Tag color={type.color} style={{ color: type.fontColor }}>
          {type.name}
        </Tag>
      </Descriptions.Item>
      <Descriptions.Item label="Place:">{event.place}</Descriptions.Item>
      <Descriptions.Item label="Date and time:">
        {event.date} {event.time}
      </Descriptions.Item>
      <Descriptions.Item label="Max Mark:">{event.maxMark}</Descriptions.Item>
      <Descriptions.Item label="Coefficient:">{'0.2'}</Descriptions.Item>
      <Descriptions.Item label="Organizer:">{event.organizer}</Descriptions.Item>
      <Descriptions.Item label="Completed:">{event.isComplited ? 'Yes' : 'No'}</Descriptions.Item>
      <Descriptions.Item label="Comment:">{event.comment}</Descriptions.Item>
      {event.broadcastUrl ? <Descriptions.Item label="Broadcast URL:">{event.broadcastUrl}</Descriptions.Item> : null}
    </Descriptions>
  );
};

export default ListItemTable;
