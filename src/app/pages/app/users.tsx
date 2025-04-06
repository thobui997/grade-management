import { SearchOutlined } from '@ant-design/icons';
import UserFilter from '@app/features/users/components/user-filter';
import UsersList from '@app/features/users/components/users-list';
import { ContentLayout } from '@app/shared/components/layouts';
import { PageTitle } from '@app/shared/components/page-title';
import { Flex, Input, Space } from 'antd';
import { useState } from 'react';

const UsersRoute = () => {
  const [searchedValue, setSearchedValue] = useState('');
  const [role, setRole] = useState<string | undefined>(undefined);

  const handleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedValue(e.target.value);
  };

  return (
    <>
      <Flex justify='space-between' align='center'>
        <PageTitle title='Quản Lý Người Dùng' />
      </Flex>

      <ContentLayout>
        <Space style={{ marginBottom: 16 }} size={16}>
          <Input
            addonBefore={<SearchOutlined />}
            placeholder='Tìm kiếm'
            style={{ width: 300 }}
            size='large'
            onChange={handleSearchUser}
          />

          <UserFilter setRole={setRole} />
        </Space>

        <UsersList searchedValue={searchedValue} role={role} />
      </ContentLayout>
    </>
  );
};

export default UsersRoute;
