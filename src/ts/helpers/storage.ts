import { DEFAULT_TASK_TYPE } from '../constants/taskTypes';
import { DEFAULT_TIMEZONE } from '../constants/timezones';
import { ITaskType, ITaskTypes, ITimeZone } from '../constants/types-interfaces';

export const setTaskType = (customizationTaskType: ITaskType) => {
  localStorage.setItem('RSSTypeTask', JSON.stringify(customizationTaskType));
};

export const setFullListTaskTypes = (FullListTaskTypes: ITaskTypes) => {
  localStorage.setItem('RSSFullListTypeTask', JSON.stringify(FullListTaskTypes));
};

export const getTaskType = (): ITaskType => {
  return JSON.parse(localStorage.getItem('RSSTypeTask') || JSON.stringify(DEFAULT_TASK_TYPE));
};

export const getFullListTaskTypes = (): ITaskTypes => {
  return JSON.parse(localStorage.getItem('RSSFullListTypeTask') || JSON.stringify([DEFAULT_TASK_TYPE]));
};

export const setSelectedColumns = (selectedColumns: string[]) => {
  localStorage.setItem('RSSSelectedColumns', JSON.stringify(selectedColumns));
};

export const getSelectedColumns = (): string[] => {
  return JSON.parse(localStorage.getItem('RSSSelectedColumns') || '["name", "taskDone", "deleteRow"]');
};

export const setHiddenRows = (hiddenRows: string[]) => {
  localStorage.setItem('RSSHiddenRows', JSON.stringify(hiddenRows));
};

export const getHiddenRows = (): string[] => {
  return JSON.parse(localStorage.getItem('RSSHiddenRows') || '[]');
};

export const setTimezone = (timezone: ITimeZone) => {
  localStorage.setItem('RSSTimezone', JSON.stringify(timezone));
};

export const getTimezone = (): ITimeZone => {
  return JSON.parse(localStorage.getItem('RSSTimezone') || JSON.stringify(DEFAULT_TIMEZONE));
};
