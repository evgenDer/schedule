import React, { useState, useEffect } from 'react';
import services from '../../services/services';
import { RsSchoolEvent, ITaskType } from '../../constants/types-interfaces';
import ScheduleList from '../schedule-list/shedule-list'; 

const App: React.FC<any> = () => {
  const [data, updateData] = useState();
  useEffect(() => {
    const getData = async () => {
      let events = await services.getAllEvents();
      events.sort((a: any, b: any) => {
        if (a.tableData.date - b.tableData.date) {
          return a.tableData.time - b.tableData.time;
        }
        return a.tableData.date - b.tableData.date;
      })
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
