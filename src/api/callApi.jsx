import axios from "axios";
import { useNavigate } from "react-router-dom";
export const makeApi = async (
  endpoint,
  method = "GET",
  data
) => {
  try {
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    };

    const config = {
      method,
      // url: `https://test.ritaz.in${endpoint}`, 
      // url: `https://new-food-backend-fdoa.onrender.com${endpoint}`,
      // url: `https://belivmart-user.onrender.com${endpoint}`,
      
      
      // url:"http://localhost:5008"+endpoint, 
      // new
      url: `https://belivmart-backend.onrender.com${endpoint}`,
      headers,
      data
    };

    const response = await axios(config);
    return response;
  } catch (error) {
    if (error.response?.data?.message === "Please login to access this resource") {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    console.error("API request failed:", error.response.data);
    throw error;
  }
};
