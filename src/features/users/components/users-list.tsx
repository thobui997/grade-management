import { UserType } from '@app/shared/enums/user-type.enum';
import { User } from '@app/shared/types/api.type';
import { useUsers } from '@app/features/users/api/get-users';
import { formatDate } from '@app/shared/utils';
import { Space, Table, TableColumnsType, Tag } from 'antd';
import { useMemo } from 'react';

const UsersList = () => {
  const usersQuery = useUsers();

  const columns: TableColumnsType<User> = useMemo(() => {
    return [
      {
        key: 'fullName',
        title: 'Họ và tên',
        dataIndex: 'fullName',
        width: 200
      },
      {
        key: 'email',
        title: 'Email',
        dataIndex: 'email',
        width: 150
      },
      {
        key: 'dateOfBirth',
        title: 'Ngày sinh',
        dataIndex: 'dateOfBirth',
        width: 150,
        render: (dateOfBirth) => formatDate(dateOfBirth)
      },
      {
        key: 'role',
        title: 'Vai trò',
        dataIndex: 'role',
        width: 150,
        render: (role) => (
          <Tag color={role === UserType.ADMIN ? 'success' : role === UserType.TEACHER ? 'geekblue' : 'gold'}>
            {role}
          </Tag>
        )
      }
    ];
  }, []);

  return (
    <Table<User>
      tableLayout='fixed'
      size='large'
      columns={columns}
      dataSource={usersQuery.data ?? []}
      loading={usersQuery.isLoading}
      pagination={false}
      rowKey={(record) => record.userId}
    />
  );
};

export default UsersList;
