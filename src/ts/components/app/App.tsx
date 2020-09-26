import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import ScheduleTable from '../scheduleTable/ScheduleTable';
import { IData, RsSchoolEvent } from '../../constants/types-interfaces';
import { DEFAULT_TIMEZONE } from '../../constants/timezones';
import { getDateString, getTimeString, sortDataByDate } from '../../helpers/dataHelper';
import Header from '../header/header';
import { SheduleType } from '../SelectTypeShedule/SheduleType';
import SelectTypeShedule from '../SelectTypeShedule/SelectTypeShedule';
import SaveFile from '../SaveFile/SaveFile';
import { Layout } from 'antd';
import TimeZoneSelector from '../timeZoneSelector/TimeZoneSelector';
import Services from '../../services/services';
import EditingSchedule from '../EditingSchedule/EditingSchedule';
import { TASK_TYPES, TASK_TYPES_BACKGROUND_COLOR, TASK_TYPES_FONT_COLOR } from '../../constants/taskTypes';
import { DEFAULT_TASK_DATA } from '../../constants/defaultValues';

const App: React.FC = () => {
  const [data, setData] = useState<RsSchoolEvent[]>([]);
  const [tableData, setTableData] = useState<IData[]>([]);
  const [timezone, setTimezone] = useState(DEFAULT_TIMEZONE);
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
  }, [timezone]);

  const updateTableData = (newTableData: IData[]) => {
    newTableData.forEach((element) => {
      const correspondingData = data.find(({ id }) => id === element.key);
      if (correspondingData) {
        const newData = { ...correspondingData };
        newData.tableData = element;
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

  return (
    <React.Fragment>
      <Header selectUserHandler={typesOfUsersHandler} />
      <Layout.Content>
        <div className="controls">
          <TimeZoneSelector timezone={timezone} setTimezone={setTimezone} />
          <SelectTypeShedule type={typeOfScheduleForm} setType={setTypeOfScheduleForm} />
          <SaveFile />
          <EditingSchedule
            taskTypes={TASK_TYPES}
            taskTypesBackgroundColor={TASK_TYPES_BACKGROUND_COLOR}
            taskTypesFontColor={TASK_TYPES_FONT_COLOR}
          />
        </div>
        <div className="saving-content">
          <ScheduleTable
            dataSource={tableData}
            setData={setTableData}
            userType={typeOfUser !== 'student'}
            timezone={timezone}
            setTimezone={setTimezone}
            updateTableData={updateTableData}
          />
        </div>
      </Layout.Content>
    </React.Fragment>
  );
};

export default App;
