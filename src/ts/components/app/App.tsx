import React from 'react';
import ScheduleTable from '../scheduleTable/ScheduleTable';

const dataSource = [
  {
    key: '1',
    date: '2020-09-02',
    time: '20:44',
    name: 'Task 1',
    mark: 200,
    maxMark: 200,
    place: '',
    broadcastUrl: '',
    organizer: '',
    isComplited: 1,
  },
  {
    key: '2',
    date: '2020-09-02',
    time: '20:44',
    name: 'Task 2',
    mark: 250,
    maxMark: 300,
    place: '',
    broadcastUrl: '',
    organizer: '',
    isComplited: 0,
  },
];

const App: React.FC = () => {
  return (
    <React.Fragment>
      <ScheduleTable dataSource={dataSource} userType={true} />
    </React.Fragment>
  );
};

export default App;
