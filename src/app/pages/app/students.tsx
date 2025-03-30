import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { ContentLayout } from '@app/shared/components/layouts';
import { PageTitle } from '@app/shared/components/page-title';
import CreateStudent from '@app/features/students-management/components/create-student';
import StudentsList from '@app/features/students-management/components/students-list';
import { Button, Flex, Input, Space } from 'antd';

const StudentsRoute = () => {
  return (
    <>
      <Flex justify='space-between' align='center'>
        <PageTitle title='Quản Lý Sinh Viên' />
        <CreateStudent />
      </Flex>

      <ContentLayout>
        <Space style={{ marginBottom: 16 }} size={16}>
          <Input addonBefore={<SearchOutlined />} placeholder='Tìm kiếm' style={{ width: 300 }} size='large' />

          <Button icon={<FilterOutlined />} size='large'>
            Lọc
          </Button>
        </Space>

        <StudentsList />
      </ContentLayout>
    </>
  );
};

export default StudentsRoute;
