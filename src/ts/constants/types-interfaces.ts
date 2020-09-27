import { ColumnsType } from 'antd/es/table';
import { CommentProps } from 'antd/lib/comment';

export interface ITaskType {
  name: string;
  color: string;
  fontColor: string;
  descriptionBackgroundColor: string;
  descriptionFontColor: string;
}

export interface ITaskTypes {
  [propName: string]: ITaskType;
}

export interface IData {
  key: string;
  datetime: string; // moment().format()
  date: string; // getDateString(moment().format())
  time: string; // getTimeString(moment().format())
  name: string;
  type: ITaskType;
  coef: number;
  maxMark: number;
  place: string;
  broadcastUrl: string;
  organizer: string;
  comment: string;
  isComplited: boolean;
}

export type TableDataColumns = ColumnsType<IData>;

export interface Organizer {
  id: string;
  name: string;
}

export interface ITimeZone {
  name: string;
}

export interface IComment {
  avatar: string;
  datetime: string;
  content: string;
  author: string;
}

export interface ITaskData {
  haveFeedback: boolean;
  address: string;
  description: string;
  materials: string;
  videoSrc: string;
  imgSrc: string;
  comments: CommentProps[];
}

export interface RsSchoolEvent {
  id: string;
  tableData: IData;
  taskData: ITaskData;
}
