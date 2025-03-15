export const UserType = {
  ADMIN: 'ADMIN',
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER'
} as const;

export type UserTypeEnum = typeof UserType[keyof typeof UserType];
