import React, { useState } from 'react';
import Header from '../header/header';

const App: React.FC = () => {
  const [typeOfUser, setTypeOfUser] = useState('student');
  const [typeOfScheduleForm, setTypeOfScheduleForm] = useState('table');
  const typesOfUsersHandler: (value: string) => void = function (value) {
    setTypeOfUser(value);
  };
  const typesOfScheduleFormHandler: (value: string) => void = (value) => {
    setTypeOfScheduleForm(value);
  };
  return (
    <React.Fragment>
      <Header selectUserHandler={typesOfUsersHandler} selectScheduleFormHandler={typesOfScheduleFormHandler} />
    </React.Fragment>
  );
};

export default App;
