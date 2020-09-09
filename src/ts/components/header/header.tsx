import React from 'react';
import { Layout } from 'antd';
import SelectComponent from '../SelectComponent/SelectComponent';
import typesOfScheduleForm from './typesOfScheduleForm';
import typesOfUsers from './typesOfUsers';
import Title from '../Title/title';

const Header: React.FunctionComponent<{
  selectUserHandler: (value: string) => void;
  selectScheduleFormHandler: (value: string) => void;
}> = ({ selectUserHandler, selectScheduleFormHandler }) => {
  return (
    <Layout.Header className="header">
      <Title />
      <div>
        <SelectComponent values={typesOfUsers} handler={selectUserHandler} />
        <SelectComponent values={typesOfScheduleForm} handler={selectScheduleFormHandler} />
      </div>
    </Layout.Header>
  );
};

export default Header;
