import { BrowserRouter, Routes, Route } from "react-router-dom";
import FinancialReport from "./components/financialReport";
import ProfilePage from "./components/profile";
import AddInstance from "./pages/addNewInstancePage";
import Dashboard from './pages/dashboard';
import DataVisPage from './pages/dataVisPage';
import DatabasePage from "./components/database/database";
import LoginModule from "./components/login/login";
import RegisterModule from "./components/register/register";
import React from "react";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element={<Dashboard />} />
          <Route path = '/dashboard' element={<Dashboard />} />
          <Route path = '/data-vis-page' element={<DataVisPage />} />
          <Route path = '/add-new-instance' element={<AddInstance />} />
          <Route path = '/profile' element={<ProfilePage />}/>
          <Route path = '/financial-report' element={<FinancialReport />}/>
          <Route path = '/database-page' element={<DatabasePage />}/>
          <Route path = '/login-page' element={<LoginModule />}/>
          <Route path = '/register-page' element={<RegisterModule />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
