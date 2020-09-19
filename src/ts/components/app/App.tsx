import React, { useState } from 'react';
import Header from '../header/header';
import { SheduleType } from '../SelectTypeShedule/SheduleType';
import SelectTypeShedule from '../SelectTypeShedule/SelectTypeShedule';
import SaveFile from '../SaveFile/SaveFile';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  const [typeOfUser, setTypeOfUser] = useState('student');
  const [typeOfScheduleForm, setTypeOfScheduleForm] = useState(SheduleType.Table);
  const typesOfUsersHandler: (value: string) => void = function (value) {
    setTypeOfUser(value);
  };
  return (
    <React.Fragment>
      <Header selectUserHandler={typesOfUsersHandler} />
      <div className="controls">
        <SelectTypeShedule type={typeOfScheduleForm} setType={setTypeOfScheduleForm} />
        <SaveFile />
        <Button>
          <EditOutlined /> Edit types
        </Button>
      </div>
    </React.Fragment>
  );
};

export default App;
