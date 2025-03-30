import { Score } from '@app/shared/types/api.type';
import { Table, TableColumnsType } from 'antd';
import { useMemo } from 'react';

type ScoresListProps = {
  scores: Score[];
};

const ScoresList = ({ scores }: ScoresListProps) => {
  const columns: TableColumnsType<Score> = useMemo(() => {
    return [
      {
        key: 'student',
        title: 'Mã sinh viên',
        dataIndex: 'student',
        width: 120,
        render: (student) => student.studentCode
      },
      {
        key: 'student',
        title: 'Họ và tên',
        dataIndex: 'student',
        width: 120,
        render: (student) => `${student.lastName} ${student.firstName}`
      },
      {
        key: 'aclass',
        title: 'Học phần',
        dataIndex: 'aclass',
        width: 120,
        render: (aclass) => aclass.className
      },
      {
        title: 'Điểm thành phần',
        children: [
          {
            key: 'attendanceScore',
            title: 'Điểm chuyên cần',
            dataIndex: 'attendanceScore',
            width: 80
          },
          {
            key: 'testScore',
            title: 'Điểm kiểm tra',
            dataIndex: 'testScore',
            width: 80
          },
          {
            key: 'practiceScore',
            title: 'Điểm thực hành',
            dataIndex: 'practiceScore',
            width: 80
          },
          {
            key: 'projectScore',
            title: 'Điểm bài tập lớn',
            dataIndex: 'projectScore',
            width: 80
          },
          {
            key: 'finalScore',
            title: 'Điểm thi kết thúc học phần',
            dataIndex: 'finalScore',
            width: 80
          }
        ]
      }
    ];
  }, []);

  return (
    <Table<Score>
      tableLayout='fixed'
      size='large'
      columns={columns}
      dataSource={scores}
      pagination={false}
      rowKey={(record) => record.id}
    />
  );
};

export default ScoresList;
