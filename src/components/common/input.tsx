import React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import  '../../themes/default/css/global.css'

interface InputFieldProps extends InputProps {
  label?: string;
  type?: 'text' | 'password' | 'email' | 'number' ;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ label,type,placeholder, ...inputProps }) => {
  return (
      <Input className="input-type" type={type} placeholder={placeholder} {...inputProps} />
  );
};

export default InputField;
