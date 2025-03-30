import { PlusOutlined } from '@ant-design/icons';
import { useNotification } from '@app/contexts/NotificationProvider';
import { useCreateScore } from '@app/features/scores/api/create-score';
import { useClasses } from '@app/shared/api/get-classes';
import { Student } from '@app/shared/types/api.type';
import { Button, Flex, Form, InputNumber, Modal, Select, Space } from 'antd';
import { useState } from 'react';

const CreateScore = () => {
  const [form] = Form.useForm();
  const { showNotification } = useNotification();

  const [open, setOpen] = useState<boolean>(false);
  const [students, setStudents] = useState<Student[]>([]);

  const classesQuery = useClasses();

  const createScoreMutation = useCreateScore({
    mutationConfig: {
      onSuccess: () => {
        showNotification('success', 'Thêm điểm cho sinh viên thành công');
        setOpen(false);
      }
    }
  });

  const handleAddNewScore = async () => {
    try {
      const formValues = await form.validateFields();
      createScoreMutation.mutate({
        ...formValues,
        attendanceScore: +formValues.attendanceScore,
        testScore: +formValues.testScore,
        practiceScore: +formValues.practiceScore,
        projectScore: +formValues.projectScore,
        finalScore: +formValues.finalScore
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClassChange = (value: number) => {
    form.resetFields(['studentId']);
    const classInfo = classesQuery.data?.find((classInfo) => classInfo.id === value);
    setStudents(classInfo?.students ?? []);
  };

  return (
    <>
      <Button type='primary' icon={<PlusOutlined />} size='large' onClick={() => setOpen(true)}>
        Nhập Điểm Cho Sinh Viên
      </Button>

      <Modal
        centered
        destroyOnClose
        width={700}
        title='Thêm Mới Điểm'
        cancelText='Hủy'
        okText='Thêm mới'
        okButtonProps={{ htmlType: 'button', autoFocus: true }}
        open={open}
        onOk={handleAddNewScore}
        onCancel={() => setOpen(false)}
        modalRender={(dom) => (
          <Form layout='vertical' form={form} clearOnDestroy size='large'>
            {dom}
          </Form>
        )}
      >
        <Space direction='vertical' style={{ width: '100%' }} size={0}>
          <h3>Thông tin sinh viên</h3>

          <Flex gap={16}>
            <Form.Item
              style={{ flexBasis: '50%' }}
              name='classId'
              label='Nhóm lớp học'
              rules={[{ required: true, message: 'Nhóm lớp học là thông tin bắt buộc' }]}
            >
              <Select placeholder='Chọn nhóm lớp' onChange={handleClassChange}>
                {classesQuery.data?.map((classInfo) => (
                  <Select.Option value={classInfo.id} key={classInfo.id}>
                    {classInfo.aclass.classGroup} - {classInfo.aclass.className}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              style={{ flexBasis: '50%' }}
              name='studentId'
              label='Tên sinh viên'
              rules={[{ required: true, message: 'Tên sinh viên là thông tin bắt buộc' }]}
            >
              <Select placeholder='Chọn học kỳ'>
                {students.map((student) => (
                  <Select.Option value={student.id} key={student.id}>
                    {student.lastName} {student.firstName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Flex>
        </Space>

        <Space direction='vertical' style={{ width: '100%' }} size={0}>
          <h3>Thông tin điểm</h3>

          <Form.Item
            name='attendanceScore'
            label='Điểm chuyên cần'
            rules={[{ required: true, message: 'Điểm chuyên cần là thông tin bắt buộc' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              max={10}
              placeholder='Nhập điểm chuyên cần'
              controls={false}
            />
          </Form.Item>
          <Form.Item
            name='testScore'
            label='Điểm kiểm tra'
            rules={[{ required: true, message: 'Điểm kiểm tra là thông tin bắt buộc' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} max={10} placeholder='Nhập điểm kiểm tra' controls={false} />
          </Form.Item>
          <Form.Item name='practiceScore' label='Điểm thực hành'>
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              max={10}
              placeholder='Nhập điểm thực hành'
              controls={false}
            />
          </Form.Item>
          <Form.Item name='projectScore' label='Điểm bài tập lớn'>
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              max={10}
              placeholder='Nhập điểm bài tập lớn'
              controls={false}
            />
          </Form.Item>

          <Form.Item
            name='finalScore'
            label='Điểm thi kết thúc học phần'
            rules={[{ required: true, message: 'Điểm kết thúc học phần là thông tin bắt buộc' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              max={10}
              placeholder='Nhập điểm kết thúc học phần'
              controls={false}
            />
          </Form.Item>
        </Space>
      </Modal>
    </>
  );
};

export default CreateScore;
