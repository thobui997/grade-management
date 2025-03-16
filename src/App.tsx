import { PrivateRoute } from '@app/components';
import AuthProvider from '@app/contexts/AuthProvider';
import { Navigate, Route, Routes } from 'react-router';
import AppLayout from './layouts/AppLayout';
import Login from './pages/auth/Login';
import LecturerManagement from './pages/lecturer-management/LecturerManagement';
import SemesterManagement from './pages/semester-management/SemesterManagement';
import StudentsManagement from './pages/students-management/StudentsManagement';
import UsersManagement from './pages/users-management/UsersManagement';
import NotificationProvider from '@app/contexts/NotificationProvider';

const App = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <Routes>
          <Route path='/dang-nhap' element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate to='/quan-ly-hoc-ky' />} />
              <Route path='quan-ly-hoc-ky' element={<SemesterManagement />} />
              <Route path='quan-ly-giang-vien' element={<LecturerManagement />} />
              <Route path='quan-ly-sinh-vien' element={<StudentsManagement />} />
              <Route path='quan-ly-nguoi-dung' element={<UsersManagement />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;
