import { ColumnsType } from 'antd/es/table';

export interface ITaskType {
  name: string;
  color: string;
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
}

export interface RsSchoolEvent {
  id: string;
  name: string;
  description: string;
  descriptionUrl: string;
  type: string;
  timeZone: string;
  dateTime: string;
  place: string;
  comment: string;
}

export interface Organizer {
  id: string;
  name: string;
}

export type TableDataColumns = ColumnsType<IData>;
