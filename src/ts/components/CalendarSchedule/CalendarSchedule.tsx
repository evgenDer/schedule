import React from 'react';
import { Calendar, Badge } from 'antd';
import { IData } from '../../constants/types-interfaces';
import Task from '../Task/Task';
import { findTask } from '../../helpers/dataHelper';

type CalendarSchedule = {
  dataSource: IData[];
};

const CalendarSchedule: React.FC<CalendarSchedule> = ( {dataSource} ) => {
  const getListData = (value) => {
    let listData;
    let actualObject;
    const compareDates = (day) => {
      if (day.date === value.format().slice(0, 10)) {
        actualObject = day;
      }
      return day.date === value.format().slice(0, 10);
    }
    switch (true) {
      case dataSource.some(compareDates):
        listData = [
          {
            broadcastUrl: actualObject.broadcastUrl,
            coef: actualObject.coef,
            comment: actualObject.comment,
            date: actualObject.date,
            datetime: actualObject.datetime,
            isComplited: actualObject.isComplited,
            key: actualObject.key,
            maxMark: actualObject.maxMark,
            name: actualObject.name,
            organizer: actualObject.organizer,
            place: actualObject.place,
            time: actualObject.time,
            typeId: actualObject.typeId
          },
        ];
        break;
      default:
    }
    return listData || [];
  }
  
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.key}>
            <Task id={item.key} name={item.name} type={findTask(item.typeId).name} deadline={item.date} />
          </li>
        ))}
      </ul>
    );
  }
  
  const getMonthData = (value) => {
    // if (value.month() === 8) {
    //   return 1394;
    // }
    return null;
  }
  
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>{'Это что еще такое? :('}</span>
      </div>
    ) : null;
  }

  return (
    <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
  );
}

export default CalendarSchedule;
