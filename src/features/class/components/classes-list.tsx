import DeleteClass from '@app/features/class/components/delete-class';
import UpdateClass from '@app/features/class/components/update-class';
import { useClasses } from '@app/shared/api/get-classes';
import { ClassInfo } from '@app/shared/types/api.type';
import { Space, Table, TableColumnsType } from 'antd';
import { useMemo } from 'react';

type ClassesListProps = {
  searchedValue: string;
};

const ClassesList = ({ searchedValue }: ClassesListProps) => {
  const classesQuery = useClasses();

  const classes = useMemo(() => {
    if (!searchedValue) {
      return classesQuery.data ?? [];
    }
    return (
      classesQuery.data?.filter((classInfo) =>
        classInfo.aclass.className.toLowerCase().includes(searchedValue.toLowerCase())
      ) ?? []
    );
  }, [classesQuery.data, searchedValue]);

  const columns: TableColumnsType<ClassInfo> = useMemo(() => {
    return [
      {
        key: 'aclass',
        title: 'Mã lớp',
        dataIndex: 'aclass',
        width: 120,
        render: (classInfo) => classInfo.classCode
      },
      {
        key: 'aclass',
        title: 'Tên lớp',
        dataIndex: 'aclass',
        width: 120,
        render: (classInfo) => classInfo.className
      },
      {
        key: 'aclass',
        title: 'Nhóm lớp',
        dataIndex: 'aclass',
        width: 150,
        render: (classInfo) => classInfo.classGroup
      },
      {
        key: 'aclass',
        title: 'Môn học',
        dataIndex: 'aclass',
        width: 150,
        render: (classInfo) => classInfo.course.name
      },
      {
        key: 'aclass',
        title: 'Giảng viên giảng dạy',
        dataIndex: 'aclass',
        width: 150,
        render: (classInfo) => classInfo.teacher.name
      },
      {
        key: 'action',
        title: 'Hành động',
        width: 80,
        render: (_, classInfo) => (
          <Space>
            <UpdateClass classInfo={classInfo} />
            <DeleteClass id={classInfo.id} />
          </Space>
        )
      }
    ];
  }, []);

  return (
    <Table<ClassInfo>
      tableLayout='fixed'
      size='large'
      columns={columns}
      dataSource={classes}
      loading={classesQuery.isLoading}
      pagination={false}
      rowKey={(record) => record.id}
    />
  );
};

export default ClassesList;
