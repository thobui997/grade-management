import { BookOutlined, ContactsOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router';

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0
};

const menuStyle: React.CSSProperties = {
  flex: 1,
  overflow: 'auto',
  height: 'calc(100vh - 64px)',
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable'
};

const items: MenuProps['items'] = [
  {
    key: '/quan-ly-hoc-ky',
    icon: React.createElement(BookOutlined),
    label: <NavLink to='quan-ly-hoc-ky'>Quản lý học kỳ</NavLink>
  },
  {
    key: '/quan-ly-sinh-vien',
    icon: React.createElement(UserOutlined),
    label: <NavLink to='quan-ly-sinh-vien'>Quản lý sinh viên</NavLink>
  },
  {
    key: '/quan-ly-giang-vien',
    icon: React.createElement(ContactsOutlined),
    label: <NavLink to='quan-ly-giang-vien'>Quản lý giảng viên</NavLink>
  },
  {
    key: '/quan-ly-nguoi-dung',
    icon: React.createElement(UsergroupAddOutlined),
    label: <NavLink to='quan-ly-nguoi-dung'>Quản lý người dùng</NavLink>
  }
];

const Logo = () => {
  return (
    <div
      style={{
        height: '32px',
        margin: '16px',
        background: 'rgba(255, 255, 255, .2)',
        borderRadius: '6px'
      }}
    />
  );
};

const Sidebar = () => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  return (
    <Sider style={siderStyle} width={250}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Logo />
        <Menu
          style={menuStyle}
          theme='dark'
          mode='inline'
          selectedKeys={[selectedKey]}
          items={items}
          onSelect={({ key }) => setSelectedKey(key)}
        />
      </div>
    </Sider>
  );
};

export default Sidebar;
