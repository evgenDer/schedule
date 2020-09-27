import { ITaskType, ITaskTypes } from './types-interfaces';

export const TASK_TYPES: ITaskTypes = {
  jstask: {
    name: 'js task',
    color: '#f6ffed',
    fontColor: '#52c41a',
    descriptionBackgroundColor: '#fff',
    descriptionFontColor: '#000',
  },
  deadline: {
    name: 'deadline',
    color: '#fff1f0',
    fontColor: '#f5222d',
    descriptionBackgroundColor: '#fff',
    descriptionFontColor: '#000',
  },
  test: {
    name: 'test',
    color: '#fff7e6',
    fontColor: '#fa8c16',
    descriptionBackgroundColor: '#fff',
    descriptionFontColor: '#000',
  },
  interview: {
    name: 'interview',
    color: '#f9f0ff',
    fontColor: '#722ed1',
    descriptionBackgroundColor: '#fff',
    descriptionFontColor: '#000',
  },
  codewars: {
    name: 'codewars',
    color: '#f0f5ff',
    fontColor: '#2f54eb',
    descriptionBackgroundColor: '#fff',
    descriptionFontColor: '#000',
  },
  cvmarkdown: {
    name: 'cv:markdown',
    color: '#e6f7ff',
    fontColor: '#1890ff',
    descriptionBackgroundColor: '#fff',
    descriptionFontColor: '#000',
  },
  cvhtml: {
    name: 'cv:html',
    color: '#e6f7ff',
    fontColor: '#1890ff',
    descriptionBackgroundColor: '#fff',
    descriptionFontColor: '#000',
  },
  htmlcssacademy: {
    name: 'htmlcssacademy',
    color: '#fffbe6',
    fontColor: '#faad14',
    descriptionBackgroundColor: '#fff',
    descriptionFontColor: '#000',
  },
  lecture: {
    name: 'lecture',
    color: '#fff0f6',
    fontColor: '#eb2f96',
    descriptionBackgroundColor: '#fff',
    descriptionFontColor: '#000',
  },
};

export const TASK_TYPES_BACKGROUND_COLOR = [
  '#fff0f6',
  '#fffbe6',
  '#e6f7ff',
  '#f0f5ff',
  '#e6fffb',
  '#fff7e6',
  '#fff1f0',
  '#f6ffed',
  '#f9f0ff',
  '#000000',
];

export const TASK_TYPES_FONT_COLOR = [
  '#000000',
  '#ffffff',
  '#eb2f96',
  '#faad14',
  '#1890ff',
  '#2f54eb',
  '#13c2c2',
  '#fa8c16',
  '#f5222d',
  '#52c41a',
  '#722ed1',
];

export const DEFAULT_TASK_TYPE: ITaskType = {
  name: 'task',
  color: '#00000',
  fontColor: '#fffbe6',
  descriptionBackgroundColor: '#fff',
  descriptionFontColor: '#000',
};
