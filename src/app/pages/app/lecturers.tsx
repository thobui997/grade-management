import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { ContentLayout } from '@app/shared/components/layouts';
import { PageTitle } from '@app/shared/components/page-title';
import CreateLecturer from '@app/features/lecturer-management/components/create-lecturer';
import LecturersList from '@app/features/lecturer-management/components/lecturers-list';
import { Button, Flex, Input, Space } from 'antd';
import { useState } from 'react';

const LecturersRoute = () => {
  const [searchedValue, setSearchedValue] = useState('');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedValue(e.target.value);
  };
  return (
    <>
      <Flex justify='space-between' align='center'>
        <PageTitle title='Quản Lý Giảng Viên' />
        <CreateLecturer />
      </Flex>

      <ContentLayout>
        <Space style={{ marginBottom: 16 }} size={16}>
          <Input
            addonBefore={<SearchOutlined />}
            placeholder='Tìm kiếm theo tên'
            style={{ width: 300 }}
            size='large'
            onChange={handleSearch}
          />
        </Space>

        <LecturersList searchedValue={searchedValue} />
      </ContentLayout>
    </>
  );
};

export default LecturersRoute;
