import { SearchOutlined } from '@ant-design/icons';
import ClassesList from '@app/features/class/components/classes-list';
import CreateClass from '@app/features/class/components/create-class';
import { ContentLayout } from '@app/shared/components/layouts';
import { PageTitle } from '@app/shared/components/page-title';
import { Flex, Input, Space } from 'antd';
import { useState } from 'react';

const ClassesRoute = () => {
  const [searchedValue, setSearchedValue] = useState('');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedValue(e.target.value);
  };
  return (
    <>
      <Flex justify='space-between' align='center'>
        <PageTitle title='Quản Lý Lớp Học' />
        <CreateClass />
      </Flex>

      <ContentLayout>
        <Space style={{ marginBottom: 16 }} size={16}>
          <Input
            addonBefore={<SearchOutlined />}
            placeholder='Tìm kiếm theo tên lớp'
            style={{ width: 300 }}
            size='large'
            onChange={handleSearch}
          />
        </Space>

        <ClassesList searchedValue={searchedValue} />
      </ContentLayout>
    </>
  );
};

export default ClassesRoute;
