import { useScores } from '@app/features/scores/api/get-scores';
import CreateScore from '@app/features/scores/components/create-score';
import ScoresList from '@app/features/scores/components/scores-list';
import { useClasses } from '@app/shared/api/get-classes';
import { ContentLayout } from '@app/shared/components/layouts';
import { PageTitle } from '@app/shared/components/page-title';
import { Flex, Input, Select, Space } from 'antd';
import { useMemo, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';

const ScoresRoute = () => {
  const classesQuery = useClasses();

  const [classId, setClassId] = useState<number | null>(classesQuery.data?.[0]?.id || null);
  const [searchedValue, setSearchedValue] = useState('');

  const scoresQuery = useScores({ classId });

  const handleClassChange = (value: number) => {
    setClassId(value);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedValue(e.target.value);
  };

  const scores = useMemo(() => {
    if (!searchedValue) return scoresQuery.data;
    return scoresQuery.data?.filter((score) => {
      const student = score.student;
      return student.studentCode.toLowerCase().includes(searchedValue.toLowerCase());
    });
  }, [scoresQuery.data, searchedValue]);

  return (
    <>
      <Flex justify='space-between' align='center'>
        <PageTitle title='Quản Lý Điểm' />
        <CreateScore />
      </Flex>

      <ContentLayout>
        <Space style={{ marginBottom: 16 }} size={16}>
          <Select
            placeholder='Chọn nhóm lớp'
            onChange={handleClassChange}
            size='large'
            style={{ width: 260 }}
            defaultValue={classesQuery.data?.[0]?.id}
          >
            {classesQuery.data?.map((classInfo) => (
              <Select.Option value={classInfo.id} key={classInfo.id}>
                {classInfo.aclass.classGroup} - {classInfo.aclass.className}
              </Select.Option>
            ))}
          </Select>

          <Input
            addonBefore={<SearchOutlined />}
            placeholder='Tìm kiếm theo mã sinh viên'
            style={{ width: 300 }}
            size='large'
            onChange={handleSearch}
          />
        </Space>

        <ScoresList scores={scores ?? []} />
      </ContentLayout>
    </>
  );
};

export default ScoresRoute;
