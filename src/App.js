import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./components/profile";
import AddInstance from "./pages/addNewInstancePage";
import Dashboard from './pages/dashboard';
import DataVisPage from './pages/dataVisPage';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
