import { ColumnsType } from 'antd/es/table';

export interface ITaskType {
  [name: string]: string;
  color: string;
  fontColor: string;
  descriptionFontColor: string;
  descriptionBackgroundColor: string;
}

export interface PropsOfListItem {
  event: RsSchoolEvent;
}

export interface ITaskTypes {
  [jstask: string]: ITaskType;
  deadline: ITaskType;
  test: ITaskType;
  codewars: ITaskType;
  interview: ITaskType;
  default: ITaskType;
  htmlcssacademy: ITaskType;
  lecture: ITaskType;
}

export interface IData {
  readonly key: number;
  datetime: string; // RFC2822 (GMT+0300)
  name: string;
  type: ITaskType;
  mark?: number;
  maxMark?: number;
  place?: string;
  broadcastUrl?: string;
  organizer: string;
  comment?: string;
  isComplited: boolean;
  date: string;
  time: string;
}

export interface IComment {
  datetime: string;
  author: string;
  content: string;
  avatar: string;
}

export interface ITaskData {
  videoSrc: string;
  name: string;
  haveFeedback: boolean;
  deadline: string;
  materials: string;
  comment: IComment;
  description: string;
  imgSrc: string;
  isOnline: boolean;
  address: string;
}

export interface RsSchoolEvent {
  id: string;
  tableData: IData;
  taskData: ITaskData;
}

export interface Organizer {
  id: string;
  name: string;
}

export type TableDataColumns = ColumnsType<IData>;
