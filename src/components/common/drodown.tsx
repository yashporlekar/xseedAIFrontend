import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import '../../themes/default/css/global.css';

const { Option } = Select;

interface DropdownProps extends SelectProps<any> {
  options: Array<{ value: string; label: React.ReactNode }>;
}

const CommonDropdown: React.FC<DropdownProps> = ({ options, className, ...selectProps }) => {
  return (
    <Select className='dropdown' placeholder='Select' {...selectProps}>
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default CommonDropdown;
