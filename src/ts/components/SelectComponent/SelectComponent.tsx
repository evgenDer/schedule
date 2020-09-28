import React, { useState, useMemo } from 'react';
import { Select } from 'antd';

const SelectComponent: React.FunctionComponent<{ values: string[]; handler: (value: string) => void }> = ({
  values,
  handler,
}) => {
  const options = useMemo(
    () =>
      values.map((type) => (
        <Select.Option value={type} key={type}>
          {type}
        </Select.Option>
      )),
    [values]
  );
  const [value, setValue] = useState(values[0]);
  const changeHandler: (value: string) => void = (value) => {
    setValue(value);
    handler(value);
  };
  return (
    <Select className={'select-block'} defaultValue={value} onSelect={changeHandler}>
      {options}
    </Select>
  );
};

export default SelectComponent;
