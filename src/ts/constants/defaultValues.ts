import moment from 'moment';
import { getDateString, getTimeString } from '../helpers/dataHelper';
import { DEFAULT_TASK_TYPE } from './taskTypes';
import { IData, ITaskData } from './types-interfaces';

export const DEFAULT_TASK_DATA: ITaskData = {
  haveFeedback: false,
  address: '',
  description: 'Description will be added later...',
  materials: 'Materials will be added later...',
  videoSrc: '',
  imgSrc: '',
  isOnline: false,
  deadline: getDateString(moment().format()),
  name: 'name',
  comments: [],
};

export const DEFAULT_TABLE_DATA: IData = {
  key: '',
  datetime: moment().format(),
  date: getDateString(moment().format()),
  time: getTimeString(moment().format()),
  name: 'Task',
  type: DEFAULT_TASK_TYPE,
  organizer: 'https://github.com/rolling-scopes-school',
  isComplited: false,
  mark: 0,
  maxMark: 0,
  place: '-',
  broadcastUrl: '-',
  comment: '-',
};
