import { DEFAULT_TASK_TYPE } from '../constants/taskTypes';
import { ITaskType, ITaskTypes } from '../constants/types-interfaces';

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
