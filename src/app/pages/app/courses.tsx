import { SearchOutlined } from '@ant-design/icons';
import CourseList from '@app/features/course-management/components/courses-list';
import CreateCourse from '@app/features/course-management/components/create-course';
import { ContentLayout } from '@app/shared/components/layouts';
import { PageTitle } from '@app/shared/components/page-title';
import { Flex, Input, Space } from 'antd';
import { useState } from 'react';

const CoursesRoute = () => {
  const [searchedValue, setSearchedValue] = useState('');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedValue(e.target.value);
  };
  return (
    <>
      <Flex justify='space-between' align='center'>
        <PageTitle title='Quản Lý Môn Học' />
        <CreateCourse />
      </Flex>

      <ContentLayout>
        <Space style={{ marginBottom: 16 }} size={16}>
          <Input
            addonBefore={<SearchOutlined />}
            placeholder='Tìm kiếm'
            style={{ width: 300 }}
            size='large'
            onChange={handleSearch}
          />
        </Space>

        <CourseList searchedValue={searchedValue} />
      </ContentLayout>
    </>
  );
};

export default CoursesRoute;
