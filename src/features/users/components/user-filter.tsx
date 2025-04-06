import { FilterOutlined } from '@ant-design/icons';
import { UserType } from '@app/shared/enums/user-type.enum';
import { Button, Flex, Form, Popover, Select, Space } from 'antd';
import { useState } from 'react';

type UserFilterProps = {
  setRole: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const UserFilter = ({ setRole }: UserFilterProps) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      title='Lọc người dùng'
      placement='bottomLeft'
      trigger='click'
      arrow={false}
      open={open}
      onOpenChange={handleOpenChange}
      content={
        <Space direction='vertical'>
          <Form layout='vertical' size='large' style={{ width: 300 }} form={form}>
            <Form.Item label='Vai trò' name='role'>
              <Select
                allowClear
                placeholder='Chọn vai trò người dùng'
                options={[
                  {
                    value: UserType.ADMIN,
                    label: 'ADMIN'
                  },
                  {
                    value: UserType.TEACHER,
                    label: 'TEACHER'
                  },
                  {
                    value: UserType.STUDENT,
                    label: 'STUDENT'
                  }
                ]}
              />
            </Form.Item>
          </Form>

          <Flex justify='end' gap={8}>
            <Button onClick={hide}>Đóng</Button>
            <Button
              type='primary'
              onClick={() => {
                setRole(form.getFieldValue('role'));
                hide();
              }}
            >
              Áp dụng
            </Button>
          </Flex>
        </Space>
      }
    >
      <Button icon={<FilterOutlined />} size='large'>
        Lọc
      </Button>
    </Popover>
  );
};

export default UserFilter;
