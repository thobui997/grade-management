import { PlusOutlined } from '@ant-design/icons';
import { useNotification } from '@app/contexts/NotificationProvider';
import { EMAIL_PATTERN, PHONE_NUMBER_PATTERN } from '@app/core/conts/pattern.const';
import { Button, Flex, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { useCreateStudent } from '../api/create-student';

const CreateStudent = () => {
  const [form] = Form.useForm();
  const { showNotification } = useNotification();

  const [open, setOpen] = useState<boolean>(false);

  const createStudentMutation = useCreateStudent({
    mutationConfig: {
      onSuccess: () => {
        showNotification('success', 'Thêm sinh viên thành công');
        setOpen(false);
      }
    }
  });

  const handleAddNewCourse = async () => {
    try {
      const formValues = await form.validateFields();
      createStudentMutation.mutate(formValues);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Button type='primary' icon={<PlusOutlined />} size='large' onClick={() => setOpen(true)}>
        Thêm Sinh Viên
      </Button>

      <Modal
        centered
        destroyOnClose
        width={700}
        title='Thêm Mới Sinh Viên'
        cancelText='Hủy'
        okText='Thêm mới'
        okButtonProps={{ htmlType: 'button', autoFocus: true }}
        open={open}
        onOk={handleAddNewCourse}
        onCancel={() => setOpen(false)}
        modalRender={(dom) => (
          <Form layout='vertical' form={form} clearOnDestroy size='large'>
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name='studentCode'
          label='Mã sinh viên'
          rules={[{ required: true, message: 'Mã sinh viên là thông tin bắt buộc' }]}
        >
          <Input allowClear placeholder='Nhập mã sinh viên' />
        </Form.Item>

        <Flex gap={16}>
          <Form.Item
            style={{ flexBasis: '50%' }}
            name='lastName'
            label='Họ'
            rules={[{ required: true, message: 'Họ là thông tin bắt buộc' }]}
          >
            <Input allowClear placeholder='Nhập họ' />
          </Form.Item>

          <Form.Item
            style={{ flexBasis: '50%' }}
            name='firstName'
            label='Tên'
            rules={[{ required: true, message: 'Tên là thông tin bắt buộc' }]}
          >
            <Input allowClear placeholder='Nhập tên' />
          </Form.Item>
        </Flex>

        <Form.Item
          name='email'
          label='Email'
          rules={[
            { required: true, message: 'Email là thông tin bắt buộc' },
            { pattern: EMAIL_PATTERN, message: 'Email không hợp lệ' }
          ]}
        >
          <Input allowClear placeholder='Nhập email' />
        </Form.Item>

        <Form.Item
          name='phone'
          label='Số điện thoại'
          rules={[
            { required: true, message: 'Số điện thoại là thông tin bắt buộc' },
            { pattern: PHONE_NUMBER_PATTERN, message: 'Số điện thoại không hợp lệ' }
          ]}
        >
          <Input allowClear placeholder='Nhập số điện thoại' />
        </Form.Item>
      </Modal>
    </>
  );
};

export default CreateStudent;
