import React, { useEffect, useCallback } from 'react';
import { useRef } from 'react';
import InputType from './inputType';

interface InputProps {
  value: any;
  type: InputType;
  editProps?: {
    [key: string]: any;
  };
  editClassProp: { className: string } | {};
  options: any[];
  valueKey: string;
  labelKey: string;
  handleChange: (value: any) => void;
  handleKeyDown: React.KeyboardEventHandler;
  handleBlur: React.FocusEventHandler;
}

const Input: React.FC<InputProps> = ({
  value,
  type,
  editProps,
  editClassProp,
  options,
  valueKey,
  labelKey,
  handleChange,
  handleKeyDown,
  handleBlur,
}) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const getRef = useCallback(() => {
    if (type === InputType.Select) {
      return selectRef;
    }
    if (type === InputType.TextArea) {
      return textareaRef;
    }
    return inputRef;
  }, [type]);

  useEffect(() => {
    const controlRef = getRef();

    if (controlRef.current) {
      setTimeout(function () {
        if (controlRef.current) {
          controlRef.current.focus();
          if (controlRef === inputRef || controlRef === textareaRef) {
            controlRef.current.select();
          }
        }
      }, 10);
    }
  }, [getRef]);

  if (type === InputType.Select) {
    return (
      <select
        {...editProps}
        {...editClassProp}
        ref={selectRef}
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      >
        {options.map((option: any) => (
          <option key={option[valueKey]} value={option[valueKey]}>
            {option[labelKey]}
          </option>
        ))}
      </select>
    );
  }

  if (type === InputType.TextArea) {
    return (
      <textarea
        {...editProps}
        {...editClassProp}
        ref={textareaRef}
        value={value.toString()}
        onChange={(event) => handleChange(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
    );
  }

  return (
    <input
      {...editProps}
      {...editClassProp}
      ref={inputRef}
      type={type}
      value={value}
      onChange={(event) => handleChange(event.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    />
  );
};

export default Input;
