import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { makingListTags, makingListColors } from './makeListItems';
import CreateTypeModal from './CreateTypeModal';
import VisualDashboard from './VisualDashboard';
import ListItem from './ListItem';
import { setTaskType, setFullListTaskTypes } from '../../helpers/storage';
import { ITaskType, ITaskTypes } from '../../constants/types-interfaces';

const testType: any = {
  testType: {
    name: 'test type',
    color: '',
    fontColor: '',
    descriptionBackgroundColor: '#fff',
    descriptionFontColor: '#000',
  },
};

interface EditingSchedule {
  taskTypes: ITaskTypes;
  taskTypesBackgroundColor: string[];
  taskTypesFontColor: string[];
}

const EditingSchedule: React.FC<EditingSchedule> = ({ taskTypes, taskTypesBackgroundColor, taskTypesFontColor }) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [taskTypeName, setTaskTypeName] = useState('testType');
  const [customizationTypeTask, setCustomizationTypeTask] = useState(testType);
  const [disableItems, setDisableItems] = useState(true);
  const [fullListTypeTask, setFullListTypeTask] = useState(taskTypes);
  let copyTaskType: any = JSON.parse(JSON.stringify(taskTypes));

  const handleOkBtn = (): void => {
    setVisibleModal(false);
    setTaskType(customizationTypeTask);
    setFullListTaskTypes(fullListTypeTask);
    handleReloadModal(false);
  };

  const handleSelectTaskType = (item: any): void => {
    const selectedTaskTypeName = item.key;
    setTaskTypeName(selectedTaskTypeName);
    setCustomizationTypeTask({ [selectedTaskTypeName]: copyTaskType[selectedTaskTypeName] });
    setDisableItems(false);
  };

  const handleSelectColors = (item: any, propertyColor: string): void => {
    const selectColor = item.item.node.innerText;
    setCustomizationTypeTask(() => {
      customizationTypeTask[taskTypeName][propertyColor] = selectColor;
      return { ...customizationTypeTask };
    });
  };

  const handleReloadModal = (resetModal: boolean): void => {
    setVisibleModal(false);
    setTaskTypeName('testType');
    setCustomizationTypeTask(testType);
    copyTaskType = JSON.parse(JSON.stringify(taskTypes));
    setDisableItems(true);
    setTimeout(() => {
      setVisibleModal(resetModal);
    }, 350);
  };

  const [visibleCreateTypeModal, setVisibleCreateTypeModal] = useState(false);
  const handleShowCreateTypeModal = () => {
    setVisibleCreateTypeModal(true);
  };

  const getNewType = (newType: object): void => {
    if (Object.keys(newType).length === 1) {
      const actualListType = JSON.parse(JSON.stringify(taskTypes));
      actualListType[Object.keys(newType)[0]] = newType[Object.keys(newType)[0]];
      setFullListTypeTask(actualListType);
      setTaskTypeName(Object.keys(newType)[0]);
      setCustomizationTypeTask(newType);
      setVisibleCreateTypeModal(false);
      setDisableItems(false);
    } else {
      setVisibleCreateTypeModal(false);
      setDisableItems(true);
    }
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
          taskTypeName={taskTypeName}
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

export default EditingSchedule;
