export interface Lecturer {
  id: number;
  lecturerCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export type LecturerCreatedRequest = Omit<Lecturer, 'id'>;
