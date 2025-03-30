export const SEMESTER_STATUS = {
  CHUA_DIEN_RA: 'CHUA_DIEN_RA',
  DANG_DIEN_RA: 'DANG_DIEN_RA',
  DA_KET_THUC: 'DA_KET_THUC'
} as const;

export type SemesterStatusEnum = (typeof SEMESTER_STATUS)[keyof typeof SEMESTER_STATUS];

export const SemesterStatusMap = new Map<
  SemesterStatusEnum,
  { name: string; value: SemesterStatusEnum; color: string }
>([
  [SEMESTER_STATUS.CHUA_DIEN_RA, { name: 'Chưa diễn ra', value: SEMESTER_STATUS.CHUA_DIEN_RA, color: 'orange' }],
  [SEMESTER_STATUS.DANG_DIEN_RA, { name: 'Đang diễn ra', value: SEMESTER_STATUS.DANG_DIEN_RA, color: 'blue' }],
  [SEMESTER_STATUS.DA_KET_THUC, { name: 'Dẫ kết thúc', value: SEMESTER_STATUS.DA_KET_THUC, color: 'green' }]
]);
