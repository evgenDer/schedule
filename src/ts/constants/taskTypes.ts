import { ITaskType } from './types-interfaces';

export const TASK_TYPES = {
  jstask: {
    name: 'js task',
    color: 'green',
    fontColor: 'green',
    descriptionBackgroundColor: '#fff',
    descriptionFontColor: '#000',
  } as ITaskType,
  deadline: {
    name: 'deadline',
    color: 'red',
    fontColor: 'red',
    descriptionBackgroundColor: '#fff',
    descriptionFontColor: '#000',
  } as ITaskType,
  test: {
    name: 'test',
    color: 'volcano',
    fontColor: 'volcano',
    descriptionBackgroundColor: '#fff',
    descriptionFontColor: '#000',
  } as ITaskType,
  interview: {
    name: 'interview',
    color: 'purple',
    fontColor: 'purple',
    descriptionBackgroundColor: '#fff',
    descriptionFontColor: '#000',
  } as ITaskType,
  codewars: {
    name: 'codewars',
    color: 'lime',
    fontColor: 'lime',
    descriptionBackgroundColor: '#fff',
    descriptionFontColor: '#000',
  } as ITaskType,
  cvmarkdown: {
    name: 'cv:markdown',
    color: 'geekblue',
    fontColor: 'geekblue',
    descriptionBackgroundColor: '#fff',
    descriptionFontColor: '#000',
  } as ITaskType,
  cvhtml: {
    name: 'cv:html',
    color: 'geekblue',
    fontColor: 'geekblue',
    descriptionBackgroundColor: '#fff',
    descriptionFontColor: '#000',
  } as ITaskType,
  htmlcssacademy: {
    name: 'htmlcssacademy',
    color: 'blue',
    fontColor: 'blue',
    descriptionBackgroundColor: '#fff',
    descriptionFontColor: '#000',
  } as ITaskType,
  lecture: {
    name: 'lecture',
    color: 'magenta',
    fontColor: 'magenta',
    descriptionBackgroundColor: '#fff',
    descriptionFontColor: '#000',
  } as ITaskType,
};

export const TASK_TYPES_BACKGROUND_COLOR = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

export const TASK_TYPES_FONT_COLOR = [
  '#000000',
  '#ffffff',
  '#f00000',
  '#fff700',
  '#d9d9d9',
  '#069718',
  '#0880a3',
  '#0037ff',
  '#d800ff',
  '#760863',
];
