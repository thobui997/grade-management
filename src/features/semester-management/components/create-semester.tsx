import { PlusOutlined } from '@ant-design/icons';
import { useNotification } from '@app/contexts/NotificationProvider';
import { Button, Flex, Form, Input, InputNumber, Modal, Select } from 'antd';
import { useState } from 'react';
import { useCreateSemester } from '../api/create-semester';

const CreateSemester = () => {
  const [form] = Form.useForm();
  const { showNotification } = useNotification();

  const [open, setOpen] = useState<boolean>(false);

  const createSemesterMutation = useCreateSemester({
    mutationConfig: {
      onSuccess: () => {
        showNotification('success', 'Thêm học kỳ thành công');
        setOpen(false);
      }
    }
  });

  const handleAddNewCourse = async () => {
    try {
      const formValues = await form.validateFields();
      createSemesterMutation.mutate({ ...formValues, term: +formValues.term });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button type='primary' icon={<PlusOutlined />} size='large' onClick={() => setOpen(true)}>
        Thêm Học Kỳ
      </Button>

      <Modal
        centered
        destroyOnClose
        width={700}
        title='Thêm Mới Học Kỳ'
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
          name='name'
          label='Tên học kỳ'
          rules={[{ required: true, message: 'Tên học kỳ là thông tin bắt buộc' }]}
        >
          <Input allowClear placeholder='Nhập tên học kỳ' />
        </Form.Item>

        <Flex gap={16}>
          <Form.Item
            style={{ flexBasis: '50%' }}
            label='Chọn học kỳ'
            name='term'
            rules={[{ required: true, message: 'Kỳ học là thông tin bắt buộc' }]}
          >
            <Select placeholder='Chọn học kỳ'>
              <Select.Option value='1'>Kỳ 1</Select.Option>
              <Select.Option value='2'>Kỳ 2</Select.Option>
              <Select.Option value='3'>Kỳ 3</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            style={{ flexBasis: '50%' }}
            name='startYear'
            label='Năm bắt đầu'
            rules={[{ required: true, message: 'Năm bắt đầu là thông tin bắt buộc' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={2000}
              max={2100}
              placeholder='Nhập năm bắt đầu'
              controls={false}
            />
          </Form.Item>
        </Flex>
      </Modal>
    </>
  );
};

export default CreateSemester;
