import React from 'react';
import { Tooltip, Tag } from 'antd';
import { LikeOutlined, DislikeOutlined, GithubOutlined } from '@ant-design/icons';
import { sortMarks, sortDate, isUrl } from '../../helpers/dataHelper';
import { IData, TableDataColumns, ITaskType } from '../../constants/types-interfaces';
import * as Storage from '../../helpers/storage';
import { findTask } from '../../helpers/dataHelper';

export const COMMON_COLS: TableDataColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    sorter: (a: IData, b: IData) => (a.name > b.name ? -1 : 1),
    width: 200,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (date: string) => date,
    sorter: (a: IData, b: IData) => sortDate(new Date(a.date), new Date(b.date)),
    width: 150,
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    render: (time: string) => time,
    width: 120,
  },
  {
    title: 'Type',
    dataIndex: 'typeId',
    key: 'typeId',
    render: (typeId: string) => {
      const type = findTask(typeId);
      const { name, color, fontColor } = type;
      return (
        <Tag color={color} style={{ color: fontColor }}>
          {name}
        </Tag>
      );
    },
    filters: Storage.getServerTaskTypes().map(({ name }) => ({ text: name, value: name })),
    onFilter: (value: any, { typeId }: IData) => findTask(typeId).name === value,
    align: 'center',
    width: 180,
  },
  {
    title: 'Place',
    dataIndex: 'place',
    key: 'place',
    ellipsis: true,
    render: (place: string) => (
      <Tooltip placement="topLeft" title={place}>
        <span>{place}</span>
      </Tooltip>
    ),
    width: 150,
  },
  {
    title: 'Broadcast Url',
    dataIndex: 'broadcastUrl',
    key: 'broadcastUrl',
    ellipsis: true,
    render: (url: string) => (
      <Tooltip placement="topLeft" title={url}>
        {url === '-' || !isUrl(url) ? <span>-</span> : <a href={url}>{url}</a>}
      </Tooltip>
    ),
    width: 150,
  },
  {
    title: 'Organizer',
    dataIndex: 'organizer',
    key: 'organizer',
    ellipsis: true,
    render: (organizer: string) => {
      if (organizer !== '-' && isUrl(organizer)) {
        return (
          <Tag icon={<GithubOutlined />} color="default">
            <a href={organizer}>{organizer.split('/').pop()}</a>
          </Tag>
        );
      }
      return <span>-</span>;
    },
    width: 165,
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
    key: 'comment',
    ellipsis: true,
    render: (comment: string) => (
      <Tooltip placement="topLeft" title={comment}>
        <span>{comment}</span>
      </Tooltip>
    ),
    width: 200,
  },
  {
    title: 'Coefficient',
    dataIndex: 'coef',
    key: 'coef',
    sorter: (a: IData, b: IData) => sortMarks(a.coef, b.coef),
    width: 120,
    align: 'right',
  },
  {
    title: 'Max Mark',
    dataIndex: 'maxMark',
    key: 'maxMark',
    sorter: (a: IData, b: IData) => sortMarks(a.maxMark, b.maxMark),
    width: 120,
    align: 'right',
  },
];

export const STUDENT_COLS: TableDataColumns = [
  {
    title: 'Complited',
    dataIndex: 'isComplited',
    key: 'isComplited',
    render: (isComplited: boolean) => (isComplited ? <LikeOutlined /> : <DislikeOutlined />),
    filters: [
      {
        text: <LikeOutlined />,
        value: true,
      },
      {
        text: <DislikeOutlined />,
        value: false,
      },
    ],
    onFilter: (value: any, { isComplited }: IData) => isComplited === value,
    align: 'center',
    width: 120,
  },
  {
    title: '',
    dataIndex: 'taskDone',
    key: 'taskDone',
    align: 'center',
    width: 70,
  },
];

export const ORGANIZER_COLS: TableDataColumns = [
  {
    title: '',
    dataIndex: 'deleteRow',
    key: 'deleteRow',
    fixed: 'right',
    align: 'center',
    width: 1,
  },
];
