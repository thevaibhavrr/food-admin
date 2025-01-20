// import React, { useState } from 'react';
// import "../../style/adduser.css";
// import { makeApi } from "../../api/callApi";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from 'react-router-dom';

// function AddUserForm() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!username || !password) {
//       toast.error("Please fill all required fields.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await makeApi("/api/register-user", "POST", {
//         username,
//         mobileNumber,
//         password,
//         role
//       });
     
//     } catch (error) {
//       console.error("Error adding user:", error.response?.data);
//       toast.error(error.response?.data?.message || "An error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <ToastContainer autoClose={2000} />

//       <div className='add_user_page_main_login_page_div_admin'>
//         <form className="add_user_page_form_main">
//           <p className="add_user_page_heading">Add New User</p>

//           <div className="add_user_page_inputContainer">
//             <input
//               type="text"
//               className="add_user_page_inputField"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>

//           <div className="add_user_page_inputContainer">
//             <input
//               type="number"
//               className="add_user_page_inputField"
//               placeholder="Mobile Number"
//               value={mobileNumber}
//               onChange={(e) => setMobileNumber(e.target.value)}
//             />
//           </div>

//           <div className="add_user_page_inputContainer">
//             <input
//               type="password"
//               className="add_user_page_inputField"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <div className="add_user_page_inputContainer">
//             <select
//               className="add_user_page_inputField"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//             >
//               <option value="user">User</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           {loading ? (
//             <div className='add_user_page_loginloader'></div>
//           ) : (
//             <div className='add_user_page_w-100 add_user_page_text-center'>
//               <button id="add_user_page_button" onClick={(e) => handleSubmit(e)}>Add User</button>
//             </div>
//           )}
//         </form>
//       </div>
//     </>
//   );
// }

// export default AddUserForm;
import React, { useState, useEffect } from 'react';
import "../../style/adduser.css";
import { makeApi } from "../../api/callApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

function AddUserForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch existing users when component mounts
    const fetchUsers = async () => {
      try {
        const response = await makeApi("/api/get-all-users", "GET");
        setUsers(response.data.user);  // Assuming the API returns an array of users
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users.");
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await makeApi("/api/register-user", "POST", {
        username,
        mobileNumber,
        password,
        role
      });
      toast.success("User added successfully.");
      setUsers(prevUsers => [...prevUsers, response.data]); // Add the new user to the list
      setUsername("");
      setMobileNumber("");
      setPassword("");
      setRole("user");
    } catch (error) {
      console.error("Error adding user:", error.response?.data);
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    console.log("=-=-==-=",userId);
    
    if (window.confirm("Are you sure you want to delete this user?",userId)) {
      try {
        const response = await makeApi(`/api/delete-user/${userId}`, "DELETE");
        toast.success("User deleted successfully.");
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId)); // Remove deleted user from list
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("An error occurred while deleting the user.");
      }
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} />

      <div className='add_user_page_main_login_page_div_admin'>
        <div className="add_user_page_form_container">
          <form className="add_user_page_form_main">
            <p className="add_user_page_heading">Add New User</p>

            <div className="add_user_page_inputContainer">
              <input
                type="text"
                className="add_user_page_inputField"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="add_user_page_inputContainer">
              <input
                type="number"
                className="add_user_page_inputField"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>

            <div className="add_user_page_inputContainer">
              <input
                type="password"
                className="add_user_page_inputField"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="add_user_page_inputContainer">
              <select
                className="add_user_page_inputField"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {loading ? (
              <div className='add_user_page_loginloader'></div>
            ) : (
              <div className='add_user_page_w-100 add_user_page_text-center'>
                <button id="add_user_page_button" className='btn btn-warning' onClick={(e) => handleSubmit(e)}>Add User</button>
              </div>
            )}
          </form>
        </div>

        <div className="add_user_page_existing_users">
          <h3>Existing Users</h3>
          {users.length > 0 ? (
            <ul className="add_user_page_user_list">
              {users.map(user => (
                <li key={user.id} className="add_user_page_user_item">
                  <span>{user.username} ({user.role})</span>
                  <button 
                    onClick={() => handleDelete(user._id)} 
                    className="add_user_page_delete_button">
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default AddUserForm;
