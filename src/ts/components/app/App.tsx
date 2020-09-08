import React from 'react';
import ScheduleTable from '../scheduleTable/ScheduleTable';
import { IData } from '../../constants/types-interfaces';
import { TASK_TYPES } from '../../constants/taskTypes';

const dataSource: IData[] = [
  {
    key: 0,
    datetime: 'Fri Sep 11 2020 11:50:07 GMT+0300',
    name: 'Task 1',
    type: TASK_TYPES.jstask,
    mark: 200,
    maxMark: 200,
    place: 'sfwe;fe w;epfoihwef ei',
    broadcastUrl: 'https://ant.design/components/table/',
    organizer: 'https://github.com/zheromskyV',
    isComplited: true,
    comment: 'oauhfoif sdfjoioef',
  },
  {
    key: 1,
    datetime: 'Fri Sep 11 2020 20:50:07 GMT+0300',
    name: 'Task 2',
    type: TASK_TYPES.lecture,
    mark: 250,
    maxMark: 300,
    place:
      '[odsjpfnefipwe fweofnwe we9fuhef ewfuwebfe f0wefihuweif [odsjpfnefipwe fweofnwe we9fuhef ewfuwebfe f0wefihuweif',
    broadcastUrl: 'https://refactoring.guru/ru/design-patterns/catalog',
    organizer: 'https://github.com/zheromskyV',
    isComplited: false,
    comment: 'oauhfoif sdfjoioef',
  },
  {
    key: 2,
    datetime: 'Fri Sep 11 2020 11:50:07 GMT+0300',
    name: 'Task 3',
    type: TASK_TYPES.codewars,
    maxMark: 100,
    place: ' f0wefihuweif [odsjpfnefipwe fweofnwe we9fuhef ewfuwebfe f0wefihuweif',
    broadcastUrl: 'https://refactoring.guru/ru/design-patterns/catalog',
    organizer: 'https://github.com/evgenDer',
    isComplited: false,
  },
  {
    key: 3,
    datetime: 'Sun Dec 01 2019 11:50:07 GMT+0300',
    name: 'Task 4',
    type: TASK_TYPES.deadline,
    maxMark: 100,
    organizer: 'opifjhvsdpf',
    isComplited: false,
  },
  {
    key: 4,
    datetime: 'Fri Sep 11 2020 11:50:07 GMT+0300',
    name: 'Task 5',
    type: TASK_TYPES.interview,
    maxMark: 110,
    organizer: '',
    isComplited: true,
  },
  {
    key: 5,
    datetime: 'Fri Sep 11 2020 11:50:07 GMT+0300',
    name: 'Task 6',
    type: TASK_TYPES.test,
    organizer: 'olga',
    isComplited: true,
  },
  {
    key: 6,
    datetime: 'Fri Sep 11 2020 11:50:07 GMT+0300',
    name: 'Task 7',
    type: TASK_TYPES.htmlcssacademy,
    maxMark: 30,
    organizer: '',
    broadcastUrl: 'https://refactoring.guru/ru/design-patterns/catalog',
    isComplited: false,
  },
  {
    key: 7,
    datetime: 'Fri Sep 11 2020 11:50:07 GMT+0300',
    name: 'Task 8',
    type: TASK_TYPES.cvmarkdown,
    maxMark: 20,
    organizer: 'qwerty',
    isComplited: true,
  },
];

const App: React.FC = () => {
  return (
    <React.Fragment>
      <ScheduleTable dataSource={dataSource} userType={false} />
    </React.Fragment>
  );
};

export default App;
