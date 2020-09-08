import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useMachine } from '@xstate/react';
import getInlineEditMachine from './machine';
import Input from './Input';
import InputType from './inputType';
import ReactMarkdown from 'react-markdown';

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
  //==========================
  // XState Machine
  // =========================
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

  //==========================
  // Send SAVED event when a
  // new value is received
  // =========================
  const isFirstRun = useRef(true);

  useEffect(() => {
    // Prevent triggering SAVED
    // on first render
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    // Trigger it on value changes
    send({ type: 'SAVED', value });
  }, [value]);

  //==========================
  // Event Handlers
  // =========================

  const handleChange = (value: any) => {
    send({ type: 'CHANGE', value: value });
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
  //==========================
  // Format View Value
  // =========================
  let viewValue: any = current.context.value;

  // If Select => get label
  if (type === InputType.Select) {
    const valueOption = options.find((option: any) => option[valueKey] + '' === current.context.value);

    if (valueOption) {
      viewValue = valueOption[labelKey];
    }
  }

  // If format function, apply
  if (format) {
    viewValue = format(viewValue);
  }

  // If TextArea and showNewLine, do it
  if (type === InputType.TextArea && showNewLines) {
    viewValue = viewValue.split('\n').map((item: string, key: number) => {
      return <ReactMarkdown source={item} key={key.toString()} />;
    });
  }

  //==========================
  // Render
  // =========================
  return (
    <>
      {(current.value === 'view' ||
        current.value === 'loading' ||
        current.value === 'saved' ||
        current.value === 'error') && (
        <span onClick={() => send('CLICK')} onFocus={() => send('FOCUS')}>
          {render ? render(viewValue) : viewValue}
        </span>
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
