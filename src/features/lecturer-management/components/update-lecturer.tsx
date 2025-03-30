import { EditOutlined } from '@ant-design/icons';
import { useNotification } from '@app/contexts/NotificationProvider';
import { EMAIL_PATTERN, PHONE_NUMBER_PATTERN } from '@app/shared/conts/pattern.const';
import { Lecturer } from '@app/shared/types/api.type';
import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { useUpdateLecturer } from '../api/update-lecturer';
import { useSetFormValues } from '@app/hooks';

type UpdateLecturerProps = {
  lecturer: Lecturer;
};

const UpdateLecturer = ({ lecturer }: UpdateLecturerProps) => {
  const [form] = Form.useForm();
  const { showNotification } = useNotification();

  const [open, setOpen] = useState<boolean>(false);

  const updateLecturerMutation = useUpdateLecturer({
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
      updateLecturerMutation.mutate({ payload: formValues, id: lecturer.id });
    } catch (error) {
      console.error(error);
    }
  };

  useSetFormValues(open, form, lecturer);

  return (
    <>
      <Button icon={<EditOutlined />} type='text' size='large' onClick={() => setOpen(true)} />

      <Modal
        centered
        destroyOnClose
        width={700}
        title='Cập Nhật Giảng Viên'
        cancelText='Hủy'
        okText='Cập nhật'
        okButtonProps={{ htmlType: 'button', autoFocus: true }}
        open={open}
        onOk={handleUpdateLectuer}
        onCancel={() => setOpen(false)}
        modalRender={(dom) => (
          <Form layout='vertical' form={form} clearOnDestroy size='large' initialValues={lecturer}>
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

export default UpdateLecturer;
