import React from 'react';
import { Select } from 'antd';
import typesOfUsers from '../typesOfUsers';

const SelectComponent: React.FunctionComponent<{ values: string[], handler: () => void }> = ({ values, handler }) => {
    const options = values.map(type => <Select.Option value={type}>{type}</Select.Option>)
    return (
    <Select 
        defaultValue = {values[0]}
        onChange = {handler}
    >
     {options}   
    </Select>)
}

export default SelectComponent;
