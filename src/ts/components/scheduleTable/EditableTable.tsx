import React, { useContext, useState, useEffect, useRef, RefObject, Component } from 'react';
import {
  Table,
  Input,
  Button,
  Form,
  InputNumber,
  DatePicker,
  TimePicker,
  notification,
  Tooltip,
  message,
  Select,
  Tag,
  Modal,
} from 'antd';
import { IData, TableDataColumns, ITimeZone } from '../../constants/types-interfaces';
import { ColumnType } from 'antd/es/table';
import moment, { Moment } from 'moment-timezone';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import { getDateString, getTimeString } from '../../helpers/dataHelper';
import { CalendarOutlined, DeleteOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { SelectValue } from 'antd/lib/select';
import { DEFAULT_TABLE_DATA } from '../../constants/defaultValues';
import Services from '../../services/services';
import ScheduleList from '../schedule-list/shedule-list';
import * as Storage from '../../helpers/storage';
import { findTask } from '../../helpers/dataHelper';
import CalendarSchedule from '../CalendarSchedule/CalendarSchedule';

const { Option } = Select;

const EditableContext = React.createContext<any>(undefined);

type EditableRowProps = {
  index: number;
};

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      component={false}
      initialValues={{
        time: moment('00:00', 'HH:mm'),
      }}
    >
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

type EditableCellProps = {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: ColumnType<IData>;
  handleSave: (record: IData) => void;
};

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<Input>();
  const form = useContext(EditableContext);
  const currentKey = Object.keys(record).find((key) => key === dataIndex) || '';

  const taskTypesValues = Storage.getServerTaskTypes();

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing((prev) => !prev);
    Object.entries(record).forEach(([key, value]) => {
      if (!['time', 'date', 'typeId'].includes(key)) {
        if (key === currentKey) {
          form.setFieldsValue({ [dataIndex]: value });
        }
      }
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      const savingData = { ...record, ...values };
      const { time, date, typeId: type } = savingData;

      savingData.date = typeof date === 'string' ? date : getDateString(date.format());
      savingData.time = typeof time === 'string' ? time : getTimeString(time.format());
      savingData.datetime = moment(`${savingData.date}T${savingData.time}:00`).format();

      if (!taskTypesValues.includes(type)) {
        const res = taskTypesValues.find(({ name }) => name === type);
        savingData.typeId = res !== undefined ? res.id : findTask(type).id;
      }

      handleSave(savingData);
    } catch (errInfo) {
      notification.open({
        message: 'Saving failed!',
      });
    }
  };

  let childNode = children;

  if (editable) {
    let input: JSX.Element = <></>;
    const inputProps = {
      ref: inputRef as React.RefObject<Input>,
      onPressEnter: save,
      onBlur: save,
    };

    switch (currentKey) {
      case 'maxMark':
        input = <InputNumber {...inputProps} min={0} />;
        break;
      case 'time':
        input = (
          <TimePicker ref={inputRef as React.RefObject<Input>} format={'HH:mm'} onChange={save} allowClear={false} />
        );
        break;
      case 'date':
        input = (
          <DatePicker
            ref={inputRef as RefObject<Component<PickerProps<Moment>, any, any>>}
            onChange={save}
            allowClear={false}
          />
        );
        break;
      case 'typeId':
        input = (
          <Select
            placeholder="Select task type"
            ref={(inputRef as unknown) as React.RefObject<Select<SelectValue>>}
            onChange={save}
          >
            {taskTypesValues.map(({ id, name, color, fontColor }) => (
              <Option key={id} value={name}>
                <Tag color={color} style={{ color: fontColor }}>
                  {name}
                </Tag>
              </Option>
            ))}
          </Select>
        );
        break;
      default:
        input = <Input {...inputProps} />;
        break;
    }

    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        {input}
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = {
  data: IData[];
  setData: (newData: IData[]) => void;
  columns: TableDataColumns;
  scroll: { x: number };
  sticky: boolean;
  title: () => JSX.Element;
  timezone: ITimeZone;
};

const EditableTable: React.FC<EditableTableProps> = ({ data, setData, columns, scroll, sticky, title, timezone }) => {
  const [count, setCount] = useState(data.length);
  const [isListPreviewVisible, setIsListPreviewVisible] = useState(false);
  const [isCalendarPreviewVisible, setIsCalendarPreviewVisible] = useState(false);

  const handleDelete = (key: string) => {
    setData([...data].filter((item) => item.key !== key));
    Services.deleteEvent(key);
    message.success('Deleted');
  };

  const handleAdd = () => {
    const datetime = moment().tz(timezone.name).format();
    const newData: IData = {
      ...DEFAULT_TABLE_DATA,
      key: count.toString(),
      datetime: datetime,
      date: getDateString(datetime),
      time: getTimeString(datetime),
      place: 'Place',
      broadcastUrl: 'URL',
      comment: 'Your comment',
    };
    setData([...data, newData]);
    setCount((prev) => prev + 1);
  };

  const handleSave = (row: IData) => {
    const newData = [...data];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setData(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const newColumns = columns.map((col) => {
    if (col.key === 'name') {
      col = {
        ...col,
        render: (name) => name,
      };
    }
    if (col.key === 'deleteRow') {
      col = {
        ...col,
        width: 70,
        render: (_: any, { key }: IData) => (
          <Tooltip placement="topRight" title="Delete this row!">
            <Button type="ghost" onClick={handleDelete.bind(null, key)}>
              <DeleteOutlined style={{ color: 'red' }} />
            </Button>
          </Tooltip>
        ),
      };
    }
    return {
      ...col,
      onCell: (record: IData) => ({
        record,
        editable: true,
        dataIndex: col.key,
        title: col.title,
        handleSave: handleSave,
      }),
    } as ColumnType<IData>;
  });

  return (
    <React.Fragment>
      <Table<IData>
        components={data.length ? components : {}}
        rowClassName={() => 'editable-row'}
        dataSource={data}
        columns={newColumns}
        sticky={sticky}
        title={title}
        scroll={scroll}
        footer={() => (
          <div className="editable-table__footer">
            <Button onClick={handleAdd} type="primary">
              Add a row
            </Button>
            <Button type="default" onClick={setIsListPreviewVisible.bind(null, true)}>
              <UnorderedListOutlined /> List preview
            </Button>
            <Button type="default" onClick={setIsCalendarPreviewVisible.bind(null, true)}>
              <CalendarOutlined />
              Calendar preview
            </Button>
          </div>
        )}
      />
      <div className="edit-preview">
        {isListPreviewVisible ? (
          <Modal className="modal" visible={true} onCancel={setIsListPreviewVisible.bind(null, false)} footer={[]}>
            <ScheduleList events={data} />
          </Modal>
        ) : null}
        {isCalendarPreviewVisible ? (
          <Modal className="modal" visible={true} onCancel={setIsCalendarPreviewVisible.bind(null, false)} footer={[]}>
            <CalendarSchedule dataSource={data} />
          </Modal>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default EditableTable;
