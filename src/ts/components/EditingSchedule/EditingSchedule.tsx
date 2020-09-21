import React, { useState } from 'react';
import { Modal, Button, Menu, Tag } from 'antd';
import { EditOutlined, PlusCircleOutlined, RedoOutlined } from '@ant-design/icons';
import { makingListTags, makingListColors } from './makeListItems';
import CreateTypeModal from './CreateTypeModal';

const testType: any = {
  typeProps: { 
    name: 'test type', color: '', fontColor: '', descriptionBackgroundColor: '#fff', descriptionFontColor: '#000' 
  }
}

function EditingSchedule({ taskTypes, taskTypesBackgroundColor, taskTypesFontColor }) {
  const [visibleModal, setVisibleModal] = useState(false);
  const [taskTypeName, setTaskTypeName] = useState('typeProps');
  const [customizationTypeTask, setCustomizationTypeTask] = useState(testType);
  const [disableItems, setDisableItems] = useState(true);
  const [fullListTypeTask, setFullListTypeTask] = useState(taskTypes);
  const { SubMenu } = Menu;
  let copyTaskType: any = JSON.parse(JSON.stringify(taskTypes));

  const handleOkBtn = (): void => {
    setVisibleModal(false);
    localStorage.setItem('typeTask', JSON.stringify(customizationTypeTask));
    localStorage.setItem('fullListTypeTask', JSON.stringify(fullListTypeTask));
    reloadModal(false);
    // console.log(customizationTypeTask);
  }

  const handleSelectTaskType = (item: any): void => {
    const selectTaskTypeName = item.key;
    setTaskTypeName(selectTaskTypeName);
    setCustomizationTypeTask({ [selectTaskTypeName]: copyTaskType[selectTaskTypeName] });
    setDisableItems(false);
  }

  const handleSelectColors = (item: any, propertyColor: string): void => {
    const selectColor = item.item.node.innerText;
    setCustomizationTypeTask(() => {
      customizationTypeTask[taskTypeName][propertyColor] = selectColor;
      return {...customizationTypeTask};
    });
  }

  const reloadModal = (resetModal: boolean): void => {
    setVisibleModal(false);
    setTaskTypeName('typeProps');
    setCustomizationTypeTask(testType);
    copyTaskType = JSON.parse(JSON.stringify(taskTypes));
    setDisableItems(true);
    setTimeout(() => {
      setVisibleModal(resetModal);
    }, 350)
  }

  const [visibleCreateTypeModal, letVisibleCreateTypeModal] = useState(false);
  const showCreateTypeModal = () => {
    letVisibleCreateTypeModal(true);
  }

  const getNewType = (newType: any) => {
    if (Object.keys(newType).length === 1) {
      const actualListType = JSON.parse(JSON.stringify(taskTypes));
      actualListType[Object.keys(newType)[0]] = newType[Object.keys(newType)[0]];
      setFullListTypeTask(actualListType);
      setTaskTypeName(Object.keys(newType)[0]);
      setCustomizationTypeTask(newType);
      letVisibleCreateTypeModal(false);
      setDisableItems(false);
    } else {
      letVisibleCreateTypeModal(false);
      setDisableItems(true);
    }
  }

  return (
    <>
      <Button 
        onClick={() => setVisibleModal(true)}
        type="primary" 
        icon={<EditOutlined />} 
        size='small' 
      />
      <Modal
        title="Editing schedule"
        visible={visibleModal}
        onOk={() => handleOkBtn()}
        onCancel={() => reloadModal(false)}
        // afterClose={() => setDisableItems(true)}
        destroyOnClose={true}
      >
        <div
          style={{color: customizationTypeTask[taskTypeName].descriptionFontColor, 
            background: customizationTypeTask[taskTypeName].descriptionBackgroundColor
          }} 
          className="preset_style_type"
        >
          <span>Some description</span> 
          <Tag 
            color={customizationTypeTask[taskTypeName].color} 
            style={{color: customizationTypeTask[taskTypeName].fontColor}}
          >
            {customizationTypeTask[taskTypeName].name}
          </Tag>
          <Button 
            onClick={() => reloadModal(true)}
            icon={<RedoOutlined />} 
            size="small" 
            type="primary"
          >
            Reset
          </Button>
          <Button 
            onClick={() => showCreateTypeModal()}
            icon={<PlusCircleOutlined />} 
            size="small" 
            type="primary"
          >
            Add type
          </Button>
        </div>
        <CreateTypeModal 
          showInput={visibleCreateTypeModal}
          createNewType={(newType: any) => getNewType(newType)}
        />
        <Menu
          mode={'vertical'}
          theme={'light'}
          onSelect={(item) => handleSelectTaskType(item)}
        >
          <SubMenu key="sub1" icon={<PlusCircleOutlined />} title="Select task type">
            <Menu.ItemGroup className="editing_schedule__item_group" title='Select type'>
              {makingListTags(taskTypes)}
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
        <Menu
          mode={'vertical'}
          theme={'light'}
          onSelect={(item) => handleSelectColors(item, 'color')}
        >
          <SubMenu 
            disabled={disableItems} 
            key="sub2" 
            icon={<PlusCircleOutlined />} 
            title="Background color for selected type(optional)"
          >
            <Menu.ItemGroup className="editing_schedule__item_group" title='Background color'>
              {makingListColors(taskTypesBackgroundColor)}
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
        <Menu
          mode={'vertical'}
          theme={'light'}
          onSelect={(item) => handleSelectColors(item, 'fontColor')}
        >
          <SubMenu
            disabled={disableItems}
            key="sub3"
            icon={<PlusCircleOutlined />} 
            title="Font color for selected type(optional)"
          >
            <Menu.ItemGroup className="editing_schedule__item_group" title='Font color'>
              {makingListColors(taskTypesFontColor)}
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
        <hr />
        <Menu
          mode={'vertical'}
          theme={'light'}
          onSelect={(item) => handleSelectColors(item, 'descriptionBackgroundColor')}
        >
          <SubMenu
            disabled={disableItems} 
            key="sub4" 
            icon={<PlusCircleOutlined />} 
            title="Background color for description(optional)"
          >
            <Menu.ItemGroup className="editing_schedule__item_group" title='Background color'>
              {makingListColors(taskTypesFontColor)}
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
        <Menu
          mode={'vertical'}
          theme={'light'}
          onSelect={(item) => handleSelectColors(item, 'descriptionFontColor')}
        >
          <SubMenu
            disabled={disableItems}
            key="sub5"
            icon={<PlusCircleOutlined />}
            title="Font color for description(optional)"
          >
            <Menu.ItemGroup className="editing_schedule__item_group" title='Font color'>
              {makingListColors(taskTypesFontColor)}
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
      </Modal>
    </>
  );
}

export default EditingSchedule;
