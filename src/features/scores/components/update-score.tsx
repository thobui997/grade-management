import { EditOutlined } from '@ant-design/icons';
import { useNotification } from '@app/contexts/NotificationProvider';
import { useUpdateScore } from '@app/features/scores/api/update-score';
import { useSetFormValues } from '@app/hooks';
import { Score } from '@app/shared/types/api.type';
import { Button, Flex, Form, Input, InputNumber, Modal, Space } from 'antd';
import { useState } from 'react';

type UpdateScoreProps = {
  score: Score;
};

const UpdateScore = ({ score }: UpdateScoreProps) => {
  const [form] = Form.useForm();
  const { showNotification } = useNotification();

  const [open, setOpen] = useState<boolean>(false);

  const updateScoreMutation = useUpdateScore({
    mutationConfig: {
      onSuccess: () => {
        showNotification('success', 'Cập nhật điểm cho sinh viên thành công');
        setOpen(false);
      }
    }
  });

  const handleAddUpdateScore = async () => {
    try {
      const { studentId, classId, ...formValues } = await form.validateFields();
      updateScoreMutation.mutate({
        id: score.id,
        payload: {
          ...formValues,
          attendanceScore: +formValues.attendanceScore,
          testScore: +formValues.testScore,
          practiceScore: +formValues.practiceScore,
          projectScore: +formValues.projectScore,
          finalScore: +formValues.finalScore
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useSetFormValues(open, form, {
    classId: score.aclass.className,
    studentId: score.student.lastName + ' ' + score.student.firstName,
    attendanceScore: score?.attendanceScore.toString(),
    testScore: score?.testScore.toString(),
    practiceScore: score?.practiceScore ? score.practiceScore.toString() : null,
    projectScore: score?.projectScore ? score.projectScore.toString() : null,
    finalScore: score?.finalScore.toString()
  });

  return (
    <>
      <Button icon={<EditOutlined />} type='text' size='large' onClick={() => setOpen(true)} />

      <Modal
        centered
        destroyOnClose
        width={700}
        title='Cập Nhật Điểm'
        cancelText='Hủy'
        okText='Cập nhật'
        okButtonProps={{ htmlType: 'button', autoFocus: true }}
        open={open}
        onOk={handleAddUpdateScore}
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
            <Form.Item style={{ flexBasis: '50%' }} name='classId' label='Nhóm lớp học'>
              <Input allowClear disabled />
            </Form.Item>

            <Form.Item style={{ flexBasis: '50%' }} name='studentId' label='Tên sinh viên'>
              <Input allowClear disabled />
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

export default UpdateScore;
