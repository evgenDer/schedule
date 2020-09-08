import React, { useState } from 'react';
import Header from '../header/header';

const App: React.FC = () => {
  const [typeOfUser, setTypeOfUser] = useState('student');
  const [typesOfScheduleForm, setTypeOfScheduleForm] = useState('table');
  const typesOfUsersHandler: (e) => void = (e) => {
    setTypeOfUser(e.target.value);
  }
  const typesOfScheduleFormHandler: (e) => void = (e) => {
    setTypeOfScheduleForm(e.target.value);
  }
  return <React.Fragment>
    <Header selectUserHandler={typesOfUsersHandler} selectScheduleFormHandler={typesOfScheduleFormHandler}/>
  </React.Fragment>;
};

export default App;
