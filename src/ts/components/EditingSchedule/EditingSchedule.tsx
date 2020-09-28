import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { makingListTags, makingListColors } from './makeListItems';
import CreateTypeModal from './CreateTypeModal';
import VisualDashboard from './VisualDashboard';
import ListItem from './ListItem';
import * as Storage from '../../helpers/storage';
import { ITaskType } from '../../constants/types-interfaces';
import { DEFAULT_TASK_TYPE } from '../../constants/taskTypes';
import Services from '../../services/services';

const testType: ITaskType = {
  ...DEFAULT_TASK_TYPE,
  name: 'test type',
};

interface EditingSchedule {
  taskTypes: ITaskType[];
  taskTypesBackgroundColor: string[];
  taskTypesFontColor: string[];
}

const EditingSchedule: React.FC<EditingSchedule> = ({ taskTypes, taskTypesBackgroundColor, taskTypesFontColor }) => {
  const [visibleModal, setVisibleModal] = useState(false);

  const [customizationTypeTask, setCustomizationTypeTask] = useState(testType);
  const [disableItems, setDisableItems] = useState(true);

  const [isNew, setIsNew] = useState(false);

  const handleOkBtn = (): void => {
    setVisibleModal(false);

    if (isNew) {
      Services.addTaskType(customizationTypeTask);
    } else {
      Services.updateTaskType(customizationTypeTask);
    }
    setIsNew(false);

    Services.getAllTaskTypes().then((res: ITaskType[]) => {
      Storage.setServerTaskTypes(res);
    });

    handleReloadModal(false);
  };

  const handleSelectTaskType = (item: any): void => {
    const selectedTaskTypeName = Storage.getServerTaskTypes()[item.key];
    setCustomizationTypeTask(selectedTaskTypeName);
    setDisableItems(false);
  };

  const handleSelectColors = (item: any, propertyColor: string): void => {
    const selectColor = item.item.node.innerText;
    setCustomizationTypeTask(() => {
      customizationTypeTask[propertyColor] = selectColor;
      return { ...customizationTypeTask };
    });
  };

  const handleReloadModal = (resetModal: boolean): void => {
    setVisibleModal(false);
    setCustomizationTypeTask(testType);
    setDisableItems(true);
    setTimeout(() => {
      setVisibleModal(resetModal);
    }, 350);
  };

  const [visibleCreateTypeModal, setVisibleCreateTypeModal] = useState(false);
  const handleShowCreateTypeModal = () => {
    setVisibleCreateTypeModal(true);
  };

  const getNewType = (newTypeObj: object): void => {
    const newType: ITaskType = {
      id: '11',
      ...Object.values(newTypeObj)[0],
    };
    console.log(newType);
    setCustomizationTypeTask(newType);
    setVisibleCreateTypeModal(false);
    setDisableItems(false);
    setIsNew(true);
  };

  return (
    <>
      <Button onClick={() => setVisibleModal(true)}>
        <EditOutlined /> Customize table
      </Button>
      <Modal
        title="Editing schedule"
        visible={visibleModal}
        onOk={() => handleOkBtn()}
        onCancel={() => handleReloadModal(false)}
        destroyOnClose={true}
      >
        <CreateTypeModal showInput={visibleCreateTypeModal} createNewType={(newType: object) => getNewType(newType)} />
        <VisualDashboard
          customizationTypeTask={customizationTypeTask}
          onReloadModal={() => handleReloadModal(true)}
          onShowCreateTypeModal={() => handleShowCreateTypeModal()}
          disableItems={!disableItems}
        />
        <ListItem
          onSelectItem={(item: object) => handleSelectTaskType(item)}
          disableItems={!disableItems}
          titleSubMenu={'Select task type'}
          titleItem={'Select type'}
          listItems={makingListTags(taskTypes)}
        />
        <ListItem
          onSelectItem={(item: object) => handleSelectColors(item, 'color')}
          disableItems={disableItems}
          titleSubMenu={'Background color for selected type(optional)'}
          titleItem={'Background color'}
          listItems={makingListColors(taskTypesBackgroundColor)}
        />
        <ListItem
          onSelectItem={(item: object) => handleSelectColors(item, 'fontColor')}
          disableItems={disableItems}
          titleSubMenu={'Font color for selected type(optional)'}
          titleItem={'Font color'}
          listItems={makingListColors(taskTypesFontColor)}
        />
        <hr />
        <ListItem
          onSelectItem={(item: object) => handleSelectColors(item, 'descriptionBackgroundColor')}
          disableItems={disableItems}
          titleSubMenu={'Background color for description(optional)'}
          titleItem={'Background color'}
          listItems={makingListColors(taskTypesBackgroundColor)}
        />
        <ListItem
          onSelectItem={(item: object) => handleSelectColors(item, 'descriptionFontColor')}
          disableItems={disableItems}
          titleSubMenu={'Font color for description(optional)'}
          titleItem={'Font color'}
          listItems={makingListColors(taskTypesFontColor)}
        />
      </Modal>
    </>
  );
};

export default React.memo(EditingSchedule);
