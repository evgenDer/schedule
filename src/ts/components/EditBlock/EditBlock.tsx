import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import InlineEdit from '../InlineEdit/InlineEdit';
import InputType from '../InlineEdit/inputType';

type EditBlockType = {
  value: string;
  isMentor: boolean;
  onChange: (value: string) => void;
};

const EditBlockType: React.FC<EditBlockType> = ({ value, onChange, isMentor }) => {
  return isMentor ? <InlineEdit value={value.trim()} onChange={onChange} type={InputType.TextArea} /> : <ReactMarkdown source={value}/>;
};

export default EditBlockType;
