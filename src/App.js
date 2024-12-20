import './App.css';
import { Route, Routes } from "react-router-dom"; 
import Admin from './AdminPages/Admin';

function App() {
  return (
    <div>
       <Routes>
       <Route
					path="/admin/*"
					element={<Admin />}
				/>
      </Routes>
    </div>
  );
}

export default App;

