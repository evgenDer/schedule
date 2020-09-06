import { ColumnsType } from 'antd/es/table';

export interface ITaskType {
  name: string;
  color: string;
}

export interface IData {
  readonly key: number;
  date: string;
  time: string;
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

export type TableDataColumns = ColumnsType<IData>;
