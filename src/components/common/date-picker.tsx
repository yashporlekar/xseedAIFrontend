import React from 'react';
import { DatePicker } from 'antd';
import '../../themes/default/css/global.css';

interface DynamicDatePickerProps {
  placeholder?: string;
  [key: string]: any;
}

interface CommonDatePickerProps extends DynamicDatePickerProps {
  className?: string;
}

const CommonDatePicker: React.FC<CommonDatePickerProps> = ({ className = "input-type", ...datePickerProps }) => {
  return (
    <DatePicker
      className={className}
      {...datePickerProps}
    />
  );
};

export default CommonDatePicker;
