import React, { useState } from 'react';
import { Modal, Button, Menu, Tag } from 'antd';
import { EditOutlined, PlusCircleOutlined, RedoOutlined } from '@ant-design/icons';
import { TASK_TYPES, TASK_TYPES_BACKGROUND_COLOR, TASK_TYPES_FONT_COLOR } from '../../constants/taskTypes';
import { makingListTags, makingListColors } from './makeListItems';

const testType: any = {
  typeProps: { 
    name: 'test type', color: '', fontColor: '', descriptionBackgroundColor: '#fff', descriptionFontColor: '#000' 
  }
}

function EditingSchedule() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [taskTypeName, setTaskTypeName] = useState('typeProps');
  const [customizationTypeTask, setCustomizationTypeTask] = useState(testType);
  const [disableItems, setDisableItems] = useState(true);
  const { SubMenu } = Menu;
  let copyTaskType: any = JSON.parse(JSON.stringify(TASK_TYPES));

  const handleOkBtn = (): void => {
    setVisibleModal(false);
    localStorage.setItem('typeTask', JSON.stringify(customizationTypeTask));
    console.log(customizationTypeTask);
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
    copyTaskType = JSON.parse(JSON.stringify(TASK_TYPES));
    setDisableItems(true);
    setTimeout(() => {
      setVisibleModal(resetModal);
    }, 350)
  }

  return (
    <>
      {console.log(TASK_TYPES)}
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
          Some description 
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
            Reset custom
          </Button>
        </div>
        <Menu
          mode={'vertical'}
          theme={'light'}
          onSelect={(item) => handleSelectTaskType(item)}
        >
          <SubMenu key="sub1" icon={<PlusCircleOutlined />} title="Select task type">
            <Menu.ItemGroup className="editing_schedule__item_group" title='Select type'>
              {makingListTags(TASK_TYPES)}
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
              {makingListColors(TASK_TYPES_BACKGROUND_COLOR)}
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
              {makingListColors(TASK_TYPES_FONT_COLOR)}
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
              {makingListColors(TASK_TYPES_FONT_COLOR)}
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
              {makingListColors(TASK_TYPES_FONT_COLOR)}
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
      </Modal>
    </>
  );
}

export default EditingSchedule;
