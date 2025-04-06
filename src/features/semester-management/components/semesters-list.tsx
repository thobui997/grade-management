import { SemesterStatusMap } from '@app/shared/enums/semester-status.enum';
import { Semester } from '@app/shared/types/api.type';
import { Table, TableColumnsType, Tag } from 'antd';
import { useMemo } from 'react';
import { useSemsters } from '../../../shared/api/get-semesters';
import UpdateSemester from './update-semester';

type SemesterListProps = {
  searchedValue: string;
  term: string | undefined;
};

const SemstersList = ({ searchedValue, term }: SemesterListProps) => {
  const semestersQuery = useSemsters();
  const semesters = useMemo(() => {

    if (!searchedValue && !term) {
      return semestersQuery.data ?? [];
    }

    if (searchedValue && !term) {
      return (
        semestersQuery.data?.filter((semester) => semester.name.toLowerCase().includes(searchedValue.toLowerCase())) ??
        []
      );
    }

    if (!searchedValue && term) {
      return semestersQuery.data?.filter((semester) => semester.term === +term) ?? [];
    }

    if (searchedValue && term) {
      return (
        semestersQuery.data
          ?.filter((semester) => semester.name.toLowerCase().includes(searchedValue.toLowerCase()))
          .filter((semester) => semester.term === +term) ?? []
      );
    }

    return semestersQuery.data ?? [];
  }, [semestersQuery.data, searchedValue, term]);

  const columns: TableColumnsType<Semester> = useMemo(() => {
    return [
      {
        key: 'name',
        title: 'Tên học kỳ',
        dataIndex: 'name',
        width: 120
      },
      {
        key: 'term',
        title: 'Học kỳ',
        dataIndex: 'term',
        width: 120
      },

      {
        key: 'startYear',
        title: 'Năm bắt đầu',
        dataIndex: 'startYear',
        width: 150
      },
      {
        key: 'status',
        title: 'Trạng thái',
        dataIndex: 'status',
        width: 150,
        render: (status) => (
          <Tag color={SemesterStatusMap.get(status)?.color}>{SemesterStatusMap.get(status)?.name}</Tag>
        )
      },
      {
        key: 'action',
        title: 'Hành động',
        width: 80,
        render: (_, semester) => <UpdateSemester semester={semester} />
      }
    ];
  }, []);

  return (
    <Table<Semester>
      tableLayout='fixed'
      size='large'
      columns={columns}
      dataSource={semesters}
      loading={semestersQuery.isLoading}
      pagination={false}
      rowKey={(record) => record.id}
    />
  );
};

export default SemstersList;
