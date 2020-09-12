import React from 'react';
import { Button, Tooltip, Popconfirm, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, LikeOutlined, DislikeOutlined, GithubOutlined } from '@ant-design/icons';
import { sortMarks, sortDate, getDateString, getTimeString } from '../../helpers/dataHelper';
import { IData, TableDataColumns, ITaskType } from '../../constants/types-interfaces';
import { TASK_TYPES } from '../../constants/taskTypes';

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
    dataIndex: 'datetime',
    key: 'date',
    render: (datetime: string) => getDateString(new Date(datetime)),
    sorter: (a: IData, b: IData) => sortDate(new Date(a.datetime), new Date(b.datetime)),
    width: 120,
  },
  {
    title: 'Time',
    dataIndex: 'datetime',
    key: 'time',
    render: (datetime: string) => getTimeString(new Date(datetime)),
    width: 100,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: ({ name, color }: ITaskType) => <Tag color={color}>{name}</Tag>,
    filters: Object.values(TASK_TYPES).map(({ name }) => ({ text: name, value: name })),
    onFilter: (value: any, { type }: IData) => type.name === value,
    align: 'center',
    width: 150,
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
        <a href={url}>{url}</a>
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
      if (organizer) {
        return (
          <Tag icon={<GithubOutlined />} color="default">
            <a href={organizer}>{organizer.split('/').pop()}</a>
          </Tag>
        );
      }
      return '';
    },
    width: 150,
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
    title: 'Mark',
    dataIndex: 'mark',
    key: 'mark',
    sorter: (a: IData, b: IData) => sortMarks(a.mark, b.mark),
    width: 120,
    align: 'right',
  },
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
    fixed: 'right',
    align: 'center',
    width: 70,
  },
  {
    title: '',
    dataIndex: 'hideRow',
    key: 'hideRow',
    fixed: 'right',
    align: 'center',
    width: 70,
  },
];

export const ORGANIZER_COLS: TableDataColumns = [];
