import { BaseResponse } from '@app/core/models/base.type';
import httpClient from '@app/services/http-client';
import { Student, StudentCreatedRequest } from '@app/services/student/student.type';

const getStudents = () => {
  return httpClient.get<Student[]>('students').then((res) => res.data);
};

const createStudent = (student: StudentCreatedRequest) => {
  return httpClient.post<BaseResponse<Student>>('students', student).then((res) => res.data);
};

const deleteStudent = (studentId: number) => {
  return httpClient.delete(`students/${studentId}`).then((res) => res.data);
};

const updateStudent = (student: StudentCreatedRequest, studentId?: number) => {
  return httpClient.put<BaseResponse<Student>>(`students/${studentId}`, student).then((res) => res.data);
};

const StudentServices = {
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent
};

export default StudentServices;
