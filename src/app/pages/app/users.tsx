import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { ContentLayout } from '@app/shared/components/layouts';
import { PageTitle } from '@app/shared/components/ui/page-title';
import UsersList from '@app/features/users/components/users-list';
import { Button, Flex, Input, Space } from 'antd';

const UsersRoute = () => {
  return (
    <>
      <Flex justify='space-between' align='center'>
        <PageTitle title='Quản Lý Người Dùng' />
      </Flex>

      <ContentLayout>
        <Space style={{ marginBottom: 16 }} size={16}>
          <Input addonBefore={<SearchOutlined />} placeholder='Tìm kiếm' style={{ width: 300 }} size='large' />

          <Button icon={<FilterOutlined />} size='large'>
            Lọc
          </Button>
        </Space>

        <UsersList />
      </ContentLayout>
    </>
  );
};

export default UsersRoute;
