export const COMMON_COLS = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: string, b: string) => (a > b ? -1 : 1),
  },
  {
    title: 'Place',
    dataIndex: 'place',
    key: 'place',
  },
  {
    title: 'Broadcast Url',
    dataIndex: 'broadcastUrl',
    key: 'broadcastUrl',
  },
  {
    title: 'Organizer',
    dataIndex: 'organizer',
    key: 'organizer',
  },
  {
    title: 'Mark',
    dataIndex: 'mark',
    key: 'mark',
    sorter: (a: number, b: number) => a - b,
  },
  {
    title: 'Max Mark',
    dataIndex: 'maxMark',
    key: 'maxMark',
    sorter: (a: number, b: number) => a - b,
  },
];

export const STUDENT_COLS = [
  {
    title: 'Complited',
    dataIndex: 'isComplited',
    key: 'isComplited',
  },
];

export const ORGANIZER_COLS = [
  {
    title: 'Action',
    dataIndex: 'delete',
    key: 'delete',
  },
];
