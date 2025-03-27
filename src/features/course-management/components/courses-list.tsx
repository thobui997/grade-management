import { Course } from '@app/core/types/api.type';
import { Space, Table, TableColumnsType } from 'antd';
import { useMemo } from 'react';
import { useCourses } from '../api/get-courses';
import DeleteCourse from './delete-course';
import UpdateCourse from './update-course';
import dateUtils from '@app/lib/date-utils';

const CourseList = () => {
  const coursesQuery = useCourses();

  const columns: TableColumnsType<Course> = useMemo(() => {
    return [
      {
        key: 'courseCode',
        title: 'Mã môn học',
        dataIndex: 'courseCode',
        width: 120
      },
      {
        key: 'name',
        title: 'Tên môn học',
        dataIndex: 'name',
        width: 120
      },
      {
        key: 'credits',
        title: 'Số tín chỉ',
        dataIndex: 'credits',
        width: 80
      },
      {
        key: 'attendancePercentage',
        title: 'Trọng số điểm chuyên cần (%)',
        dataIndex: 'attendancePercentage',
        width: 100
      },
      {
        key: 'testPercentage',
        title: 'Trọng số điểm kiểm tra (%)',
        dataIndex: 'testPercentage',
        width: 100
      },
      {
        key: 'practicePercentage',
        title: 'Trọng số điểm thực hành (%)',
        dataIndex: 'practicePercentage',
        width: 100
      },
      {
        key: 'projectPercentage',
        title: 'Trọng số điểm bài tập lớn (%)',
        dataIndex: 'projectPercentage',
        width: 100
      },
      {
        key: 'action',
        title: 'Hành động',
        width: 80,
        render: (_, course) => (
          <Space>
            <UpdateCourse course={course} />
            <DeleteCourse id={course.id} />
          </Space>
        )
      }
    ];
  }, []);

  return (
    <Table<Course>
      tableLayout='fixed'
      size='large'
      columns={columns}
      dataSource={coursesQuery.data ?? []}
      loading={coursesQuery.isLoading}
      pagination={false}
      rowKey={(record) => record.id}
    />
  );
};

export default CourseList;
