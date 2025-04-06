import { SearchOutlined } from '@ant-design/icons';
import CreateSemester from '@app/features/semester-management/components/create-semester';
import SemesterFilter from '@app/features/semester-management/components/semester-filter';
import SemstersList from '@app/features/semester-management/components/semesters-list';
import { ContentLayout } from '@app/shared/components/layouts';
import { PageTitle } from '@app/shared/components/page-title';
import { Flex, Input, Space } from 'antd';
import { useState } from 'react';

const SemestersRoute = () => {
  const [searchedValue, setSearchedValue] = useState('');
  const [term, setTerm] = useState<string | undefined>(undefined);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedValue(e.target.value);
  };
  return (
    <>
      <Flex justify='space-between' align='center'>
        <PageTitle title='Quản Lý Học Kỳ' />
        <CreateSemester />
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

          <SemesterFilter setTerm={setTerm} />
        </Space>

        <SemstersList searchedValue={searchedValue} term={term} />
      </ContentLayout>
    </>
  );
};

export default SemestersRoute;
