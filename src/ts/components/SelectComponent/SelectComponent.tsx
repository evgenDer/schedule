import React, {useState} from 'react';
import { Select } from 'antd';

const SelectComponent: React.FunctionComponent<{ values: string[], handler: (e) => void }> = ({ values, handler }) => {
    const options = values.map(type => <Select.Option value={type}>{type}</Select.Option>);
    const [value, setValue] = useState(values[0]);
    const changeHandler: (e) => void = (e) => {
        handler(e);
        setValue(e.target.value);
    }
    return (
    <Select 
        defaultValue = {value}
        onChange = {changeHandler}
    >
     {options}   
    </Select>)
}

export default SelectComponent;
