import { SemesterStatusEnum } from '../enums/semester-status.enum';
import { UserTypeEnum } from '../enums/user-type.enum';

export interface BaseResponse<T> {
  meta: {
    code: number;
    message?: string;
  };
  data: T;
}

export interface Course {
  id: number;
  courseCode: string;
  name: string;
  credits: number;
  attendancePercentage: number;
  testPercentage: number;
  practicePercentage: number;
  projectPercentage: number;
}

export interface AuthInfo {
  token: string;
  userType: UserTypeEnum;
  expiration: number;
}

export interface Semester {
  id: number;
  name: string;
  term: number;
  startYear: number;
  status: SemesterStatusEnum;
}

export interface Student {
  id: number;
  studentCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Lecturer {
  id: number;
  name: string;
  department: string;
  email: string;
  phone: string;
}

export interface User {
  userId: number;
  role: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
}

export interface ClassInfo {
  id: number;
  semester: Semester;
  students: Student[];
  aclass: Aclass;
}

export interface Aclass {
  id: number;
  course: Course;
  classGroup: string;
  className: string;
  classCode: string;
  teacher: Lecturer;
}

export interface ClassCreatedRequest {
  courseId: number;
  classGroup: string;
  className: string;
  teacherId: number;
  semesterId: number;
}

export interface ScoreCreatedRequest {
  classId: number;
  studentId: number;
  attendanceScore: number;
  testScore: number;
  practiceScore: number;
  projectScore: number;
  finalScore: number;
}

export interface Score {
  id: number;
  student: Student;
  attendanceScore: number;
  testScore: number;
  practiceScore: number;
  projectScore: number;
  finalScore: number;
  aclass: Aclass;
}
