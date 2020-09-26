import { ITaskTypes } from './types-interfaces';

const TASK_TYPES: ITaskTypes = {
  jstask: { 
    name: 'js task', color: 'green', fontColor: 'green', descriptionBackgroundColor: '#fff', descriptionFontColor: '#000' 
  },
  deadline: { 
    name: 'deadline', color: 'red', fontColor: 'red', descriptionBackgroundColor: '#fff', descriptionFontColor: '#000' 
  },
  test: { 
    name: 'test', color: 'volcano', fontColor: 'volcano', descriptionBackgroundColor: '#fff', descriptionFontColor: '#000'
  },
  interview: { 
    name: 'interview', color: 'purple', fontColor: 'purple', descriptionBackgroundColor: '#fff', descriptionFontColor: '#000'
  },
  codewars: { 
    name: 'codewars', color: 'lime', fontColor: 'lime', descriptionBackgroundColor: '#fff', descriptionFontColor: '#000'
  },
  default: { 
    name: 'cv:markdown', color: 'geekblue', fontColor: 'geekblue', descriptionBackgroundColor: '#fff', descriptionFontColor: '#000'
  },
  htmlcssacademy: { 
    name: 'htmlcssacademy', color: 'blue', fontColor: 'blue', descriptionBackgroundColor: '#fff', descriptionFontColor: '#000'
 },
  lecture: { 
    name: 'lecture', color: 'magenta', fontColor: 'magenta', descriptionBackgroundColor: '#fff', descriptionFontColor: '#000'
  },
};

export default TASK_TYPES;
