import { useScores } from '@app/features/scores/api/get-scores';
import CreateScore from '@app/features/scores/components/create-score';
import ScoresList from '@app/features/scores/components/scores-list';
import { useClasses } from '@app/shared/api/get-classes';
import { ContentLayout } from '@app/shared/components/layouts';
import { PageTitle } from '@app/shared/components/page-title';
import { Flex, Select, Space } from 'antd';
import { useState } from 'react';

const ScoresRoute = () => {
  const classesQuery = useClasses();

  const [classId, setClassId] = useState<number | null>(classesQuery.data?.[0].id || null);

  const scoresQuery = useScores({ classId });

  const handleClassChange = (value: number) => {
    setClassId(value);
  };

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
            defaultValue={classesQuery.data?.[0].id}
          >
            {classesQuery.data?.map((classInfo) => (
              <Select.Option value={classInfo.id} key={classInfo.id}>
                {classInfo.aclass.classGroup} - {classInfo.aclass.className}
              </Select.Option>
            ))}
          </Select>
        </Space>

        <ScoresList scores={scoresQuery.data ?? []} />
      </ContentLayout>
    </>
  );
};

export default ScoresRoute;
