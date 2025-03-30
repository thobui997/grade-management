import { Student } from '@app/shared/types/api.type';
import { Space, Table, TableColumnsType } from 'antd';
import { useMemo } from 'react';
import { useStudents } from '../../../shared/api/get-students';
import UpdateStudent from './update-student';
import DeleteStudent from './delete-student';

const StudentsList = () => {
  const studentsQuery = useStudents();

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
            <UpdateStudent student={student} />
            <DeleteStudent id={student.id} />
          </Space>
        )
      }
    ];
  }, []);

  return (
    <Table<Student>
      tableLayout='fixed'
      size='large'
      columns={columns}
      dataSource={studentsQuery.data ?? []}
      loading={studentsQuery.isLoading}
      pagination={false}
      rowKey={(record) => record.id}
    />
  );
};

export default StudentsList;
