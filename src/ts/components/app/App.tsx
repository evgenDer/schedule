import React, { useState, useEffect } from 'react';
import services from '../../services/services';
import { RsSchoolEvent, ITaskType } from '../../constants/types-interfaces';
import ScheduleList from '../schedule-list/shedule-list'; 

const App: React.FC<any> = () => {
  const [data, updateData] = useState();
  useEffect(() => {
    const getData = async () => {
      const events = await services.getAllEvents();
      updateData(events);
    }
    getData();
  })
  if(data) {
    return <React.Fragment>
    <ScheduleList events={data} />
  </React.Fragment>;
  }
  return null
};

export default App;
