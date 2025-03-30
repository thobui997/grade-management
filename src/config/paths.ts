export const paths = {
  auth: {
    login: {
      path: '/dang-nhap',
      getHref: (redirectTo?: string | null | undefined) =>
        `/dang-nhap${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`
    }
  },

  app: {
    courses: {
      path: '/quan-ly-mon-hoc',
      getHref: () => '/quan-ly-mon-hoc'
    },
    lecturers: {
      path: '/quan-ly-giang-vien',
      getHref: () => '/quan-ly-giang-vien'
    },
    students: {
      path: '/quan-ly-sinh-vien',
      getHref: () => '/quan-ly-sinh-vien'
    },
    semesters: {
      path: '/quan-ly-hoc-ky',
      getHref: () => '/quan-ly-hoc-ky'
    },
    users: {
      path: '/quan-ly-nguoi-dung',
      getHref: () => '/quan-ly-nguoi-dung'
    },
    classes: {
      path: '/quan-ly-lop-hoc',
      getHref: () => '/quan-ly-lop-hoc'
    },
    scores: {
      path: '/quan-ly-diem',
      getHref: () => '/quan-ly-diem'
    }
  }
} as const;
