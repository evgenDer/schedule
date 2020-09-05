import React from 'react';
import { Button, Tooltip, Popconfirm } from 'antd';
import {
  EditOutlined,
  MinusSquareOutlined,
  CheckOutlined,
  DeleteOutlined,
  LikeOutlined,
  DislikeOutlined,
} from '@ant-design/icons';
import { sortMarks } from '../helpers/dataHelper';
import { IData, TableDataColumns } from './types-interfaces';

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
    width: 120,
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    width: 100,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: 100,
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
    render: (organizer: string) => (
      <Tooltip placement="topLeft" title={organizer}>
        <span>{organizer}</span>
      </Tooltip>
    ),
    width: 150,
  },
  {
    title: 'Mark',
    dataIndex: 'mark',
    key: 'mark',
    sorter: (a: IData, b: IData) => sortMarks(a.mark, b.mark),
    width: 120,
  },
  {
    title: 'Max Mark',
    dataIndex: 'maxMark',
    key: 'maxMark',
    sorter: (a: IData, b: IData) => sortMarks(a.maxMark, b.maxMark),
    width: 120,
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
    width: 150,
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
    onFilter: (value: any, record: IData) => record.isComplited === value,
    width: 120,
  },
  {
    title: '',
    dataIndex: 'taskDone',
    fixed: 'right',
    render: () => (
      <Tooltip placement="topRight" title="Mark as done!">
        <Button type="ghost">
          <CheckOutlined />
        </Button>
      </Tooltip>
    ),
    width: 70,
  },
  {
    title: '',
    dataIndex: 'hideRow',
    fixed: 'right',
    render: () => (
      <Tooltip placement="topRight" title="Hide this row!">
        <Button type="ghost">
          <MinusSquareOutlined />
        </Button>
      </Tooltip>
    ),
    width: 70,
  },
];

export const ORGANIZER_COLS: TableDataColumns = [
  {
    title: '',
    dataIndex: 'edit',
    key: 'edit',
    fixed: 'right',
    render: () => (
      <Tooltip placement="topRight" title="Edit this row!">
        <Button type="ghost">
          <EditOutlined />
        </Button>
      </Tooltip>
    ),
    width: 70,
  },
  {
    title: '',
    dataIndex: 'delete',
    key: 'delete',
    fixed: 'right',
    render: () => (
      <Tooltip placement="topRight" title="Delete this row!">
        <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
          <Button type="ghost">
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      </Tooltip>
    ),
    width: 70,
  },
];
