import { List, Space} from 'antd';
import React from 'react';
import services from '../../services/services';
import { RsSchoolEvent } from '../../constants/types-interfaces';

const scheduleList: React.FC = (events: RsSchoolEvent[]) => {
    return (
        <List
            dataSource={events}
            renderItem={item => (
                <List.Item key={item.id}>
                    title={<a href={item.descriptionUrl}>{item.name}</a>}
                    
                </List.Item>
            )}
        >
        </List>
    )
}

export default scheduleList;
