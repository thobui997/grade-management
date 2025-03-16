import { useNotification } from '@app/contexts/NotificationProvider';
import { EMAIL_PATTERN, PHONE_NUMBER_PATTERN } from '@app/core/conts/pattern.const';
import { BaseModalProps } from '@app/core/models/base-modal.type';
import { BaseResponse } from '@app/core/models/base.type';
import StudentServices from '@app/services/student/student.service';
import { Student, StudentCreatedRequest } from '@app/services/student/student.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Flex, Form, Input, Modal } from 'antd';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

const StudentModal = ({ open, data, type, handleCancel }: BaseModalProps<Student>) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { showNotification } = useNotification();

  const mutation = useMutation({
    mutationFn: (payload: StudentCreatedRequest) => {
      return type === 'create'
        ? StudentServices.createStudent(payload)
        : StudentServices.updateStudent(payload, data?.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      showNotification?.(
        'success',
        type === 'create' ? 'Thêm mới sinh viên thành công' : 'Cập nhật sinh viên thành công'
      );
      handleCancel?.();
    },
    onError: (error: AxiosError<BaseResponse<Student>>) => {
      showNotification?.('error', error.response?.data.meta.message || 'Có lỗi xảy ra');
    }
  });

  const handleAddNewStudent = async () => {
    try {
      const formValues = await form.validateFields();
      mutation.mutate(formValues);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (type === 'update') {
      form.setFieldsValue(data);
    }
  }, [type]);

  return (
    <>
      <Modal
        centered
        destroyOnClose
        title={type === 'create' ? 'Thêm Mới Sinh Viên' : 'Cập Nhật Sinh Viên'}
        cancelText='Hủy'
        okText={type === 'create' ? 'Thêm mới' : 'Cập nhật'}
        okButtonProps={{ htmlType: 'button', autoFocus: true }}
        open={open}
        onOk={handleAddNewStudent}
        onCancel={handleCancel}
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

export default StudentModal;
