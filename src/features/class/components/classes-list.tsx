import { ClassInfo } from '@app/shared/types/api.type';
import { useClasses } from '@app/shared/api/get-classes';
import { Space, Table, TableColumnsType } from 'antd';
import { useMemo } from 'react';
import UpdateClass from '@app/features/class/components/update-class';
import DeleteClass from '@app/features/class/components/delete-class';

const ClassesList = () => {
  const classesQuery = useClasses();

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
      dataSource={classesQuery.data ?? []}
      loading={classesQuery.isLoading}
      pagination={false}
      rowKey={(record) => record.id}
    />
  );
};

export default ClassesList;
