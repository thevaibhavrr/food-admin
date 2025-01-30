// import React, { useEffect, useState } from 'react';
// import "../../style/login.css"
// import { makeApi } from "../../api/callApi"
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link, useNavigate } from 'react-router-dom';

// function LoginForm() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Only set Islogin to true after successful login (but do not re-render login form).
//   const [isLogin, setIsLogin] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     // Validate form fields
//     if (!username) {
//       toast.error('Please fill username');
//       return;
//     }
//     if (!password) {
//       toast.error('Please fill password');
//       return;
//     }
  
//     try {
//       setLoading(true);
//       const response = await makeApi("/api/login-user", "POST", { password, username });
//       if (response.data.user.role === "admin") {
//         localStorage.setItem("token", response.data.token);
//         navigate("/admin/all-orders");
//       }
//       if (response.data.user.role === "supersaller" || response.data.user.role === "saller") {
//         localStorage.setItem("token", response.data.token);
//         navigate("/admin/allproducts");
//       }
//       if (response.data.user.role === "user" || response.data.user.role === "manager" || response.data.user.role === "delivryboy") {
//         console.log(response.data.user.role);
//         localStorage.setItem("token", response.data.token);
//         navigate("/admin/all-orders");
//       }
//     } catch (error) {
//       console.error('Error sending data:', error.response?.data);
//       toast.error(error.response?.data?.message || "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   // Check if a user is already logged in when the component mounts
//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       const checkUserRole = async () => {
//         try {
//           const response = await makeApi("/api/my-profile", "GET");
//           navigate("/admin/all-orders");
//         } catch (error) {
//           console.log(error);
//         }
//       }
//       checkUserRole();
//     }
//   }, [navigate]);

//   return (
//     <>
//       <ToastContainer autoClose={2000} />

//       <div className='main_login_page_div_admin'>
//         <form onSubmit={handleSubmit} className="form_main">
//           <p className="heading">Belivmart Admin</p>

//           {/* Username Input */}
//           <div className="inputContainer">
//             <input
//               type="text"
//               className="inputField"
//               id="username"
//               placeholder="Enter your username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>

//           {/* Password Input */}
//           <div className="inputContainer">
//             <input
//               type="password"
//               className="inputField"
//               id="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           {/* Submit Button */}
//           {loading ? (
//             <div className='loginloader'></div>
//           ) : (
//             !isLogin && (
//               <div className='w-100 text-center'>
//                 <button type="submit" id="button">Submit</button>
//               </div>
//             )
//           )}
//         </form>
//       </div>
//     </>
//   );
// }

// export default LoginForm;


import React, { useEffect, useState } from 'react';
import "../../style/login.css"
import { makeApi } from "../../api/callApi"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields
    if (!username) {
      toast.error('Please fill username');
      return;
    }
    if (!password) {
      toast.error('Please fill password');
      return;
    }

    try {
      setLoading(true);
      const response = await makeApi("/api/login-user", "POST", { password, username });
      
      console.log('Response from API:', response); // Debugging: Check the response

      if (response.data.user.role === "admin") {
        console.log('Navigating to /admin/all-orders'); // Debugging: Check role and navigation
        localStorage.setItem("token", response.data.token);
        navigate("/admin/all-orders");
      }
      if (response.data.user.role === "supersaller" || response.data.user.role === "saller") {
        console.log('Navigating to /admin/allproducts'); // Debugging: Check role and navigation
        localStorage.setItem("token", response.data.token);
        navigate("/admin/allproducts");
      }
      if (response.data.user.role === "user" || response.data.user.role === "manager" || response.data.user.role === "delivryboy") {
        console.log('Navigating to /admin/all-orders'); // Debugging: Check role and navigation
        localStorage.setItem("token", response.data.token);
        navigate("/admin/all-orders");
      }
    } catch (error) {
      console.error('Error sending data:', error.response?.data);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  // Check if a user is already logged in when the component mounts
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const checkUserRole = async () => {
        try {
          const response = await makeApi("/api/my-profile", "GET");
          console.log('User already logged in. Navigating to /admin/all-orders'); // Debugging: Check role and navigation
          navigate("/admin/all-orders");
        } catch (error) {
          console.log(error);
        }
      }
      checkUserRole();
    }
  }, [navigate]);

  return (
    <>
      <ToastContainer autoClose={2000} />

      <div className='main_login_page_div_admin'>
        <form onSubmit={handleSubmit} className="form_main">
          <p className="heading">Belivmart Admin</p>

          {/* Username Input */}
          <div className="inputContainer">
            <input
              type="text"
              className="inputField"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="inputContainer">
            <input
              type="password"
              className="inputField"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          {loading ? (
            <div className='loginloader'></div>
          ) : (
            !isLogin && (
              <div className='w-100 text-center'>
                <button type="submit" id="button">Submit</button>
              </div>
            )
          )}
        </form>
      </div>
    </>
  );
}

export default LoginForm;
