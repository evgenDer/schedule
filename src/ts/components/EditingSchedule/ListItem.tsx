import React from 'react';
import { Menu } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const ListItem = ( {onSelectItem, disableItems, listItems, titleSubMenu, titleItem} ) => {
  return (
    <Menu
      mode={'vertical'}
      theme={'light'}
      onSelect={(item) => onSelectItem(item)}
    >
      <SubMenu 
        disabled={disableItems}
        icon={<PlusCircleOutlined />} 
        title={titleSubMenu}
      >
        <Menu.ItemGroup className="editing-schedule__item_group" title={titleItem}>
          {listItems}
        </Menu.ItemGroup>
      </SubMenu>
    </Menu>
  );
}

export default ListItem;
