import React from 'react';
import { Descriptions } from 'antd';
import { RsSchoolEvent, PropsOfListItem } from '../../constants/types-interfaces';

const ListItemTable: React.FC<PropsOfListItem> = (props) => {
    return (
        <Descriptions bordered style={{color: JSON.stringify(props.event.tableData.type.fontColor)}}>
            <Descriptions.Item label="Type" style={{color: JSON.stringify(props.event.tableData.type.fontColor)}}>{ props.event.tableData.type.name }</Descriptions.Item>
            <Descriptions.Item label="Description">{props.event.taskData.description}</Descriptions.Item>
            <Descriptions.Item label="Place">{props.event.tableData.place}</Descriptions.Item>
            <Descriptions.Item label="Date and time">{props.event.tableData.date} {props.event.tableData.time}</Descriptions.Item>
            <Descriptions.Item label="Mark">{props.event.tableData.mark}/{props.event.tableData.maxMark}</Descriptions.Item>
            <Descriptions.Item label="Organizer">{props.event.tableData.organizer}</Descriptions.Item>
            <Descriptions.Item label="isCompleted">{props.event.tableData.isComplited ? "Yes" : "No"}</Descriptions.Item>
            <Descriptions.Item label="comment">{props.event.tableData.comment}</Descriptions.Item>
            {props.event.tableData.broadcastUrl ? <Descriptions.Item label="broadcastUrl">{props.event.tableData.broadcastUrl}</Descriptions.Item> : null}        
        </Descriptions>
    )
}

export default ListItemTable;
