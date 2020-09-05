import React from 'react';
import ScheduleTable from '../scheduleTable/ScheduleTable';
import { IData } from '../../constants/types-interfaces';

const dataSource: IData[] = [
  {
    key: 0,
    date: '2020-09-02',
    time: '20:44',
    name: 'Task 1',
    mark: 200,
    maxMark: 200,
    place: 'sfwe;fe w;epfoihwef ei',
    broadcastUrl: 'https://ant.design/components/table/',
    organizer: 'sdfsdfsdf',
    isComplited: true,
    comment: 'oauhfoif sdfjoioef',
  },
  {
    key: 1,
    date: '2020-09-02',
    time: '20:43',
    name: 'Task 2',
    mark: 250,
    maxMark: 300,
    place:
      '[odsjpfnefipwe fweofnwe we9fuhef ewfuwebfe f0wefihuweif [odsjpfnefipwe fweofnwe we9fuhef ewfuwebfe f0wefihuweif',
    broadcastUrl: 'https://refactoring.guru/ru/design-patterns/catalog',
    organizer: 'eqeqweqwe',
    isComplited: false,
    comment: 'oauhfoif sdfjoioef',
  },
  {
    key: 2,
    date: '2020-09-02',
    time: '20:24',
    name: 'Task 3',
    maxMark: 100,
    place:
      ' f0wefihuweif [odsjpfnefipwe fweofnwe we9fuhef ewfuwebfe f0wefihuweif',
    broadcastUrl: 'https://refactoring.guru/ru/design-patterns/catalog',
    organizer: 'eqeqweqwe',
    isComplited: false,
  },
  {
    key: 3,
    date: '2020-09-02',
    time: '20:44',
    name: 'Task 4',
    maxMark: 100,
    organizer: 'opifjhvsdpf oarifr perighropfjrpigjrg rpgier',
    isComplited: false,
  },
  {
    key: 4,
    date: '2020-09-02',
    time: '00:00',
    name: 'Task 5',
    maxMark: 110,
    organizer: 'eqeqweqwe',
    isComplited: true,
  },
  {
    key: 5,
    date: '2020-09-02',
    time: '12:20',
    name: 'Task 6',
    organizer: 'olga',
    isComplited: true,
  },
  {
    key: 6,
    date: '2020-09-02',
    time: '21:35',
    name: 'Task 7',
    maxMark: 30,
    organizer: '',
    broadcastUrl: 'https://refactoring.guru/ru/design-patterns/catalog',
    isComplited: false,
  },
  {
    key: 7,
    date: '2020-09-02',
    time: '21:22',
    name: 'Task 8',
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
