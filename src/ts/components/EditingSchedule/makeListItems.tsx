import React from 'react';
import { Menu, Tag } from 'antd';

export const makingListTags = (listTags: any) => {
  const answer: object[] = [];
  for (let key in listTags) {
    answer.push(<Menu.Item key={key}>
                  <Tag color={listTags[key]['color']}>{listTags[key]['name']}</Tag>
                </Menu.Item>);
  }
  return answer;
}

export const makingListColors = (listColors: any) => {
  const answer: object[] = [];
  listColors.forEach((el: any) => {
    answer.push(<Menu.Item key={el}>
                  <Tag className={el.split('')[0] === '#' ? 'editing_schedule__tag' : ''} color={el}>{el}</Tag>
                </Menu.Item>);
  });
  return answer;
}
