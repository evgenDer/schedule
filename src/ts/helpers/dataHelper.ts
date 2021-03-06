import { ColumnsType } from 'antd/lib/table';
import { DEFAULT_TASK_TYPE } from '../constants/taskTypes';
import { IData, ITaskType } from '../constants/types-interfaces';
import * as Storage from '../helpers/storage';

export const sortMarks = (a: number | undefined, b: number | undefined) => {
  const aVal = a ? a : 0;
  const bVal = b ? b : 0;
  return aVal - bVal;
};

export const sortDate = (a: Date, b: Date) => a.valueOf() - b.valueOf();

export const formatToDatetime = (num: number) => {
  const str = num.toString();
  return str.length === 1 ? `0${str}` : str;
};

export const getDateString = (datetime: string) => {
  return datetime.split('T')[0];
};

export const getTimeString = (datetime: string) => {
  return datetime.split('T')[1].slice(0, 5);
};

export const isUrl = (url: string) => url.split('/').includes('https:');

export const sortDataByDate = (a: IData, b: IData) => {
  const aDate = new Date(a.date);
  const bDate = new Date(b.date);
  return sortDate(aDate, bDate);
};

export const calculateColumnsWidthSum = (columns: ColumnsType<IData>): number => {
  return columns.map((col) => col.width as number).reduce((accum, current) => accum + current);
};

export const findTask = (typeId: string): ITaskType => {
  const taskTypesData = Storage.getServerTaskTypes();
  const res = taskTypesData.find(({ id }) => id === typeId);
  return res || DEFAULT_TASK_TYPE;
};
