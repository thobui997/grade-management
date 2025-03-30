import { AppLayout } from '@app/shared/components/layouts';
import { paths } from '@app/config/paths';
import { useAuth } from '@app/contexts/AuthProvider';
import { lazy } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router';

const LoginRoute = lazy(() => import('./pages/auth/login'));
const CoursesRoute = lazy(() => import('./pages/app/courses'));
const LecturersRoute = lazy(() => import('./pages/app/lecturers'));
const StudentsRoute = lazy(() => import('./pages/app/students'));
const SemestersRoute = lazy(() => import('./pages/app/semesters'));
const UsersRoute = lazy(() => import('./pages/app/users'));
const ClassesRoute = lazy(() => import('./pages/app/classes'));

const ProtectedRoute = () => {
  const user = useAuth();
  const location = useLocation();

  if (!user.authInfo?.token) return <Navigate to={paths.auth.login.getHref(location.pathname)} replace />;
  return <Outlet />;
};

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={paths.auth.login.path} element={<LoginRoute />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to={paths.app.semesters.path} />} />
          <Route path={paths.app.semesters.path} element={<SemestersRoute />} />
          <Route path={paths.app.lecturers.path} element={<LecturersRoute />} />
          <Route path={paths.app.students.path} element={<StudentsRoute />} />
          <Route path={paths.app.courses.path} element={<CoursesRoute />} />
          <Route path={paths.app.users.path} element={<UsersRoute />} />
          <Route path={paths.app.classes.path} element={<ClassesRoute />} />
        </Route>
      </Route>
    </Routes>
  );
};
