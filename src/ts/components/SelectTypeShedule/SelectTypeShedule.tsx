import { Select, Radio } from 'antd';
import { TableOutlined, UnorderedListOutlined, CalendarOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { SheduleType } from './SheduleType';
import React from 'react';
import { RadioChangeEvent } from 'antd/lib/radio/interface';

const { Option } = Select;

type TypeSelectDateView = {
  type: SheduleType;
  setType: (type: SheduleType) => void;
};

const SelectDataView: React.FC<TypeSelectDateView> = ({ type, setType }) => {
  const handleChange = (event: RadioChangeEvent) => {
    setType(event.target.value);
  };

  return (
    <Radio.Group value={type} onChange={handleChange}>
      <Radio.Button value={SheduleType.Table}>
        <TableOutlined />
      </Radio.Button>
      <Radio.Button value={SheduleType.List}>
        <UnorderedListOutlined />
      </Radio.Button>
      <Radio.Button value={SheduleType.Calendar}>
        <CalendarOutlined />
      </Radio.Button>
    </Radio.Group>
  );
};

export default SelectDataView;
