import { PlusOutlined } from '@ant-design/icons';
import { useNotification } from '@app/contexts/NotificationProvider';
import { EMAIL_PATTERN, PHONE_NUMBER_PATTERN } from '@app/core/conts/pattern.const';
import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { useCreateLecturer } from '../api/create-lecturer';

const CreateLecturer = () => {
  const [form] = Form.useForm();
  const { showNotification } = useNotification();

  const [open, setOpen] = useState<boolean>(false);

  const createLecturerMutation = useCreateLecturer({
    mutationConfig: {
      onSuccess: () => {
        showNotification('success', 'Cập nhật giảng viên thành công');
        setOpen(false);
      }
    }
  });

  const handleUpdateLectuer = async () => {
    try {
      const formValues = await form.validateFields();
      createLecturerMutation.mutate(formValues);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Button type='primary' icon={<PlusOutlined />} size='large' onClick={() => setOpen(true)}>
        Thêm Giảng Viên
      </Button>

      <Modal
        centered
        destroyOnClose
        width={700}
        title='Thêm mới Giảng Viên'
        cancelText='Hủy'
        okText='Cập nhật'
        okButtonProps={{ htmlType: 'button', autoFocus: true }}
        open={open}
        onOk={handleUpdateLectuer}
        onCancel={() => setOpen(false)}
        modalRender={(dom) => (
          <Form layout='vertical' form={form} clearOnDestroy size='large'>
            {dom}
          </Form>
        )}
      >
        <Form.Item name='name' label='Họ và tên' rules={[{ required: true, message: 'Họ tên là thông tin bắt buộc' }]}>
          <Input allowClear placeholder='Nhập họ và tên' />
        </Form.Item>

        <Form.Item
          name='department'
          label='Phòng ban'
          rules={[{ required: true, message: 'Phòng ban là thông tin bắt buộc' }]}
        >
          <Input allowClear placeholder='Nhập tên phòng ban' />
        </Form.Item>

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

export default CreateLecturer;
