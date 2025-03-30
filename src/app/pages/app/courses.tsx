import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { ContentLayout } from '@app/shared/components/layouts';
import { PageTitle } from '@app/shared/components/ui/page-title';
import CourseList from '@app/features/course-management/components/courses-list';
import CreateCourse from '@app/features/course-management/components/create-course';
import { Button, Flex, Input, Space } from 'antd';

const CoursesRoute = () => {
  return (
    <>
      <Flex justify='space-between' align='center'>
        <PageTitle title='Quản Lý Môn Học' />
        <CreateCourse />
      </Flex>

      <ContentLayout>
        <Space style={{ marginBottom: 16 }} size={16}>
          <Input addonBefore={<SearchOutlined />} placeholder='Tìm kiếm' style={{ width: 300 }} size='large' />

          <Button icon={<FilterOutlined />} size='large'>
            Lọc
          </Button>
        </Space>

        <CourseList />
      </ContentLayout>
    </>
  );
};

export default CoursesRoute;
