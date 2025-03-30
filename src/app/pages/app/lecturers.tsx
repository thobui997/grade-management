import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { ContentLayout } from '@app/shared/components/layouts';
import { PageTitle } from '@app/shared/components/page-title';
import CreateLecturer from '@app/features/lecturer-management/components/create-lecturer';
import LecturersList from '@app/features/lecturer-management/components/lecturers-list';
import { Button, Flex, Input, Space } from 'antd';

const LecturersRoute = () => {
  return (
    <>
      <Flex justify='space-between' align='center'>
        <PageTitle title='Quản Lý Giảng Viên' />
        <CreateLecturer />
      </Flex>

      <ContentLayout>
        <Space style={{ marginBottom: 16 }} size={16}>
          <Input addonBefore={<SearchOutlined />} placeholder='Tìm kiếm' style={{ width: 300 }} size='large' />

          <Button icon={<FilterOutlined />} size='large'>
            Lọc
          </Button>
        </Space>

        <LecturersList />
      </ContentLayout>
    </>
  );
};

export default LecturersRoute;
