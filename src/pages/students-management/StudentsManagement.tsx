import { DeleteOutlined, EditOutlined, FilterOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { PageTitle } from '@app/components';
import { BaseModalProps } from '@app/core/models/base-modal.type';
import { BaseResponse } from '@app/core/models/base.type';
import { useNotification } from '@app/hooks';
import ContentLayout from '@app/layouts/ContentLayout';
import StudentModal from '@app/pages/students-management/_components/StudentModal';
import StudentServices from '@app/services/student/student.service';
import { Student } from '@app/services/student/student.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Flex, Input, Popconfirm, Space, Table, TableColumnsType } from 'antd';
import { AxiosError } from 'axios';
import { useMemo, useState } from 'react';

const StudentsManagement = () => {
  const queryClient = useQueryClient();
  const { showNotification, contextHolder } = useNotification();

  // states
  const [modalProps, setModalProps] = useState<BaseModalProps<Student>>({
    open: false
  });

  const { data, isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: () => StudentServices.getStudents()
  });

  const mutation = useMutation({
    mutationFn: (studentId: number) => StudentServices.deleteStudent(studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      showNotification('success', 'Xóa sinh viên thành công');
    },
    onError: (error: AxiosError<BaseResponse<Student>>) => {
      showNotification('error', error.response?.data.meta.message || 'Có lỗi xảy ra');
    }
  });

  const columns: TableColumnsType<Student> = useMemo(() => {
    return [
      {
        key: 'studentCode',
        title: 'Mã sinh viên',
        dataIndex: 'studentCode',
        width: 120
      },
      {
        key: 'fullName',
        title: 'Họ và tên',
        dataIndex: 'firstName',
        width: 200,
        render: (firstName, record) => `${record.lastName} ${firstName}`
      },
      {
        key: 'email',
        title: 'Email',
        dataIndex: 'email',
        width: 150
      },
      {
        key: 'phone',
        title: 'Số điện thoại',
        dataIndex: 'phone',
        width: 150
      },
      {
        key: 'action',
        title: 'Hành động',
        width: 80,
        render: (_, student) => (
          <Space>
            <Button
              icon={<EditOutlined />}
              type='text'
              size='large'
              onClick={() => setModalProps({ open: true, type: 'update', data: student })}
            />
            <Popconfirm
              title='Bạn có chắc chắn muốn xóa sinh viên này?'
              description='Hành động này không thể hoàn tác'
              okText='Xóa'
              cancelText='Hủy'
              onConfirm={() => mutation.mutate(student.id)}
            >
              <Button icon={<DeleteOutlined />} danger type='text' size='large' />
            </Popconfirm>
          </Space>
        )
      }
    ];
  }, []);

  return (
    <>
      {contextHolder}
      <Flex justify='space-between' align='center'>
        <PageTitle title='Quản lý sinh viên' />
        <Button
          type='primary'
          icon={<PlusOutlined />}
          size='large'
          onClick={() => setModalProps({ open: true, type: 'create' })}
        >
          Thêm sinh viên
        </Button>
      </Flex>

      <ContentLayout>
        <Space style={{ marginBottom: 16 }}>
          <Input
            addonBefore={<SearchOutlined />}
            placeholder='Tìm kiếm'
            style={{ width: 300 }}
            size='large'
          />

          <Button icon={<FilterOutlined />} size='large'>
            Lọc
          </Button>
        </Space>

        <Table<Student>
          tableLayout='fixed'
          size='large'
          columns={columns}
          dataSource={data ?? []}
          loading={isLoading}
          pagination={false}
          rowKey={(record) => record.id}
        ></Table>
      </ContentLayout>

      {modalProps.open && (
        <StudentModal
          data={modalProps.data}
          open={modalProps.open}
          type={modalProps.type}
          showNotification={showNotification}
          handleCancel={() => setModalProps({ open: false })}
        />
      )}
    </>
  );
};

export default StudentsManagement;
