import "./App.css";
import { Route, Routes } from "react-router-dom";
import Admin from "./AdminPages/Admin";
import Adminsidebar from "./AdminComponents/slidebar/adminsidebar";
import Admindasboard from "./AdminComponents/dasboard/admindasboard";
import TodayReport from "./AdminComponents/dasboard/Todayreport";
import Adduser from "./AdminComponents/User/Adduser";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />{" "}
        <Route path="/" element={<Admin />} />{" "}
        <Route path="/s" element={<Adduser />} />{" "}
        {/* <Route path="/" element={<Admindasboard />} /> */}
        {/* <Route path="/today" element={<TodayReport />} /> */}
      </Routes>
    </div>
  );
}

export default App;
