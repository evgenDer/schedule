import React from 'react';
import { Descriptions } from 'antd';
import { RsSchoolEvent, PropsOfListItem } from '../../constants/types-interfaces';

const ListItemTable: React.FC<PropsOfListItem> = (props) => {
    return (
        <Descriptions bordered>
            <Descriptions.Item label="Type">{ props.event.tableData.type.name }</Descriptions.Item>
            <Descriptions.Item label="Description">{props.event.taskData.description}</Descriptions.Item>
            <Descriptions.Item label="Place">{props.event.tableData.place}</Descriptions.Item>
            <Descriptions.Item label="Date">{props.event.tableData.date}</Descriptions.Item>
            <Descriptions.Item label="Time">{props.event.tableData.time}</Descriptions.Item>
            <Descriptions.Item label="Mark">{props.event.tableData.mark}/{props.event.tableData.maxMark}</Descriptions.Item>
            <Descriptions.Item label="Organizer">{props.event.tableData.organizer}</Descriptions.Item>        
        </Descriptions>
    )
}

export default ListItemTable;
