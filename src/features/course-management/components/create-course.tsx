import { PlusOutlined } from '@ant-design/icons';
import { useNotification } from '@app/contexts/NotificationProvider';
import { Button, Flex, Form, Input, InputNumber, Modal, Space } from 'antd';
import { useState } from 'react';
import { useCreateCourse } from '../api/create-course';

const CreateCourse = () => {
  const [form] = Form.useForm();
  const { showNotification } = useNotification();

  const [open, setOpen] = useState<boolean>(false);

  const createCourseMutation = useCreateCourse({
    mutationConfig: {
      onSuccess: () => {
        showNotification('success', 'Thêm môn học thành công');
        setOpen(false);
      }
    }
  });

  const handleAddNewCourse = async () => {
    try {
      const formValues = await form.validateFields();
      createCourseMutation.mutate({
        ...formValues,
        credits: +formValues.credits,
        attendancePercentage: +formValues.attendancePercentage,
        testPercentage: +formValues.testPercentage,
        practicePercentage: +formValues.practicePercentage,
        projectPercentage: +formValues.projectPercentage
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button type='primary' icon={<PlusOutlined />} size='large' onClick={() => setOpen(true)}>
        Thêm Môn Học
      </Button>

      <Modal
        centered
        destroyOnClose
        width={700}
        title='Thêm Mới Môn Học'
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
        <Space direction='vertical' style={{ width: '100%' }} size={0}>
          <h3>Thông tin môn học</h3>

          <Flex gap={16}>
            <Form.Item
              style={{ flexBasis: '50%', width: '100%' }}
              name='courseCode'
              label='Mã môn học'
              rules={[{ required: true, message: 'Mã môn học là thông tin bắt buộc' }]}
            >
              <Input allowClear placeholder='Nhập mã môn học' />
            </Form.Item>
            <Form.Item
              style={{ flexBasis: '50%', width: '100%' }}
              name='name'
              label='Tên môn học'
              rules={[{ required: true, message: 'Tên môn học là thông tin bắt buộc' }]}
            >
              <Input allowClear placeholder='Nhập tên môn học' />
            </Form.Item>
          </Flex>

          <Form.Item
            name='credits'
            label='Số tín chỉ'
            rules={[{ required: true, message: 'Số tín chỉ là thông tin bắt buộc' }]}
          >
            <InputNumber style={{ width: '100%' }} min={1} max={10} placeholder='Nhập số tín chỉ' controls={false} />
          </Form.Item>
        </Space>

        <Space direction='vertical' style={{ width: '100%' }} size={0}>
          <h3>Trọng số điểm</h3>
          <Form.Item
            name='attendancePercentage'
            label='Trọng số điểm chuyên cần (%)'
            rules={[{ required: true, message: 'Trọng số điểm chuyên cần là thông tin bắt buộc' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              max={100}
              step={10}
              placeholder='Nhập trọng số điểm chuyên cần'
              controls={false}
            />
          </Form.Item>
          <Form.Item
            name='testPercentage'
            label='Trọng số điểm kiểm tra (%)'
            rules={[{ required: true, message: 'Trọng số điểm kiểm tra là thông tin bắt buộc' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              max={100}
              step={10}
              placeholder='Nhập trọng số điểm kiểm tra'
              controls={false}
            />
          </Form.Item>
          <Form.Item name='practicePercentage' label='Trọng số điểm thực hành (%)'>
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              max={100}
              step={10}
              placeholder='Nhập trọng số điểm thực hành'
              controls={false}
            />
          </Form.Item>
          <Form.Item name='projectPercentage' label='Trọng số điểm bài tập lớn (%)'>
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              max={100}
              step={10}
              placeholder='Nhập trọng số điểm bài tập lớn'
              controls={false}
            />
          </Form.Item>
        </Space>
      </Modal>
    </>
  );
};

export default CreateCourse;
