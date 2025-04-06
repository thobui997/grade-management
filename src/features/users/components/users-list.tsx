import { useUsers } from '@app/features/users/api/get-users';
import { UserType } from '@app/shared/enums/user-type.enum';
import { User } from '@app/shared/types/api.type';
import { formatDate } from '@app/shared/utils';
import { Table, TableColumnsType, Tag } from 'antd';
import { useMemo } from 'react';

type UserListProps = {
  searchedValue: string;
  role: string | undefined;
};

const UsersList = ({ searchedValue, role }: UserListProps) => {
  const usersQuery = useUsers();

  const users = useMemo(() => {
    if (!searchedValue && !role) {
      return usersQuery.data ?? [];
    }
    if (searchedValue && !role) {
      return usersQuery.data?.filter((user) => user.fullName.toLowerCase().includes(searchedValue.toLowerCase())) ?? [];
    }
    if (!searchedValue && role) {
      return usersQuery.data?.filter((user) => user.role === role) ?? [];
    }
    if (searchedValue && role) {
      return (
        usersQuery.data
          ?.filter((user) => user.fullName.toLowerCase().includes(searchedValue.toLowerCase()))
          .filter((user) => user.role === role) ?? []
      );
    }
    return usersQuery.data ?? [];
  }, [usersQuery.data, searchedValue, role]);

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
      dataSource={users}
      loading={usersQuery.isLoading}
      pagination={false}
      rowKey={(record) => record.userId}
    />
  );
};

export default UsersList;
