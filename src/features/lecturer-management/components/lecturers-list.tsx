import { Lecturer } from '@app/shared/types/api.type';
import { Space, Table, TableColumnsType } from 'antd';
import { useMemo } from 'react';
import { useLecturers } from '../../../shared/api/get-lecturers';
import UpdateLecturer from './update-lecturer';
import DeleteLecturer from './delete-lecturer';

const LecturersList = () => {
  const lecturersQuery = useLecturers();

  const columns: TableColumnsType<Lecturer> = useMemo(() => {
    return [
      {
        key: 'name',
        title: 'Họ và tên',
        dataIndex: 'name',
        width: 120
      },
      {
        key: 'department',
        title: 'Phòng ban',
        dataIndex: 'department',
        width: 120
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
            <UpdateLecturer lecturer={lecturer} />
            <DeleteLecturer id={lecturer.id} />
          </Space>
        )
      }
    ];
  }, []);

  return (
    <Table<Lecturer>
      tableLayout='fixed'
      size='large'
      columns={columns}
      dataSource={lecturersQuery.data ?? []}
      loading={lecturersQuery.isLoading}
      pagination={false}
      rowKey={(record) => record.id}
    />
  );
};

export default LecturersList;
