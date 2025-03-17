import { DeleteOutlined, EditOutlined, FilterOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { PageTitle } from '@app/components';
import { useNotification } from '@app/contexts/NotificationProvider';
import { BaseModalProps } from '@app/core/models/base-modal.type';
import { BaseResponse } from '@app/core/models/base.type';
import ContentLayout from '@app/layouts/ContentLayout';
import LecturerServices from '@app/services/lecturer/lecturer.service';
import { Lecturer } from '@app/services/lecturer/lecturer.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Flex, Input, Popconfirm, Space, Table, TableColumnsType } from 'antd';
import { AxiosError } from 'axios';
import { useMemo, useState } from 'react';

const LecturerManagement = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  // states
  const [modalProps, setModalProps] = useState<BaseModalProps<Lecturer>>({
    open: false
  });

  const { data, isLoading } = useQuery({
    queryKey: ['lecttures'],
    queryFn: () => LecturerServices.getLecturers()
  });

  const mutation = useMutation({
    mutationFn: (id: number) => LecturerServices.deleteLecturer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      showNotification('success', 'Xóa sinh viên thành công');
    },
    onError: (error: AxiosError<BaseResponse<Lecturer>>) => {
      showNotification('error', error.response?.data.meta.message || 'Có lỗi xảy ra');
    }
  });

  const columns: TableColumnsType<Lecturer> = useMemo(() => {
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
        render: (_, lecturer) => (
          <Space>
            <Button
              icon={<EditOutlined />}
              type='text'
              size='large'
              onClick={() => setModalProps({ open: true, type: 'update', data: lecturer })}
            />
            <Popconfirm
              title='Bạn có chắc chắn muốn xóa sinh viên này?'
              description='Hành động này không thể hoàn tác'
              okText='Xóa'
              cancelText='Hủy'
              onConfirm={() => mutation.mutate(lecturer.id)}
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
      <Flex justify='space-between' align='center'>
        <PageTitle title='Quản Lý Giảng Viên' />
        <Button
          type='primary'
          icon={<PlusOutlined />}
          size='large'
          onClick={() => setModalProps({ open: true, type: 'create' })}
        >
          Thêm giảng viên
        </Button>
      </Flex>

      <ContentLayout>
        <Space style={{ marginBottom: 16 }}>
          <Input addonBefore={<SearchOutlined />} placeholder='Tìm kiếm' style={{ width: 300 }} size='large' />

          <Button icon={<FilterOutlined />} size='large'>
            Lọc
          </Button>
        </Space>

        <Table<Lecturer>
          tableLayout='fixed'
          size='large'
          columns={columns}
          dataSource={data ?? []}
          loading={isLoading}
          pagination={false}
          rowKey={(record) => record.id}
        ></Table>
      </ContentLayout>

      {/* {modalProps.open && (
        <StudentModal
          data={modalProps.data}
          open={modalProps.open}
          type={modalProps.type}
          handleCancel={() => setModalProps({ open: false })}
        />
      )} */}
    </>
  );
};

export default LecturerManagement;
