import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { ContentLayout } from '@app/shared/components/layouts';
import { PageTitle } from '@app/shared/components/page-title';
import CreateSemester from '@app/features/semester-management/components/create-semester';
import SemstersList from '@app/features/semester-management/components/semesters-list';
import { Button, Flex, Input, Space } from 'antd';

const SemestersRoute = () => {
  return (
    <>
      <Flex justify='space-between' align='center'>
        <PageTitle title='Quản Lý Học Kỳ' />
        <CreateSemester />
      </Flex>

      <ContentLayout>
        <Space style={{ marginBottom: 16 }} size={16}>
          <Input addonBefore={<SearchOutlined />} placeholder='Tìm kiếm' style={{ width: 300 }} size='large' />

          <Button icon={<FilterOutlined />} size='large'>
            Lọc
          </Button>
        </Space>

        <SemstersList />
      </ContentLayout>
    </>
  );
};

export default SemestersRoute;
