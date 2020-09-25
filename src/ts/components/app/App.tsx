import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import ScheduleTable from '../scheduleTable/ScheduleTable';
import { IData, ITaskData, RsSchoolEvent } from '../../constants/types-interfaces';
import { TASK_TYPES } from '../../constants/taskTypes';
import { DEFAULT_TIMEZONE } from '../../constants/timezones';
import { getDateString, getTimeString, sortDataByDate } from '../../helpers/dataHelper';
import Header from '../header/header';
import { SheduleType } from '../SelectTypeShedule/SheduleType';
import SelectTypeShedule from '../SelectTypeShedule/SelectTypeShedule';
import SaveFile from '../SaveFile/SaveFile';
import { Button, Layout } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import TimeZoneSelector from '../timeZoneSelector/TimeZoneSelector';
import Services from '../../services/services';

/* const dataSource: RsSchoolEvent[] = [
  {
    id: '6WsaQ4vkfTlYn5J5ZryE',
    tableData: {
      key: '0',
      datetime: '2020-09-12T22:29:32+03:00',
      date: getDateString('2020-09-12T22:29:32+03:00'),
      time: getTimeString('2020-09-12T22:29:32+03:00'),
      name: 'Task 1',
      type: TASK_TYPES.jstask,
      mark: 200,
      maxMark: 200,
      place: 'sfwe;fe w;epfoihwef ei',
      broadcastUrl: 'https://ant.design/components/table/',
      organizer: 'https://github.com/zheromskyV',
      isComplited: true,
      comment: 'oauhfoif sdfjoioef',
    } as IData,
    taskData: {
      haveFeedback: false,
      address: 'string',
      description: 'string',
      materials: 'string',
      videoSrc: 'string',
      imgSrc: 'string',
      isOnline: true,
      deadline: 'deadline',
      name: 'name',
    } as ITaskData,
  },
  {
    id: 'GzJiZ3M0h03KxwVJqyY8',
    tableData: {
      key: '1',
      datetime: '2020-10-12T22:29:32+03:00',
      date: getDateString('2020-10-12T22:29:32+03:00'),
      time: getTimeString('2020-10-12T22:29:32+03:00'),
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
    } as IData,
    taskData: {
      haveFeedback: false,
      address: 'string',
      description: 'string',
      materials: 'string',
      videoSrc: 'string',
      imgSrc: 'string',
      isOnline: true,
      deadline: 'deadline',
      name: 'name',
    } as ITaskData,
  },
  {
    id: 'JCAoysqQQYtGxDbdVDOE',
    tableData: {
      key: '2',
      datetime: '2020-09-13T22:29:32+03:00',
      date: getDateString('2020-09-13T22:29:32+03:00'),
      time: getTimeString('2020-09-13T22:29:32+03:00'),
      name: 'Task 3',
      type: TASK_TYPES.codewars,
      maxMark: 100,
      place: ' f0wefihuweif [odsjpfnefipwe fweofnwe we9fuhef ewfuwebfe f0wefihuweif',
      broadcastUrl: 'https://refactoring.guru/ru/design-patterns/catalog',
      organizer: 'https://github.com/evgenDer',
      isComplited: false,
      comment: '-',
      mark: 0,
    } as IData,
    taskData: {
      haveFeedback: false,
      address: 'string',
      description: 'string',
      materials: 'string',
      videoSrc: 'string',
      imgSrc: 'string',
      isOnline: true,
      deadline: 'deadline',
      name: 'name',
    } as ITaskData,
  },
  {
    id: 'KKUOHrhXTbQjSLDFOydV',
    tableData: {
      key: '3',
      datetime: '2020-09-11T22:29:32+03:00',
      date: getDateString('2020-09-11T22:29:32+03:00'),
      time: getTimeString('2020-09-11T22:29:32+03:00'),
      name: 'Task 4',
      type: TASK_TYPES.deadline,
      maxMark: 100,
      organizer: 'opifjhvsdpf',
      isComplited: false,
      comment: '-',
      mark: 0,
      place: '-',
      broadcastUrl: '-',
    } as IData,
    taskData: {
      haveFeedback: false,
      address: 'string',
      description: 'string',
      materials: 'string',
      videoSrc: 'string',
      imgSrc: 'string',
      isOnline: true,
      deadline: 'deadline',
      name: 'name',
    } as ITaskData,
  },
  {
    id: 'MNnZdGDSskvrSw4wG4ml',
    tableData: {
      key: '4',
      datetime: '1998-09-12T22:29:32+03:00',
      date: getDateString('1998-09-12T22:29:32+03:00'),
      time: getTimeString('1998-09-12T22:29:32+03:00'),
      name: 'Task 5',
      type: TASK_TYPES.interview,
      maxMark: 110,
      organizer: '-',
      isComplited: true,
      comment: '-',
      mark: 0,
      place: '-',
      broadcastUrl: '-',
    } as IData,
    taskData: {
      haveFeedback: false,
      address: 'string',
      description: 'string',
      materials: 'string',
      videoSrc: 'string',
      imgSrc: 'string',
      isOnline: true,
      deadline: 'deadline',
      name: 'name',
    } as ITaskData,
  },
  {
    id: 'QREqVicOQkMc5bVwQvNF',
    tableData: {
      key: '5',
      datetime: '2020-09-12T22:29:32+03:00',
      date: getDateString('2020-09-12T22:29:32+03:00'),
      time: getTimeString('2020-09-12T22:29:32+03:00'),
      name: 'Task 6',
      type: TASK_TYPES.test,
      organizer: 'olga',
      isComplited: true,
      comment: '-',
      mark: 0,
      place: '-',
      broadcastUrl: '-',
      maxMark: 0,
    } as IData,
    taskData: {
      haveFeedback: false,
      address: 'string',
      description: 'string',
      materials: 'string',
      videoSrc: 'string',
      imgSrc: 'string',
      isOnline: true,
      deadline: 'deadline',
      name: 'name',
    } as ITaskData,
  },
  {
    id: 'Sjf7hnliLY3mGXfaWXwo',
    tableData: {
      key: '6',
      datetime: '2020-09-15T22:29:32+03:00',
      date: getDateString('2020-10-15T22:29:32+03:00'),
      time: getTimeString('2020-10-15T22:29:32+03:00'),
      name: 'Task 7',
      type: TASK_TYPES.htmlcssacademy,
      maxMark: 30,
      organizer: '-',
      broadcastUrl: 'https://refactoring.guru/ru/design-patterns/catalog',
      isComplited: false,
      comment: '-',
      mark: 0,
      place: '-',
    } as IData,
    taskData: {
      haveFeedback: false,
      address: 'string',
      description: 'string',
      materials: 'string',
      videoSrc: 'string',
      imgSrc: 'string',
      isOnline: true,
      deadline: 'deadline',
      name: 'name',
    } as ITaskData,
  },
  {
    id: 'UtWrQWvvhAwlM6RHAASb',
    tableData: {
      key: '7',
      datetime: '2020-09-12T22:30:00+03:00',
      date: getDateString('2020-09-12T22:30:00+03:00'),
      time: getTimeString('2020-09-12T22:30:00+03:00'),
      name: 'Task 8',
      type: TASK_TYPES.cvmarkdown,
      maxMark: 20,
      organizer: 'qwerty',
      isComplited: true,
      comment: '-',
      mark: 0,
      place: '-',
      broadcastUrl: '-',
    } as IData,
    taskData: {
      haveFeedback: false,
      address: 'string',
      description: 'string',
      materials: 'string',
      videoSrc: 'string',
      imgSrc: 'string',
      isOnline: true,
      deadline: 'deadline',
      name: 'name',
    } as ITaskData,
  },
]; */

