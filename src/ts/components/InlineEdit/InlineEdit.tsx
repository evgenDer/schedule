import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useMachine } from '@xstate/react';
import getInlineEditMachine from './machine';
import Input from './Input';
import InputType from './inputType';
import ReactMarkdown from 'react-markdown';
import { Tooltip } from 'antd';

interface InlineEditProps {
  value: string;
  onChange: (value: string) => void;
  type?: InputType;
  format?: (value: string) => string;
  render?: (value: string) => React.ReactElement;
  validate?: (value: string) => boolean;
  isDisabled?: boolean;
  allowEditWhileLoading?: boolean;
  optimisticUpdate?: boolean;
  saveTimeout?: number;
  savedDuration?: number;
  errorDuration?: number;
  editProps?: {
    [key: string]: any;
  };
  viewClass?: string;
  editClass?: string;
  disabledClass?: string;
  loadingClass?: string;
  invalidClass?: string;
  savedClass?: string;
  errorClass?: string;
  showNewLines?: boolean;
  options?: any[];
  valueKey?: string;
  labelKey?: string;
}

const InlineEdit: React.FC<InlineEditProps> = ({
  value,
  onChange,
  type = InputType.Text,
  format,
  render,
  validate,
  isDisabled = false,
  allowEditWhileLoading = false,
  optimisticUpdate = true,
  saveTimeout = 2000,
  savedDuration = 700,
  errorDuration = 1000,
  editProps,
  viewClass,
  editClass,
  disabledClass,
  loadingClass,
  invalidClass,
  savedClass,
  errorClass,
  showNewLines = true,
  options = [],
  valueKey = 'value',
  labelKey = 'label',
}) => {
  const [current, send] = useMachine(
    getInlineEditMachine({
      value,
      isDisabled,
      allowEditWhileLoading,
      optimisticUpdate,
      validate,
      onChange,
      saveTimeout,
      savedDuration,
      errorDuration,
    })
  );

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    send({ type: 'SAVED', value });
  }, [value]);


  const handleChange = (value: any) => {
    send({ type: 'CHANGE', value: value })
    if (type === InputType.Select) {
      send('ENTER');
    }
  };

  const handleBlur = () => {
    send('BLUR');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 && type !== InputType.TextArea) {
      send('ENTER');
    } else if (event.keyCode === 27) {
      send('ESC');
    }
  };

  let viewValue: any = current.context.value;

  if (type === InputType.Select) {
    const valueOption = options.find((option: any) => option[valueKey] + '' === current.context.value);

    if (valueOption) {
      viewValue = valueOption[labelKey];
    }
  }

  if (format) {
    viewValue = format(viewValue);
  }

  if (type === InputType.TextArea && showNewLines) {
    viewValue = viewValue.split('\n').map((item: string, key: number) => {
      return <ReactMarkdown source={item} key={key.toString()} />;
    });
  }

  return (
    <>
      {(current.value === 'view' ||
        current.value === 'loading' ||
        current.value === 'saved' ||
        current.value === 'error') && (
        <>
          <span className="inline-edit" onClick={() => send('CLICK')} onFocus={() => send('FOCUS')}>
            <Tooltip placement="right" title={'Click to edit'} color={'blue'}>
              {render ? render(viewValue) : viewValue}
            </Tooltip>
          </span>
        </>
      )}
      {current.value === 'edit' && (
        <Input
          type={type}
          value={current.context.newValue}
          editProps={editProps}
          editClassProp={'editClassProp'}
          options={options}
          valueKey={valueKey}
          labelKey={labelKey}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
          handleBlur={handleBlur}
        />
      )}
    </>
  );
};

export default InlineEdit;
