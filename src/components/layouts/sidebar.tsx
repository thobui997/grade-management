import {
  BookOutlined,
  ContactsOutlined,
  ContainerOutlined,
  UsergroupAddOutlined,
  UserOutlined
} from '@ant-design/icons';
import { paths } from '@app/config/paths';
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
    key: paths.app.semesters.path,
    icon: React.createElement(BookOutlined),
    label: <NavLink to={paths.app.semesters.path}>Quản lý học kỳ</NavLink>
  },
  {
    key: paths.app.courses.path,
    icon: React.createElement(ContainerOutlined),
    label: <NavLink to={paths.app.courses.path}>Quản lý môn học</NavLink>
  },
  {
    key: paths.app.students.path,
    icon: React.createElement(UserOutlined),
    label: <NavLink to={paths.app.students.path}>Quản lý sinh viên</NavLink>
  },
  {
    key: paths.app.lecturers.path,
    icon: React.createElement(ContactsOutlined),
    label: <NavLink to={paths.app.lecturers.path}>Quản lý giảng viên</NavLink>
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

  if (location.pathname !== selectedKey) {
    setSelectedKey(location.pathname);
  }

  return (
    <Sider style={siderStyle} width={250}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Logo />
        <Menu
          style={menuStyle}
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[selectedKey]}
          selectedKeys={[selectedKey]}
          items={items}
          onSelect={({ key }) => setSelectedKey(key)}
        />
      </div>
    </Sider>
  );
};

export default Sidebar;
