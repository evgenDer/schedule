import React from 'react';
import { Select, Tooltip } from 'antd';
import { TIMEZONES } from '../../constants/timezones';
import { ITimeZone } from '../../constants/types-interfaces';

type TimeZoneSelectorProps = {
  timezone: ITimeZone;
  setTimezone: (timezone: ITimeZone) => void;
};

const TimeZoneSelector: React.FC<TimeZoneSelectorProps> = ({ timezone, setTimezone }) => {
  const selectOptions = TIMEZONES.map(({ name }) => (
    <Select.Option key={name} value={name}>
      {name}
    </Select.Option>
  ));

  const handleSelection = (value: string[]) => {
    const tz = TIMEZONES.find(({ name }) => name === value.toString());
    if (tz) {
      setTimezone(tz);
    }
  };

  return (
    <React.Fragment>
      <Tooltip title="Select the timezone" placement="topLeft">
        <Select className="time-zone-selector" defaultValue={[timezone.name]} onChange={handleSelection}>
          {selectOptions}
        </Select>
      </Tooltip>
    </React.Fragment>
  );
};

export default TimeZoneSelector;
