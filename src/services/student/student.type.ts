export interface Student {
  id: number;
  studentCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export type StudentCreatedRequest = Omit<Student, 'id'>;
