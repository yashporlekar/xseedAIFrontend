import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
}

const CommonCheckbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  const handleChange = (e: CheckboxChangeEvent) => {
    onChange(e.target.checked);
  };

  return (
    <Checkbox checked={checked} onChange={handleChange}>
      {label}
    </Checkbox>
  );
};

export default CommonCheckbox;