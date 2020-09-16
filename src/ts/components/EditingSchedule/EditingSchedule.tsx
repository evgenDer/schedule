import React, { useState } from 'react';
import { Modal, Button, Menu, Tag } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { TASK_TYPES, TASK_TYPES_BACKGROUND_COLOR, TASK_TYPES_FONT_COLOR } from '../../constants/taskTypes';
import { makingListTags, makingListColors } from './makeListItems';

function EditingSchedule() {
  const[visible, setVisible] = useState(false);
  const { SubMenu } = Menu;
  let customizationTypeTask: any = {};
  let taskType: string = '';

  const handleOkBtn = (): void => {
    setVisible(false);
    localStorage.setItem('typeTask', JSON.stringify(customizationTypeTask));
    // console.log('work', TASK_TYPES);
    console.log(customizationTypeTask);
  }

  const handleSelectTaskType = (item: any): void => {
    const copyTaskType: any = {...TASK_TYPES};
    taskType = item.key;
    customizationTypeTask = {[taskType]: Object};
    customizationTypeTask[taskType] = copyTaskType[taskType];
    // console.log('select item: ', item, taskType, customizationTypeTask);
  }

  const handleSelectColorTaskType = (item: any): void => {
    const colorTaskType = item.item.node.innerText;
    customizationTypeTask[taskType]['color'] = colorTaskType;
    // console.log('select color for task type: ', colorTaskType, customizationTypeTask);
  }

  const handleSelectBackgroundTaskType = (item: any): void => {
    const fontColorTaskType = item.item.node.innerText;
    customizationTypeTask[taskType]['fontColor'] = fontColorTaskType;
  }

  const handleSelectBackgroundColorDescription = (item: any): void => {
    const fontColorTaskType = item.item.node.innerText;
    customizationTypeTask[taskType]['descriptionBackgroundColor'] = fontColorTaskType;
  }

  const handleSelectFontColorDescription = (item: any): void => {
    const fontColorTaskType = item.item.node.innerText;
    customizationTypeTask[taskType]['descriptionBackgroundColor'] = fontColorTaskType;
  }

  return (
    <>
      <Button 
        onClick={() => setVisible(true)}
        type="primary" 
        icon={<EditOutlined />} 
        size='small' 
      />
      <Modal
        title="Editing schedule"
        visible={visible}
        onOk={() => handleOkBtn()}
        onCancel={() => setVisible(false)}
      >
        <Menu
          mode={'vertical'}
          theme={'light'}
          onSelect={(item) => handleSelectTaskType(item)}
        >
          <SubMenu key="sub1" icon={<PlusCircleOutlined />} title="Select task type">
            <Menu.ItemGroup title='Select type'>
              {makingListTags(TASK_TYPES)}
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
        <Menu
          mode={'vertical'}
          theme={'light'}
          onSelect={(item) => handleSelectColorTaskType(item)}
        >
          <SubMenu key="sub2" icon={<PlusCircleOutlined />} title="Background color for selected type(optional)">
            <Menu.ItemGroup title='Background color'>
              {makingListColors(TASK_TYPES_BACKGROUND_COLOR)}
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
        <Menu
          mode={'vertical'}
          theme={'light'}
          onSelect={(item) => handleSelectBackgroundTaskType(item)}
        >
          <SubMenu key="sub2" icon={<PlusCircleOutlined />} title="Font color for selected type(optional)">
            <Menu.ItemGroup title='Font color'>
              {makingListColors(TASK_TYPES_FONT_COLOR)}
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
        <hr />
        <Menu
          mode={'vertical'}
          theme={'light'}
          onSelect={(item) => handleSelectBackgroundColorDescription(item)}
        >
          <SubMenu key="sub2" icon={<PlusCircleOutlined />} title="Background color for description(optional)">
            <Menu.ItemGroup title='Background color'>
              {makingListColors(TASK_TYPES_FONT_COLOR)}
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
        <Menu
          mode={'vertical'}
          theme={'light'}
          onSelect={(item) => handleSelectFontColorDescription(item)}
        >
          <SubMenu key="sub2" icon={<PlusCircleOutlined />} title="Font color for description(optional)">
            <Menu.ItemGroup title='Font color'>
              {makingListColors(TASK_TYPES_FONT_COLOR)}
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
      </Modal>
    </>
  );
}

export default EditingSchedule;
