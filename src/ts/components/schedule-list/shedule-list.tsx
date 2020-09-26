import { List, Space} from 'antd';
import React from 'react';
import { RsSchoolEvent } from '../../constants/types-interfaces';
import ListItemTable from '../listItemTable/listItemTable';

const ScheduleList: React.FC<any> = (events) => {
    return (
        <List
            dataSource={events.events}
            renderItem={(item: RsSchoolEvent) => {
                return(
                <List.Item key={item.id}>
                    {item.tableData.name}
                    <ListItemTable event={item} />
                </List.Item>
            )}}
        >
        </List>
    )
}

export default ScheduleList;
