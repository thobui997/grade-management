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
