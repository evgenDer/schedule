import moment from 'moment';
import { getDateString, getTimeString } from '../helpers/dataHelper';
import { DEFAULT_TASK_TYPE } from './taskTypes';
import { IData, ITaskData } from './types-interfaces';

export const DEFAULT_TASK_DATA: ITaskData = {
  haveFeedback: false,
  address: '',
  description: 'Will be added later...',
  materials: 'Will be added later...',
  videoSrc: '',
  imgSrc: '',
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
  coef: 0.1,
  maxMark: 0,
  place: '-',
  broadcastUrl: '-',
  comment: '-',
};
