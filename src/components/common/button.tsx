import React from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import '../../themes/default/css/global.css';

interface CustomButtonProps extends ButtonProps {
  label?: string;
  isSubmit?: boolean;
  type?: "link" | "text" | "default" | "primary" | "dashed" | undefined ;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, isSubmit, type, onClick, ...ButtonProps }) => {
  const buttonType = isSubmit ? 'submit' : 'button';

  return (
      <Button className="button" type={type} htmlType={buttonType} onClick={onClick} {...ButtonProps}>
        {label}
      </Button>
  );
};

export default CustomButton;