const defaultTableData: IData = {
  key: '',
  datetime: moment().format(),
  date: getDateString(moment().format()),
  time: getTimeString(moment().format()),
  name: 'Task',
  type: { name: 'task', color: 'gold' },
  organizer: 'https://github.com/rolling-scopes-school',
  isComplited: false,
  mark: 0,
  maxMark: 0,
  place: 'Place',
  broadcastUrl: 'URL',
  comment: 'Your comment',
};

const App: React.FC = () => {
  const [data, setData] = useState<IData[]>([defaultTableData]);
  const [timezone, setTimezone] = useState(DEFAULT_TIMEZONE);
  const [typeOfUser, setTypeOfUser] = useState('student');
  const [typeOfScheduleForm, setTypeOfScheduleForm] = useState(SheduleType.Table);

  const typesOfUsersHandler: (value: string) => void = function (value) {
    setTypeOfUser(value);
  };

  useEffect(() => {
    Services.getAllEvents().then((res: RsSchoolEvent[]) => {
      setData(res.map((event) => ({ ...event.tableData, key: event.id })).sort(sortDataByDate));
    });
  }, []);

  useEffect(() => {
    setData((prev) =>
      prev.map((element) => {
        const newDT = moment(element.datetime).tz(timezone.name).format();
        element.datetime = newDT;
        element.date = getDateString(newDT);
        element.time = getTimeString(newDT);
        return element;
      })
    );
  }, [timezone]);

  return (
    <React.Fragment>
      <Header selectUserHandler={typesOfUsersHandler} />
      <Layout.Content>
        <div className="controls">
          <TimeZoneSelector timezone={timezone} setTimezone={setTimezone} />
          <SelectTypeShedule type={typeOfScheduleForm} setType={setTypeOfScheduleForm} />
          <SaveFile />
          <Button>
            <EditOutlined /> Edit types
          </Button>
        </div>
        <ScheduleTable
          dataSource={data}
          setData={setData}
          userType={typeOfUser !== 'student'}
          timezone={timezone}
          setTimezone={setTimezone}
        />
      </Layout.Content>
    </React.Fragment>
  );
};

export default App;
