import React from 'react';
import { Layout } from 'antd';
import SelectComponent from '../SelectComponent/SelectComponent';
import typesOfUsers from './typesOfUsers';

const Header: React.FunctionComponent<{
  selectUserHandler: (value: string) => void;
}> = ({ selectUserHandler }) => {
  return (
    <Layout.Header className="header">
      <div className="header__logo">
        <img src="https://app.rs.school/static/images/logo-rsschool3.png" alt="rs school logo" />
      </div>
      <h2 className="header__title">Shedule</h2>
      <SelectComponent values={typesOfUsers} handler={selectUserHandler} />
    </Layout.Header>
  );
};

export default React.memo(Header);
