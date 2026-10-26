import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp.jsx';
import Login from './components/Login.jsx';
import { CoursePage } from './pages/CoursePage.jsx';
import CreateCoursePage from './pages/CreateCoursePage.jsx';
import { AuthProvider } from './context/authContext.jsx';
import AppLayout from './components/AppLayout.jsx';

const App = () => {
  return (
    <AuthProvider>
      <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/create-course" element={<CreateCoursePage />} />
      </Routes>
      </AppLayout>
    </AuthProvider>
  );
};

export default App;
