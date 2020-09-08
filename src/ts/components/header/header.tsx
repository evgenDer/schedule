import React from 'react';
import { PageHeader } from 'antd';
import SelectComponent from '../SelectComponent/SelectComponent';
import typesOfScheduleForm from './typesOfScheduleForm';
import typesOfUsers from './typesOfUsers'

const title: string = 'Schedule';

const Header: React.FunctionComponent<{ selectUserHandler: (e) => void, selectScheduleFormHandler: (e) => void }> = ({ selectUserHandler, selectScheduleFormHandler }) => {
    return (
        <PageHeader title={title}>
            <SelectComponent values={typesOfUsers} handler={selectUserHandler} />
            <SelectComponent values={typesOfScheduleForm} handler={selectScheduleFormHandler} />
        </PageHeader>
    )
}

export default Header;
