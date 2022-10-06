import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import FinancialReport from "./components/financialReport";
import ProfilePage from "./components/profile";
import AddInstance from "./pages/addNewInstancePage";
import Dashboard from './pages/dashboard';
import DataVisPage from './pages/dataVisPage';
import DatabasePage from "./components/database/database";
import LoginModule from "./components/login/login";
import RegisterModule from "./components/register/register";
import useToken from './useToken';

function App() {
  const {token, setToken, resetToken} = useToken();

  if(!token) {
    return (
      <Routes>
        <Route path = '/' element={<LoginModule setToken={setToken} />}/>
        <Route path = '/register-page' element={<RegisterModule />}/>
        <Route path = '*' element={<Navigate to='/' replace />} />
      </Routes>
    )
  }

  return (
    <div>
        <Routes>
          <Route path = '/' element={<Dashboard resetToken = {resetToken} />} />
          <Route path = '/dashboard' element={<Dashboard resetToken = {resetToken} />} />
          <Route path = '/data-vis-page' element={<DataVisPage />} />
          <Route path = '/add-new-instance' element={<AddInstance />} />
          <Route path = '/profile' element={<ProfilePage />}/>
          <Route path = '/financial-report' element={<FinancialReport />}/>
          <Route path = '/database-page' element={<DatabasePage />}/>
          <Route path = '*' element={<Navigate to='/' replace />} />
        </Routes>
    </div>
  );
}

export default App;
