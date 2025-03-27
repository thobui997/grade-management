import { Button, Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from './sidebar';
import { LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '@app/contexts/AuthProvider';

const { Header, Content } = Layout;

const headerStyle: React.CSSProperties = {
  background: '#fff',
  padding: 0,
  position: 'sticky',
  top: 0,
  width: '100%',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  display: 'flex',
  alignItems: 'center'
};

const AppLayout = () => {
  const auth = useAuth();

  return (
    <Layout hasSider>
      <Sidebar />

      <Layout>
        <Header style={headerStyle}>
          <Button
            type='text'
            icon={<LogoutOutlined />}
            style={{ marginLeft: 'auto' }}
            size='large'
            onClick={() => auth.logOut()}
          >
            Đăng xuất
          </Button>
        </Header>

        <Content style={{ margin: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
