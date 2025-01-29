import "./App.css";
import { Route, Routes } from "react-router-dom";
import Admin from "./AdminPages/Admin";
import Admindasboard from "./AdminComponents/dasboard/admindasboard";
import TodayReport from "./AdminComponents/dasboard/Todayreport";
import Adduser from "./AdminComponents/User/Adduser";
import LoginForm from "../src/components/auth/login";


function App() {
 
// console.log("hello");
const apiUrl = process.env.REACT_APP_AWS_BUCKET_NAME;
console.log(apiUrl);

  return (
    <div>
      <Routes>
      <Route path="/" element={<LoginForm />} />

        <Route path="/admin/*" element={<Admin />} />{" "}
        <Route path="/s" element={<Adduser />} />{" "}
        <Route path="/admin" element={<Admindasboard />} />
        {/* <Route path="/today" element={<TodayReport />} /> */}
      </Routes>
    </div>
  );
}

export default App;
