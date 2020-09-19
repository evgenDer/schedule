import React, { useState } from 'react';
import InlineEdit from '../InlineEdit/InlineEdit';
import InputType from '../InlineEdit/inputType';

type EditBlockType = {
  value: string;
  isMentor: boolean;
  onChange: (value: string) => void;
};

const EditBlockType: React.FC<EditBlockType> = ({ value, onChange, isMentor }) => {
  return isMentor ? <InlineEdit value={value.trim()} onChange={onChange} type={InputType.TextArea} /> : <p>{value}</p>;
};

export default EditBlockType;
