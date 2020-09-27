import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import ScheduleTable from '../scheduleTable/ScheduleTable';
import { IData, ITaskType, RsSchoolEvent } from '../../constants/types-interfaces';
import { getDateString, getTimeString, sortDataByDate } from '../../helpers/dataHelper';
import Header from '../header/header';
import { SheduleType } from '../SelectTypeShedule/SheduleType';
import SelectTypeShedule from '../SelectTypeShedule/SelectTypeShedule';
import SaveFile from '../SaveFile/SaveFile';
import { Layout } from 'antd';
import TimeZoneSelector from '../timeZoneSelector/TimeZoneSelector';
import Services from '../../services/services';
import EditingSchedule from '../EditingSchedule/EditingSchedule';
import { TASK_TYPES_BACKGROUND_COLOR, TASK_TYPES_FONT_COLOR } from '../../constants/taskTypes';
import { DEFAULT_TASK_DATA } from '../../constants/defaultValues';
import * as Storage from '../../helpers/storage';
import CalendarSchedule from '../CalendarSchedule/CalendarSchedule'
import ScheduleList from '../schedule-list/shedule-list';

const App: React.FC = () => {
  const [data, setData] = useState<RsSchoolEvent[]>([]);
  const [tableData, setTableData] = useState<IData[]>([]);
  const [taskTypesData, setTaskTypesData] = useState<ITaskType[]>([]);
  const [timezone, setTimezone] = useState(Storage.getTimezone());
  const [typeOfUser, setTypeOfUser] = useState('student');
  const [typeOfScheduleForm, setTypeOfScheduleForm] = useState(SheduleType.Table);

  const typesOfUsersHandler: (value: string) => void = function (value) {
    setTypeOfUser(value);
  };

  useEffect(() => {
    Services.getAllEvents().then((res: RsSchoolEvent[]) => {
      setData(res);
      setTableData(res.map((event) => ({ ...event.tableData, key: event.id })).sort(sortDataByDate));
    });
    Services.getAllTaskTypes().then((res: ITaskType[]) => {
      setTaskTypesData(res);
      Storage.setServerTaskTypes(res);
    });
  }, []);

  useEffect(() => {
    setTableData((prev) =>
      prev.map((element) => {
        const newDT = moment(element.datetime).tz(timezone.name).format();
        element.datetime = newDT;
        element.date = getDateString(newDT);
        element.time = getTimeString(newDT);
        return element;
      })
    );
    Storage.setTimezone(timezone);
  }, [timezone]);

  const updateTableData = (newTableData: IData[]) => {
    newTableData.forEach((element) => {
      const correspondingData = data.find(({ id }) => id === element.key);
      if (correspondingData) {
        const newData = { ...correspondingData };
        newData.tableData = element;
        newData.taskData.address = element.place;
        Services.updateEvent(newData);
      } else {
        const newEvent: RsSchoolEvent = {
          id: '',
          tableData: element,
          taskData: DEFAULT_TASK_DATA,
        };
        Services.addEvent(newEvent);
      }
    });
  };

  let content: JSX.Element;
  switch (typeOfScheduleForm) {
    case SheduleType.Table:
      content = (
        <ScheduleTable
          dataSource={tableData}
          setData={setTableData}
          userType={typeOfUser !== 'student'}
          timezone={timezone}
          setTimezone={setTimezone}
          updateTableData={updateTableData}
        />
      );
      break;
    case SheduleType.List:
      content = <ScheduleList events={tableData} />;
      break;
    case SheduleType.Calendar:
      content = <CalendarSchedule dataSource={tableData} />
      break;
    default:
      content = <></>;
  }

  return (
    <React.Fragment>
      <Header selectUserHandler={typesOfUsersHandler} />
      <Layout.Content>
        <div className="controls">
          <TimeZoneSelector timezone={timezone} setTimezone={setTimezone} />
          <SelectTypeShedule type={typeOfScheduleForm} setType={setTypeOfScheduleForm} />
          <SaveFile />
          <EditingSchedule
            taskTypes={taskTypesData}
            taskTypesBackgroundColor={TASK_TYPES_BACKGROUND_COLOR}
            taskTypesFontColor={TASK_TYPES_FONT_COLOR}
          />
        </div>
        <div className="saving-content">
        </div>
        <div className="saving-content">{content}</div>
      </Layout.Content>
    </React.Fragment>
  );
};

export default App;
