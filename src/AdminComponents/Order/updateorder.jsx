// import React, { useState, useEffect } from "react";
// import { makeApi } from "../../api/callApi";
// import "../../adminCss/order/updateorder.css";
// import { ToastContainer, toast } from "react-toastify";

// import Loader from "../../components/loader/loader";

// const UpdateOrderPopup = ({ orderId, onClose }) => {
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [updatedOrderData, setUpdatedOrderData] = useState({
//     paymentMethod: "",
//     deliveredAt: "",
//     status: "",
//     deliveredBy: "",
//   });
//   const [users, setUsers] = useState([]);


//   useEffect(() => {
//     // Fetch existing users when component mounts
//     const fetchUsers = async () => {
//       try {
//         const response = await makeApi("/api/get-all-users", "GET");
//         setUsers(response.data.user);  // Assuming the API returns an array of users
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         toast.error("Failed to load users.");
//       }
//     };

//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       setLoading(true);
//       try {
//         const response = await makeApi(
//           `/api/get-second-order-by-id/${orderId}`,
//           "GET"
//         );
//         const orderData = response.data.order;
//         setOrder(orderData);
//         setUpdatedOrderData({
//           paymentMethod: orderData?.paymentMethod,
//           deliveredAt: orderData?.deliveredAt
//             ? new Date(orderData?.deliveredAt).toISOString().slice(0, 16)
//             : "",
//           status: orderData.status,
//           deliveredBy: orderData?.deliveredBy || "",
//         });
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, [orderId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedOrderData({
//       ...updatedOrderData,
//       [name]: value,
//     });
//   };

//   const handleUpdateOrder = async () => {
//     try {
//       const response = await makeApi(
//         `/api/update-second-order-by-id/${orderId}`,
//         "PUT",
//         updatedOrderData
//       );
//       console.log(response, "updated");
//       onClose(); // Close popup after updating
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleClose = () => {
//     onClose();
//   };

//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="popup-container">
//       {order && (
//         <div className="popup-content-for-update-page">
//           <h2>Update Order</h2>
//           <div className="update_page_payment_details">
//             <h3>Payment Details:</h3>
//             {/* Payment Method Dropdown */}
//             <label>Payment Method:</label>
//             <select
//               name="paymentMethod"
//               className="update_order_input_fileds"
//               value={updatedOrderData?.paymentMethod}
//               onChange={handleInputChange}
//             >
//               <option value="">Select Payment Method</option>
//               <option value="COD">COD</option>
//               <option value="Online">Online</option>
//             </select>

//             <div>
//               <label>Delivered At:</label>
//               <input
//                 type="datetime-local"
//                 className="update_order_input_fileds"
//                 name="deliveredAt"
//                 value={updatedOrderData?.deliveredAt}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div>
//               <label>Status:</label>
//               <select
//                 name="status"
//                 className="update_order_input_fileds"
//                 value={updatedOrderData?.status}
//                 onChange={handleInputChange}
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="Cancelled">Cancelled</option>
//                 <option value="Delivered">Delivered</option>
//                 <option value="Shipped">Shipped</option>
//               </select>
//             </div>

//             {/* Show "Delivered By" dropdown if status is "Delivered" */}
//             {updatedOrderData?.status === "Delivered" && (
//               <div>
//                 <label>Delivered By:</label>
//                 <select
//                   name="deliveredBy"
//                   className="update_order_input_fileds"
//                   value={updatedOrderData?.deliveredBy}
//                   onChange={handleInputChange}
//                 >
//                   <option value="" disabled>Select Deliverer</option>
//                   <option value="Sunil">Sunil</option>
//                   <option value="Shivam">Shivam</option>
//                   <option value="Ritesh">Ritesh</option>
//                   <option value="VM">VM</option>
//                 </select>
//               </div>
//             )}
//           </div>

//           <div className="button-group">
//             <button onClick={handleClose}>Close</button>
//             <button onClick={handleUpdateOrder}>Update Order</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpdateOrderPopup;

// import React, { useState, useEffect } from "react";
// import { makeApi } from "../../api/callApi";
// import "../../adminCss/order/updateorder.css";
// import { ToastContainer, toast } from "react-toastify";

// import Loader from "../../components/loader/loader";

// const UpdateOrderPopup = ({ orderId, onClose }) => {
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [updatedOrderData, setUpdatedOrderData] = useState({
//     paymentMethod: "",
//     deliveredAt: "",
//     status: "",
//     deliveredBy: "",
//   });
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Fetch existing users when component mounts
//     const fetchUsers = async () => {
//       try {
//         const response = await makeApi("/api/get-all-users", "GET");
//         setUsers(response.data.user);  // Assuming the API returns an array of users
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         toast.error("Failed to load users.");
//       }
//     };

//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       setLoading(true);
//       try {
//         const response = await makeApi(
//           `/api/get-second-order-by-id/${orderId}`,
//           "GET"
//         );
//         const orderData = response.data.order;
//         setOrder(orderData);
//         setUpdatedOrderData({
//           paymentMethod: orderData?.paymentMethod,
//           deliveredAt: orderData?.deliveredAt
//             ? new Date(orderData?.deliveredAt).toISOString().slice(0, 16)
//             : "",
//           status: orderData.status,
//           deliveredBy: orderData?.deliveredBy || "",
//         });
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, [orderId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedOrderData({
//       ...updatedOrderData,
//       [name]: value,
//     });
//   };

//   const handleUpdateOrder = async () => {
//     try {
//       const response = await makeApi(
//         `/api/update-second-order-by-id/${orderId}`,
//         "PUT",
//         updatedOrderData
//       );
//       console.log(response, "updated");
//       onClose(); // Close popup after updating
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleClose = () => {
//     onClose();
//   };

//   // Handle status change and update deliveredAt automatically if status is 'Delivered'
//   const handleStatusChange = (e) => {
//     const { value } = e.target;
//     setUpdatedOrderData((prevData) => {
//       const newData = { ...prevData, status: value };
//       if (value === "Delivered") {
//         newData.deliveredAt = new Date().toISOString().slice(0, 16); // Set current time
//       }
//       return newData;
//     });
//   };

//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="popup-container">
//       {order && (
//         <div className="popup-content-for-update-page">
//           <h2>Update Order</h2>
//           <div className="update_page_payment_details">
//             <h3>Payment Details:</h3>
//             {/* Payment Method Dropdown */}
//             <label>Payment Method:</label>
//             <select
//               name="paymentMethod"
//               className="update_order_input_fileds"
//               value={updatedOrderData?.paymentMethod}
//               onChange={handleInputChange}
//             >
//               <option value="">Select Payment Method</option>
//               <option value="COD">COD</option>
//               <option value="Online">Online</option>
//             </select>

//             {/* Removed Delivered At input */}
//             {updatedOrderData?.status === "Delivered" && (
//               <div>
//                 <label>Delivered At:</label>
//                 <input
//                   type="datetime-local"
//                   className="update_order_input_fileds"
//                   name="deliveredAt"
//                   value={updatedOrderData?.deliveredAt}
//                   disabled
//                 />
//               </div>
//             )}

//             <div>
//               <label>Status:</label>
//               <select
//                 name="status"
//                 className="update_order_input_fileds"
//                 value={updatedOrderData?.status}
//                 onChange={handleStatusChange} // Use new handler to auto-update deliveredAt
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="Cancelled">Cancelled</option>
//                 <option value="Delivered">Delivered</option>
//                 <option value="Shipped">Shipped</option>
//               </select>
//             </div>

//             {/* Show "Delivered By" dropdown if status is "Delivered" */}
//             {updatedOrderData?.status === "Delivered" && (
//               <div>
//                 <label>Delivered By:</label>
//                 <select
//                   name="deliveredBy"
//                   className="update_order_input_fileds"
//                   value={updatedOrderData?.deliveredBy}
//                   onChange={handleInputChange}
//                 >
//                   <option value="" disabled>Select Deliverer</option>
//                   <option value="Sunil">Sunil</option>
//                   <option value="Shivam">Shivam</option>
//                   <option value="Ritesh">Ritesh</option>
//                   <option value="VM">VM</option>
//                 </select>
//               </div>
//             )}
//           </div>

//           <div className="button-group">
//             <button onClick={handleClose}>Close</button>
//             <button onClick={handleUpdateOrder}>Update Order</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpdateOrderPopup;

import React, { useState, useEffect } from "react";
import { makeApi } from "../../api/callApi";
import "../../adminCss/order/updateorder.css";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/loader/loader";

const UpdateOrderPopup = ({ orderId, onClose }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatedOrderData, setUpdatedOrderData] = useState({
    paymentMethod: "",
    deliveredAt: "",
    status: "",
    deliveredBy: "",
  });
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  console.log(user);
 useEffect(() => {
    if (localStorage.getItem("token")) {
      const checkUserRole = async () => {
        try {
          const response = await makeApi("/api/my-profile", "GET");
          setUser(response.data.user); // Set the user's role to state
        } catch (error) {
          console.log(error);
        }
      };
      checkUserRole();
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await makeApi("/api/get-all-users", "GET");
        setUsers(response.data.user);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users.");
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const response = await makeApi(
          `/api/get-second-order-by-id/${orderId}`,
          "GET"
        );
        const orderData = response.data.order;
        setOrder(orderData);
        setUpdatedOrderData({
          paymentMethod: orderData?.paymentMethod,
          status: orderData.status,
          deliveredBy: orderData?.deliveredBy || "",
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOrderData({
      ...updatedOrderData,
      [name]: value,
    });
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setUpdatedOrderData((prevData) => ({
      ...prevData,
      status: value,
      deliveredAt: value === "Delivered" ? new Date().toISOString() : "",
    }));
  };

  const handleUpdateOrder = async () => {
    try {
      await makeApi(`/api/update-second-order-by-id/${orderId}`, "PUT", updatedOrderData);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="popup-container">
      {order && (
        <div className="popup-content-for-update-page">
          <h2>Update Order</h2>
          <div className="update_page_payment_details">
            <h3>Payment Details:</h3>
            <label>Payment Method:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={updatedOrderData.paymentMethod === "COD"}
                  onChange={handleInputChange}
                />
                COD
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Online"
                  checked={updatedOrderData.paymentMethod === "Online"}
                  onChange={handleInputChange}
                />
                Online
              </label>
            </div>

            <label>Status:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Pending"
                  checked={updatedOrderData.status === "Pending"}
                  onChange={handleStatusChange}
                />
                Pending
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Cancelled"
                  checked={updatedOrderData.status === "Cancelled"}
                  onChange={handleStatusChange}
                />
                Cancelled
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Delivered"
                  checked={updatedOrderData.status === "Delivered"}
                  onChange={handleStatusChange}
                />
                Delivered
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Shipped"
                  checked={updatedOrderData.status === "Shipped"}
                  onChange={handleStatusChange}
                />
                Shipped
              </label>
            </div>

            {updatedOrderData.status === "Delivered" && (
              <div>
                <label>Delivered By:</label>
                <div className="radio-group">
                  {["Sunil", "Shivam", "Ritesh", "VM"].map((name) => (
                    <label key={name}>
                      <input
                        type="radio"
                        name="deliveredBy"
                        value={name}
                        checked={updatedOrderData.deliveredBy === name}
                        onChange={handleInputChange}
                      />
                      {name}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="button-group">
            <button onClick={handleClose}>Close</button>
            <button onClick={handleUpdateOrder}>Update Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateOrderPopup;
