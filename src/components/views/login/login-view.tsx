import React from 'react'
import { useIntl } from 'react-intl';

const LoginView = () => {
  const useintl = useIntl();
  
  return (
    <div>{useintl.formatMessage({ id: "label.login" })}
    </div>
  )
}


export default LoginView