import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashboard';
import DataVisPage from './pages/dataVisPage';

function App() {
  return (
    <div className="mx-16">
      <BrowserRouter>
        <Routes>
          <Route path = '/' element={<Dashboard />} />
          <Route path = '/dashboard' element={<Dashboard />} />
          <Route path = '/data-vis-page' element={<DataVisPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
