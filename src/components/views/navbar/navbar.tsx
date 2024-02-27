import React from 'react';
import { Layout, Menu } from 'antd';
import xseed from '../../../assets/xseed.svg';
import bell from '../../../assets/bell.svg';
import '../../../themes/default/css/navbar.css';

const { Header } = Layout;

const NavigationBar: React.FC = () => {
  return (
    <Header className='common-navbar'>
      <img src={xseed} alt="Logo" />
      <Menu className='menu' theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          Dashboard
        </Menu.Item>
        <Menu.Item key="2">
          Jobs
        </Menu.Item>
        <Menu.Item key="3">
          Candidates
        </Menu.Item>
        <Menu.Item key="4">
          Source
        </Menu.Item>
        <Menu.Item key="5">
          Reports
        </Menu.Item>
      </Menu>
      <img className='bell-icon' src={bell} alt="Logo" />

      
    </Header>
  );
};

export default NavigationBar;
