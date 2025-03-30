import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { ContentLayout } from '@app/shared/components/layouts';
import { PageTitle } from '@app/shared/components/ui/page-title';
import ClassesList from '@app/features/class/components/classes-list';
import CreateClass from '@app/features/class/components/create-class';
import { Button, Flex, Input, Space } from 'antd';

const ClassesRoute = () => {
  return (
    <>
      <Flex justify='space-between' align='center'>
        <PageTitle title='Quản Lý Lớp Học' />
        <CreateClass />
      </Flex>

      <ContentLayout>
        <Space style={{ marginBottom: 16 }} size={16}>
          <Input addonBefore={<SearchOutlined />} placeholder='Tìm kiếm' style={{ width: 300 }} size='large' />

          <Button icon={<FilterOutlined />} size='large'>
            Lọc
          </Button>
        </Space>

        <ClassesList />
      </ContentLayout>
    </>
  );
};

export default ClassesRoute;
