import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '@app/contexts/AuthProvider';
import { Button, Form, Input } from 'antd';
import './login-form.scss';

const LoginForm = () => {
  const [form] = Form.useForm();
  const auth = useAuth();

  const handleLogin = () => {
    form.validateFields().then((values) => {
      auth.loginAction({ email: values.username, password: values.password });
    });
  };

  return (
    <div id='Login'>
      <div className='login-container'>
        <h2>Đăng Nhập</h2>

        <Form form={form} name='loginForm' layout='vertical' autoComplete='off'>
          <Form.Item
            label='Tên đăng nhập'
            name='username'
            rules={[{ required: true, message: 'Tên đăng nhập là thông tin bắt buộc!' }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              size='large'
              placeholder='Nhập tên đăng nhập'
              allowClear
            />
          </Form.Item>

          <Form.Item
            label='Mật khẩu'
            name='password'
            rules={[{ required: true, message: 'Mật khẩu là thông tin bắt buộc!' }]}
          >
            <Input.Password size='large' placeholder='Nhập mật khẩu' allowClear />
          </Form.Item>

          <Form.Item label={null}>
            <Button type='primary' size='large' htmlType='button' style={{ width: '100%' }} onClick={handleLogin}>
              Đăng Nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
