import React, { useState } from 'react';
import Header from '../header/header';
import { SheduleType } from '../SelectTypeShedule/SheduleType';
import SelectTypeShedule from '../SelectTypeShedule/SelectTypeShedule';
import SaveFile from '../SaveFile/SaveFile';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import EditingSchedule from '../EditingSchedule/EditingSchedule'; // Компонент редактирования типов задания.
import {                                                          //
  TASK_TYPES,                                                     // Типы заданий
  TASK_TYPES_BACKGROUND_COLOR,                                    // Красивые бэкграунды для тэгов из antd
  TASK_TYPES_FONT_COLOR                                           // Набор цветов всяких
} from '../../constants/taskTypes';                               //

const App: React.FC = () => {
  const [typeOfUser, setTypeOfUser] = useState('student');
  const [typeOfScheduleForm, setTypeOfScheduleForm] = useState(SheduleType.Table);
  const typesOfUsersHandler: (value: string) => void = function (value) {
    setTypeOfUser(value);
  };
  return (
    <React.Fragment>
      <Header selectUserHandler={typesOfUsersHandler} />
      <div className="controls">
        <SelectTypeShedule type={typeOfScheduleForm} setType={setTypeOfScheduleForm} />
        <SaveFile />
        <Button>
          <EditOutlined /> Edit types
        </Button>
      </div>
      <EditingSchedule                                          // Передать из бэкенда описанные выше проперти
        taskTypes={TASK_TYPES}                                  // и ловить в локалсторедж ответ.
        taskTypesBackgroundColor={TASK_TYPES_BACKGROUND_COLOR}  // Надеюсь не сильно зашкварно описал компонент)
        taskTypesFontColor={TASK_TYPES_FONT_COLOR}              // Пользуйтесь кто хочет!))
      />
    </React.Fragment>
  );
};

export default App;
