import { Course } from '@app/shared/types/api.type';
import { Space, Table, TableColumnsType } from 'antd';
import { useMemo } from 'react';
import DeleteCourse from './delete-course';
import UpdateCourse from './update-course';
import { useCourses } from '@app/shared/api/get-courses';

type CourseListProps = {
  searchedValue: string;
};

const CourseList = ({ searchedValue }: CourseListProps) => {
  const coursesQuery = useCourses();

  const courses = useMemo(() => {
    if (!searchedValue) {
      return coursesQuery.data ?? [];
    }
    return coursesQuery.data?.filter((course) => course.name.toLowerCase().includes(searchedValue.toLowerCase())) ?? [];
  }, [coursesQuery.data, searchedValue]);

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
        title: 'Trọng số',
        children: [
          {
            key: 'attendancePercentage',
            title: 'Điểm chuyên cần (%)',
            dataIndex: 'attendancePercentage',
            width: 100
          },
          {
            key: 'testPercentage',
            title: 'Điểm kiểm tra (%)',
            dataIndex: 'testPercentage',
            width: 100
          },
          {
            key: 'practicePercentage',
            title: 'Điểm thực hành (%)',
            dataIndex: 'practicePercentage',
            width: 100
          },
          {
            key: 'projectPercentage',
            title: 'Điểm bài tập lớn (%)',
            dataIndex: 'projectPercentage',
            width: 100
          }
        ]
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
      dataSource={courses}
      loading={coursesQuery.isLoading}
      pagination={false}
      rowKey={(record) => record.id}
    />
  );
};

export default CourseList;
