import { ITaskType } from './types-interfaces';

export const TASK_TYPES = {
  jstask: { name: 'js task', color: 'green' } as ITaskType,
  deadline: { name: 'deadline', color: 'red' } as ITaskType,
  test: { name: 'test', color: 'volcano' } as ITaskType,
  interview: { name: 'interview', color: 'purple' } as ITaskType,
  codewars: { name: 'codewars', color: 'lime' } as ITaskType,
  cvmarkdown: { name: 'cv:markdown', color: 'geekblue' } as ITaskType,
  cvhtml: { name: 'cv:html', color: 'geekblue' } as ITaskType,
  htmlcssacademy: { name: 'htmlcssacademy', color: 'blue' } as ITaskType,
  lecture: { name: 'lecture', color: 'magenta' } as ITaskType,
};

export const TASK_TYPES_COLOR = [
  'magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'
];

// export default TASK_TYPES;
