import React, { useState } from 'react';
import { Modal, Button, Menu, Tag } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { TASK_TYPES, TASK_TYPES_COLOR } from '../../constants/taskTypes';
import { makingListTags, makingListColors } from './makeListItems';


function EditingSchedule() {
  const[visible, setVisible] = useState(false);
  const { SubMenu } = Menu;
  let selectedTaskType: string = '';
  // let actualColorSelectedType: string = '';

  const handleOkBtn = (): void => {
    setVisible(false);
    // console.log('work', TASK_TYPES);
  }

  const handleSelectTaskType = (item: any): void => {
    selectedTaskType = item.item.node.innerText;
    // const copyTaskType: any = {...TASK_TYPES};
    // actualColorSelectedType = copyTaskType[item.key]['color'];
    console.log('select item: ', selectedTaskType, item);
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
          // defaultSelectedKeys={[actualColorSelectedType]} // Актуальный цвет выбранного типа задания
        >
          <SubMenu key="sub2" icon={<PlusCircleOutlined />} title="Select color for selected type">
            <Menu.ItemGroup title='Select type'>
              {makingListColors(TASK_TYPES_COLOR)}
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
      </Modal>
    </>
  );
}

export default EditingSchedule;
