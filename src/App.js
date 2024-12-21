import './App.css';
import { Route, Routes } from "react-router-dom"; 
import Admin from './AdminPages/Admin';
import Adminsidebar from './AdminComponents/slidebar/adminsidebar';

function App() {
  return (
    <div>
       <Routes>
       <Route
					path="/admin/*"
					element={<Admin />}
				/> <Route
        path="/"
        element={<Adminsidebar />}
      />
      </Routes>
    </div>
  );
}

export default App;

