import { PlusOutlined } from '@ant-design/icons';
import { useCourses } from '@app/shared/api/get-courses';
import { useNotification } from '@app/contexts/NotificationProvider';
import { useCreateClass } from '@app/features/class/api/create-class';
import { Button, Flex, Form, Input, Modal, Select, Space } from 'antd';
import { useState } from 'react';
import { useSemsters } from '@app/shared/api/get-semesters';
import { useLecturers } from '@app/shared/api/get-lecturers';
import { useStudents } from '@app/shared/api/get-students';

const CreateClass = () => {
  const [form] = Form.useForm();
  const { showNotification } = useNotification();

  const [open, setOpen] = useState<boolean>(false);

  const coursesQuery = useCourses();
  const semestersQuery = useSemsters();
  const teachersQuery = useLecturers();
  const studentsQuery = useStudents();

  const createClassMutation = useCreateClass({
    mutationConfig: {
      onSuccess: () => {
        showNotification('success', 'Thêm lớp học thành công');
        setOpen(false);
      }
    }
  });

  const handleAddNewClass = async () => {
    try {
      const formValues = await form.validateFields();
      createClassMutation.mutate(formValues);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button type='primary' icon={<PlusOutlined />} size='large' onClick={() => setOpen(true)}>
        Thêm Lớp Học
      </Button>

      <Modal
        centered
        destroyOnClose
        width={700}
        title='Thêm Mới Lớp Học'
        cancelText='Hủy'
        okText='Thêm mới'
        okButtonProps={{ htmlType: 'button', autoFocus: true }}
        open={open}
        onOk={handleAddNewClass}
        onCancel={() => setOpen(false)}
        modalRender={(dom) => (
          <Form layout='vertical' form={form} clearOnDestroy size='large'>
            {dom}
          </Form>
        )}
      >
        <Space direction='vertical' style={{ width: '100%' }} size={0}>
          <h3>Thông tin lớp học</h3>

          <Flex gap={16}>
            <Form.Item
              style={{ flexBasis: '50%', width: '100%' }}
              name='classGroup'
              label='Nhóm lớp học'
              rules={[{ required: true, message: 'Nhóm lớp học là thông tin bắt buộc' }]}
            >
              <Input allowClear placeholder='Nhập nhóm lớp học' />
            </Form.Item>
            <Form.Item
              style={{ flexBasis: '50%', width: '100%' }}
              name='className'
              label='Tên lớp học'
              rules={[{ required: true, message: 'Tên lớp học là thông tin bắt buộc' }]}
            >
              <Input allowClear placeholder='Nhập tên lớp học' />
            </Form.Item>
          </Flex>
        </Space>

        <Space direction='vertical' style={{ width: '100%' }} size={0}>
          <h3>Thông tin bổ sung</h3>

          <Flex gap={16}>
            <Form.Item
              style={{ flexBasis: '50%' }}
              label='Kỳ học'
              name='semesterId'
              rules={[{ required: true, message: 'Kỳ học là thông tin bắt buộc' }]}
            >
              <Select placeholder='Chọn học kỳ'>
                {semestersQuery.data?.map((semester) => (
                  <Select.Option value={semester.id} key={semester.id}>
                    {semester.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              style={{ flexBasis: '50%' }}
              label='Môn học'
              name='courseId'
              rules={[{ required: true, message: 'Môn học là thông tin bắt buộc' }]}
            >
              <Select placeholder='Chọn môn học'>
                {coursesQuery.data?.map((course) => (
                  <Select.Option value={course.id} key={course.id}>
                    {course.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Flex>

          <Flex gap={16}>
            <Form.Item
              style={{ flexBasis: '50%' }}
              label='Giảng viên giảng dạy'
              name='teacherId'
              rules={[{ required: true, message: 'Giảng viên là thông tin bắt buộc' }]}
            >
              <Select placeholder='Chọn giảng viên'>
                {teachersQuery.data?.map((teacher) => (
                  <Select.Option value={teacher.id} key={teacher.id}>
                    {teacher.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              style={{ flexBasis: '50%' }}
              label='Sinh viên'
              name='studentIds'
              rules={[{ required: true, message: 'Sinh viên là thông tin bắt buộc' }]}
            >
              <Select placeholder='Chọn danh sách sinh viên' mode='multiple'>
                {studentsQuery.data?.map((student) => (
                  <Select.Option value={student.id} key={student.id}>
                    {student.lastName} {student.firstName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Flex>
        </Space>
      </Modal>
    </>
  );
};

export default CreateClass;
