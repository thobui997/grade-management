import { ClassInfo } from '@app/shared/types/api.type';
import { useClasses } from '@app/features/class/api/get-classes';
import { Table, TableColumnsType } from 'antd';
import { useMemo } from 'react';

const ClassesList = () => {
  const classesQuery = useClasses();

  const columns: TableColumnsType<ClassInfo> = useMemo(() => {
    return [
      {
        key: 'classCode',
        title: 'Mã lớp',
        dataIndex: 'classCode',
        width: 120
      },
      {
        key: 'className',
        title: 'Tên lớp',
        dataIndex: 'className',
        width: 120
      },
      {
        key: 'classGroup',
        title: 'Nhóm lớp',
        dataIndex: 'classGroup',
        width: 150
      },
      {
        key: 'classGroup',
        title: 'Nhóm lớp',
        dataIndex: 'classGroup',
        width: 150
      },
      {
        key: 'course',
        title: 'Môn học',
        dataIndex: 'course',
        width: 150,
        render: (course) => course.name
      },
      {
        key: 'teacher',
        title: 'Giảng viên giảng dạy',
        dataIndex: 'teacher',
        width: 150,
        render: (teacher) => teacher.name
      }
      // {
      //   key: 'action',
      //   title: 'Hành động',
      //   width: 80,
      //   render: (_, lecturer) => (
      //     <Space>
      //       <UpdateLecturer lecturer={lecturer} />
      //       <DeleteLecturer id={lecturer.id} />
      //     </Space>
      //   )
      // }
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
