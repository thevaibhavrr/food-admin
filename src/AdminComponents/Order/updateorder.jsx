
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


  useEffect(() => {
    if (localStorage.getItem("token")) {
      const checkUserRole = async () => {
        try {
          const response = await makeApi("/api/my-profile", "GET");
          setUser(response?.data?.user); // Set the logged-in user to state
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
        const allUsers = await response?.data?.user;
        if (user?.role === "admin") {
          await setUsers(allUsers);
        } else if (user?.role === "delivryboy") {
          await setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users.");
      }
    };
    fetchUsers();
  }, [updatedOrderData]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const response = await makeApi(
          `/api/get-second-order-by-id/${orderId}`,
          "GET"
        );
        const orderData = response?.data?.order;
        setOrder(orderData);

        setUpdatedOrderData((prevData) => ({
          ...prevData,
          paymentMethod: orderData?.paymentMethod || "",
          status: orderData?.status || "",
          deliveredBy: orderData?.deliveredBy ||user?.username || "",
        }));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrderDetails();
  }, [orderId, user]);

  // Filter users to show only delivery boys
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
      await makeApi(
        `/api/update-second-order-by-id/${orderId}`,
        "PUT",
        updatedOrderData
      );
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
              {(user?.role === "admin" || user?.role === "manager") && (
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
              )}
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

            {updatedOrderData?.status === "Delivered" && (
              <div>
                <label>Delivered By:</label>
                <div className="radio-group">
                  {users?.map((user) => (

                    <label key={user._id}>
                      <input
                        type="radio"
                        name="deliveredBy"
                        value={user?.username}
                        checked={updatedOrderData?.deliveredBy === user?.username}
                        onChange={handleInputChange}
                      />
                      {user?.username}
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
//   const [user, setUser] = useState(null);
//   const [activetab, setActivetab] = useState("1")


//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       const checkUserRole = async () => {
//         try {
//           const response = await makeApi("/api/my-profile", "GET");
//           setUser(response.data.user); // Set the logged-in user to state
//         } catch (error) {
//           console.log(error);
//         }
//       };
//       checkUserRole();
//     }
//   }, []);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await makeApi("/api/get-all-users", "GET");
//         const allUsers = await response.data.user;
//         if (user.role === "admin") {
//           await setUsers(allUsers);
//         } else if (user.role === "delivryboy") {
//           await setUsers([]);
//         }
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         toast.error("Failed to load users.");
//       }
//     };
//     fetchUsers();
//   }, [updatedOrderData]);

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

//         setUpdatedOrderData((prevData) => ({
//           ...prevData,
//           paymentMethod: orderData?.paymentMethod || "",
//           status: orderData?.status || "",
//           deliveredBy: orderData?.deliveredBy || user?.username || "",
//         }));
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user) fetchOrderDetails();
//   }, [orderId, user]);

//   const handleProductChange = (index, key, value) => {
//     const updatedProducts = [...updatedOrderData.products];
//     updatedProducts[index][key] = value;

//     if (key === "quantity" || key === "SingelProductPrice") {
//       updatedProducts[index].FinalPrice =
//         updatedProducts[index].quantity * updatedProducts[index].SingelProductPrice;
//     }

//     const newTotalAmount = updatedProducts.reduce(
//       (sum, product) => sum + product.FinalPrice,
//       0
//     );

//     setUpdatedOrderData((prev) => ({
//       ...prev,
//       products: updatedProducts,
//       totalAmount: newTotalAmount,
//     }));
//   };

//   const handleRemoveProduct = (index) => {
//     const updatedProducts = [...updatedOrderData.products];
//     updatedProducts.splice(index, 1);

//     const newTotalAmount = updatedProducts.reduce(
//       (sum, product) => sum + product.FinalPrice,
//       0
//     );

//     setUpdatedOrderData((prev) => ({
//       ...prev,
//       products: updatedProducts,
//       totalAmount: newTotalAmount,
//     }));
//   };


//   // Filter users to show only delivery boys
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedOrderData({
//       ...updatedOrderData,
//       [name]: value,
//     });
//   };

//   const handleStatusChange = (e) => {
//     const { value } = e.target;
//     setUpdatedOrderData((prevData) => ({
//       ...prevData,
//       status: value,
//       deliveredAt: value === "Delivered" ? new Date().toISOString() : "",
//     }));
//   };

//   const handleUpdateOrder = async () => {
//     try {
//       await makeApi(
//         `/api/update-second-order-by-id/${orderId}`,
//         "PUT",
//         updatedOrderData
//       );
//       onClose();
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
//           {/* tab */}
//           <div>
//             <div onClick={() => setActivetab("1")} >order</div>
//             <div onClick={() => setActivetab("2")} >product</div>
//           </div>
//           {activetab === "1" && (
//             <div className="update_page_payment_details">
//               <h3>Payment Details:</h3>
//               <label>Payment Method:</label>
//               <div className="radio-group">
//                 <label>
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="COD"
//                     checked={updatedOrderData.paymentMethod === "COD"}
//                     onChange={handleInputChange}
//                   />
//                   COD
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="Online"
//                     checked={updatedOrderData.paymentMethod === "Online"}
//                     onChange={handleInputChange}
//                   />
//                   Online
//                 </label>
//               </div>

//               <label>Status:</label>
//               <div className="radio-group">
//                 <label>
//                   <input
//                     type="radio"
//                     name="status"
//                     value="Pending"
//                     checked={updatedOrderData.status === "Pending"}
//                     onChange={handleStatusChange}
//                   />
//                   Pending
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="status"
//                     value="Cancelled"
//                     checked={updatedOrderData.status === "Cancelled"}
//                     onChange={handleStatusChange}
//                   />
//                   Cancelled
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="status"
//                     value="Delivered"
//                     checked={updatedOrderData.status === "Delivered"}
//                     onChange={handleStatusChange}
//                   />
//                   Delivered
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="status"
//                     value="Shipped"
//                     checked={updatedOrderData.status === "Shipped"}
//                     onChange={handleStatusChange}
//                   />
//                   Shipped
//                 </label>
//               </div>

//               {updatedOrderData.status === "Delivered" && (
//                 <div>
//                   <label>Delivered By:</label>
//                   <div className="radio-group">
//                     {users.map((user) => (

//                       <label key={user._id}>
//                         <input
//                           type="radio"
//                           name="deliveredBy"
//                           value={user.username}
//                           checked={updatedOrderData.deliveredBy === user.username}
//                           onChange={handleInputChange}
//                         />
//                         {user.username}
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {activetab === "2" && (
//             <div className="update_page_product_details">
//               <h3>Product Details:</h3>
//               {updatedOrderData.products.map((product, index) => (
//                 <div key={index}>
//                   <label>Product Name:</label>
//                   <input
//                     type="text"
//                     name="productName"
//                     value={product.productName}
//                     onChange={(e) =>
//                       handleProductChange(index, "productName", e.target.value)
//                     }
//                   />
//                   <label>Quantity:</label>
//                   <input
//                     type="number"
//                     name="quantity"
//                     value={product.quantity}
//                     onChange={(e) =>
//                       handleProductChange(index, "quantity", Number(e.target.value))
//                     }
//                   />
//                   <label>Price Per Item:</label>
//                   <input
//                     type="number"
//                     name="SingelProductPrice"
//                     value={product.SingelProductPrice}
//                     onChange={(e) =>
//                       handleProductChange(index, "SingelProductPrice", Number(e.target.value))
//                     }
//                   />
//                   <p>Final Price: {product.FinalPrice}</p>
//                 </div>
//               ))}
//             </div>
//           )}

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
//     products: [],
//     totalAmount: 0,
//   });

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       setLoading(true);
//       try {
//         const response = await makeApi(`/api/get-second-order-by-id/${orderId}`, "GET");
//         const orderData = response.data.order;
//         setOrder(orderData);
//         setUpdatedOrderData({
//           paymentMethod: orderData?.paymentMethod || "",
//           status: orderData?.status || "",
//           deliveredBy: orderData?.deliveredBy || "",
//           products: orderData?.products || [],
//           totalAmount: orderData?.totalAmount || 0,
//         });
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrderDetails();
//   }, [orderId]);

//   const handleProductChange = (index, key, value) => {
//     const updatedProducts = [...updatedOrderData.products];
//     updatedProducts[index][key] = value;

//     if (key === "quantity" || key === "SingelProductPrice") {
//       updatedProducts[index].FinalPrice =
//         updatedProducts[index].quantity * updatedProducts[index].SingelProductPrice;
//     }

//     const newTotalAmount = updatedProducts.reduce(
//       (sum, product) => sum + product.FinalPrice,
//       0
//     );

//     setUpdatedOrderData((prev) => ({
//       ...prev,
//       products: updatedProducts,
//       totalAmount: newTotalAmount,
//     }));
//   };

//   const handleRemoveProduct = (index) => {
//     const updatedProducts = [...updatedOrderData.products];
//     updatedProducts.splice(index, 1);

//     const newTotalAmount = updatedProducts.reduce(
//       (sum, product) => sum + product.FinalPrice,
//       0
//     );

//     setUpdatedOrderData((prev) => ({
//       ...prev,
//       products: updatedProducts,
//       totalAmount: newTotalAmount,
//     }));
//   };

//   const handleUpdateOrder = async () => {
//     try {
//       await makeApi(`/api/update-second-order-by-id/${orderId}`, "PUT", updatedOrderData);
//       toast.success("Order updated successfully");
//       onClose();
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to update order");
//     }
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
//           <div className="order-products">
//             <h3>Products:</h3>
//             {updatedOrderData.products.map((product, index) => (
//               <div key={product._id} className="product-item">
//                 {/* prodcut name  */}
//                 <p>Name: {product.name}</p>
//                 <p>Shop: {product.shopname}</p>
//                 <label>Quantity:</label>
//                 <input
//                   type="number"
//                   value={product.quantity}
//                   onChange={(e) => handleProductChange(index, "quantity", Number(e.target.value))}
//                 />
//                 <label>Price Per Item:</label>
//                 <input
//                   type="number"
//                   value={product.SingelProductPrice}
//                   onChange={(e) => handleProductChange(index, "SingelProductPrice", Number(e.target.value))}
//                 />
//                 <p>Final Price: {product.FinalPrice}</p>
//                 <button onClick={() => handleRemoveProduct(index)}>Remove</button>
//               </div>
//             ))}
//           </div>
//           <h3>Total Amount: {updatedOrderData.totalAmount}</h3>
//           <div className="button-group">
//             <button onClick={onClose}>Close</button>
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
//   const [activeTab, setActiveTab] = useState("-1");
//   const [updatedOrderData, setUpdatedOrderData] = useState({
//     paymentMethod: "",
//     deliveredAt: "",
//     status: "",
//     deliveredBy: "",
//     products: [],
//     totalAmount: 0,
//   });
//   const [users, setUsers] = useState([]);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       const checkUserRole = async () => {
//         try {
//           const response = await makeApi("/api/my-profile", "GET");
//           setUser(response.data.user);
//         } catch (error) {
//           console.log(error);
//         }
//       };
//       checkUserRole();
//     }
//   }, []);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       setLoading(true);
//       try {
//         const response = await makeApi(`/api/get-second-order-by-id/${orderId}`, "GET");
//         const orderData = response.data.order;
//         setOrder(orderData);
//         setUpdatedOrderData({
//           paymentMethod: orderData?.paymentMethod || "",
//           status: orderData?.status || "",
//           deliveredBy: orderData?.deliveredBy || "",
//           products: orderData?.products || [],
//           totalAmount: orderData?.totalAmount || 0,
//         });
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (user) fetchOrderDetails();
//   }, [orderId, user]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedOrderData({
//       ...updatedOrderData,
//       [name]: value,
//     });
//   };

//   const handleStatusChange = (e) => {
//     const { value } = e.target;
//     setUpdatedOrderData((prevData) => ({
//       ...prevData,
//       status: value,
//       deliveredAt: value === "Delivered" ? new Date().toISOString() : "",
//     }));
//   };

//   const handleProductChange = (index, key, value) => {
//     const updatedProducts = [...updatedOrderData.products];
//     updatedProducts[index][key] = value;
//     if (key === "quantity" || key === "SingelProductPrice") {
//       updatedProducts[index].FinalPrice = updatedProducts[index].quantity * updatedProducts[index].SingelProductPrice;
//     }
//     const newTotalAmount = updatedProducts.reduce((sum, product) => sum + product.FinalPrice, 0);
//     setUpdatedOrderData((prev) => ({ ...prev, products: updatedProducts, totalAmount: newTotalAmount }));
//   };

//   const handleUpdateOrder = async () => {
//     try {
//       await makeApi(`/api/update-second-order-by-id/${orderId}`, "PUT", updatedOrderData);
//       toast.success("Order updated successfully");
//       onClose();
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to update order");
//     }
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
//       <div className="tabs">
//         <button onClick={() => setActiveTab("1")}>Order Details</button>
//         <button onClick={() => setActiveTab("2")}>Order & Product Details</button>
//       </div>

//       {activeTab === "1" && (
//         <div className="popup-content-for-update-page">
//           <h2>Update Order</h2>
//           <label>Payment Method:</label>
//           <div className="radio-group">
//             <label><input type="radio" name="paymentMethod" value="COD" checked={updatedOrderData.paymentMethod === "COD"} onChange={handleInputChange} /> COD</label>
//             <label><input type="radio" name="paymentMethod" value="Online" checked={updatedOrderData.paymentMethod === "Online"} onChange={handleInputChange} /> Online</label>
//           </div>
//           <label>Status:</label>
//           <div className="radio-group">
//             <label><input type="radio" name="status" value="Pending" checked={updatedOrderData.status === "Pending"} onChange={handleStatusChange} /> Pending</label>
//             <label><input type="radio" name="status" value="Delivered" checked={updatedOrderData.status === "Delivered"} onChange={handleStatusChange} /> Delivered</label>
//           </div>
//           <button onClick={handleUpdateOrder}>Update Order</button>
//         </div>
//       )}

//       {activeTab === "2" && (
//         <div className="order-products">
//           <h2>Update Order & Products</h2>
//           {updatedOrderData.products.map((product, index) => (
//             <div key={product._id} className="product-item">
//               <p>Name: {product.name}</p>
//               <label>Quantity:</label>
//               <input type="number" value={product.quantity} onChange={(e) => handleProductChange(index, "quantity", Number(e.target.value))} />
//               <label>Price Per Item:</label>
//               <input type="number" value={product.SingelProductPrice} onChange={(e) => handleProductChange(index, "SingelProductPrice", Number(e.target.value))} />
//               <p>Final Price: {product.FinalPrice}</p>
//             </div>
//           ))}
//           <h3>Total Amount: {updatedOrderData.totalAmount}</h3>
//           <button onClick={handleUpdateOrder}>Update Order</button>
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
//   const [activeTab, setActiveTab] = useState("1");
//   const [updatedOrderData, setUpdatedOrderData] = useState({
//     paymentMethod: "",
//     deliveredAt: "",
//     status: "",
//     deliveredBy: "",
//     products: [],
//     totalAmount: 0,
//   });
//   const [users, setUsers] = useState([]);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       const checkUserRole = async () => {
//         try {
//           const response = await makeApi("/api/my-profile", "GET");
//           setUser(response.data.user);
//         } catch (error) {
//           console.log(error);
//         }
//       };
//       checkUserRole();
//     }
//   }, []);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       setLoading(true);
//       try {
//         const response = await makeApi(`/api/get-second-order-by-id/${orderId}`, "GET");
//         const orderData = response.data.order;
//         setOrder(orderData);
//         setUpdatedOrderData({
//           paymentMethod: orderData?.paymentMethod || "",
//           status: orderData?.status || "",
//           deliveredBy: orderData?.deliveredBy || "",
//           products: orderData?.products || [],
//           totalAmount: orderData?.totalAmount || 0,
//         });
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (user) fetchOrderDetails();
//   }, [orderId, user]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedOrderData({
//       ...updatedOrderData,
//       [name]: value,
//     });
//   };

//   const handleStatusChange = (e) => {
//     const { value } = e.target;
//     setUpdatedOrderData((prevData) => ({
//       ...prevData,
//       status: value,
//       deliveredAt: value === "Delivered" ? new Date().toISOString() : "",
//     }));
//   };

//   const handleProductChange = (index, key, value) => {
//     const updatedProducts = [...updatedOrderData.products];
//     updatedProducts[index][key] = value;

//     // Recalculate FinalPrice when quantity or price changes
//     if (key === "quantity" || key === "SingelProductPrice") {
//       updatedProducts[index].FinalPrice = updatedProducts[index].quantity * updatedProducts[index].SingelProductPrice;
//     }

//     // Recalculate totalAmount
//     const newTotalAmount = updatedProducts.reduce((sum, product) => sum + product.FinalPrice, 0);
//     setUpdatedOrderData((prev) => ({
//       ...prev,
//       products: updatedProducts,
//       totalAmount: newTotalAmount,
//     }));
//   };

//   const handleUpdateOrder = async () => {
//     try {
//       await makeApi(`/api/update-second-order-by-id/${orderId}`, "PUT", updatedOrderData);
//       toast.success("Order updated successfully");
//       onClose();
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to update order");
//     }
//   };

//   const handleAddProduct = () => {
//     const newProduct = {
//       name: "",
//       quantity: 1,
//       SingelProductPrice: 0,
//       FinalPrice: 0,
//     };
//     setUpdatedOrderData((prev) => ({
//       ...prev,
//       products: [...prev.products, newProduct],
//     }));
//   };

//   const handleRemoveProduct = (index) => {
//     const updatedProducts = [...updatedOrderData.products];
//     updatedProducts.splice(index, 1);

//     // Recalculate totalAmount after product removal
//     const newTotalAmount = updatedProducts.reduce((sum, product) => sum + product.FinalPrice, 0);
//     setUpdatedOrderData((prev) => ({
//       ...prev,
//       products: updatedProducts,
//       totalAmount: newTotalAmount,
//     }));
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
//       <div className="update_order_popup_container" >
//         {user && (user.role === "admin" || user.role === "manager") && (

//           <div className="tabs">
//             <button onClick={() => setActiveTab("1")}>Order Details</button>
//             <button onClick={() => setActiveTab("2")}>Order & Product Details</button>
//           </div>
//         )}

//         {activeTab === "1" && (
//           <div className="popup-content-for-update-page">
//             <h2>Update Order</h2>
//             <label>Payment Method:</label>
//             <div className="radio-group">
//               <label>
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="COD"
//                   checked={updatedOrderData.paymentMethod === "COD"}
//                   onChange={handleInputChange}
//                 />
//                 COD
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="Online"
//                   checked={updatedOrderData.paymentMethod === "Online"}
//                   onChange={handleInputChange}
//                 />
//                 Online
//               </label>
//             </div>
//             <label>Status:</label>
//             <div className="radio-group">
//               <label>
//                 <input
//                   type="radio"
//                   name="status"
//                   value="Pending"
//                   checked={updatedOrderData.status === "Pending"}
//                   onChange={handleStatusChange}
//                 />
//                 Pending
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="status"
//                   value="Delivered"
//                   checked={updatedOrderData.status === "Delivered"}
//                   onChange={handleStatusChange}
//                 />
//                 Delivered
//               </label>
//             </div>
//             <button onClick={handleUpdateOrder}>Update Order</button>
//           </div>
//         )}

//         {activeTab === "2" && (
//           <div className="order-products">
//             <h2>Update Order & Products</h2>
//             {updatedOrderData.products.map((product, index) => (
//               <div key={index} className="product-item">
//                 <label>Product Name:</label>
//                 {/* <p>{product.name}</p> */}
//                 <input
//                   type="text"
//                   value={product.name}
//                   onChange={(e) => handleProductChange(index, "name", e.target.value)}
//                 />
//                 <label>Quantity:</label>
//                 <input
//                   type="number"
//                   value={product.quantity}
//                   onChange={(e) => handleProductChange(index, "quantity", Number(e.target.value))}
//                 />
//                 <label>Price Per Item:</label>
//                 <input
//                   type="number"
//                   value={product.SingelProductPrice}
//                   onChange={(e) => handleProductChange(index, "SingelProductPrice", Number(e.target.value))}
//                 />
//                 <p>Final Price: {product.FinalPrice}</p>
//                 <button onClick={() => handleRemoveProduct(index)}>Remove Product</button>
//               </div>
//             ))}
//             <button onClick={handleAddProduct}>Add Product</button>
//             <h3>Total Amount: {updatedOrderData.totalAmount}</h3>

//            <div className="button-group">

//             <button onClick={handleUpdateOrder}>Update Order</button>
//             <button onClick={onClose}>Close</button>
//             </div>
//           </div>
//         )}
//       </div>
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
//   const [activeTab, setActiveTab] = useState("1");
//   const [updatedOrderData, setUpdatedOrderData] = useState({
//     paymentMethod: "",
//     deliveredAt: "",
//     status: "",
//     deliveredBy: "",
//     products: [],
//     totalAmount: 0,
//   });
//   const [users, setUsers] = useState([]);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       const checkUserRole = async () => {
//         try {
//           const response = await makeApi("/api/my-profile", "GET");
//           setUser(response.data.user);
//         } catch (error) {
//           console.log(error);
//         }
//       };
//       checkUserRole();
//     }
//   }, []);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       setLoading(true);
//       try {
//         const response = await makeApi(`/api/get-second-order-by-id/${orderId}`, "GET");
//         const orderData = response.data.order;
//         setOrder(orderData);
//         setUpdatedOrderData({
//           paymentMethod: orderData?.paymentMethod || "",
//           status: orderData?.status || "",
//           deliveredBy: orderData?.deliveredBy || "",
//           products: orderData?.products || [],
//           totalAmount: orderData?.totalAmount || 0,
//         });
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (user) fetchOrderDetails();
//   }, [orderId, user]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedOrderData({
//       ...updatedOrderData,
//       [name]: value,
//     });
//   };

//   const handleStatusChange = (e) => {
//     const { value } = e.target;
//     setUpdatedOrderData((prevData) => ({
//       ...prevData,
//       status: value,
//       deliveredAt: value === "Delivered" ? new Date().toISOString() : "",
//     }));
//   };

//   const handleProductChange = (index, key, value) => {
//     const updatedProducts = [...updatedOrderData.products];
//     updatedProducts[index][key] = value;

//     // Recalculate FinalPrice when quantity or price changes
//     if (key === "quantity" || key === "SingelProductPrice") {
//       updatedProducts[index].FinalPrice = updatedProducts[index].quantity * updatedProducts[index].SingelProductPrice;
//     }

//     // Recalculate totalAmount
//     const newTotalAmount = updatedProducts.reduce((sum, product) => sum + product.FinalPrice, 0);
//     setUpdatedOrderData((prev) => ({
//       ...prev,
//       products: updatedProducts,
//       totalAmount: newTotalAmount,
//     }));
//   };

//   const handleAddProduct = () => {
//     const newProduct = {
//       name: "",
//       quantity: 1,
//       SingelProductPrice: 0,
//       FinalPrice: 0,
//       image: null, // New image property
//     };
//     setUpdatedOrderData((prev) => ({
//       ...prev,
//       products: [...prev.products, newProduct],
//     }));
//   };

//   const handleRemoveProduct = (index) => {
//     const updatedProducts = [...updatedOrderData.products];
//     updatedProducts.splice(index, 1);

//     // Recalculate totalAmount after product removal
//     const newTotalAmount = updatedProducts.reduce((sum, product) => sum + product.FinalPrice, 0);
//     setUpdatedOrderData((prev) => ({
//       ...prev,
//       products: updatedProducts,
//       totalAmount: newTotalAmount,
//     }));
//   };

//   const handleImageChange = (index, e) => {
//     const updatedProducts = [...updatedOrderData.products];
//     updatedProducts[index].image = e.target.files[0];

//     setUpdatedOrderData((prev) => ({
//       ...prev,
//       products: updatedProducts,
//     }));
//   };

//   const handleUpdateOrder = async () => {
//     try {
//       await makeApi(`/api/update-second-order-by-id/${orderId}`, "PUT", updatedOrderData);
//       toast.success("Order updated successfully");
//       onClose();
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to update order");
//     }
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
//       <div className="update_order_popup_container">
//         {user && (user.role === "admin" || user.role === "manager") && (
//           <div className="tabs">
//             <button onClick={() => setActiveTab("1")}>Order Details</button>
//             <button onClick={() => setActiveTab("2")}>Order & Product Details</button>
//           </div>
//         )}

//         {activeTab === "1" && (
//           <div className="popup-content-for-update-page">
//             <h2>Update Order</h2>
//             <label>Payment Method:</label>
//             <div className="radio-group">
//               <label>
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="COD"
//                   checked={updatedOrderData.paymentMethod === "COD"}
//                   onChange={handleInputChange}
//                 />
//                 COD
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="Online"
//                   checked={updatedOrderData.paymentMethod === "Online"}
//                   onChange={handleInputChange}
//                 />
//                 Online
//               </label>
//             </div>
//             <label>Status:</label>
//             <div className="radio-group">
//               <label>
//                 <input
//                   type="radio"
//                   name="status"
//                   value="Pending"
//                   checked={updatedOrderData.status === "Pending"}
//                   onChange={handleStatusChange}
//                 />
//                 Pending
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="status"
//                   value="Delivered"
//                   checked={updatedOrderData.status === "Delivered"}
//                   onChange={handleStatusChange}
//                 />
//                 Delivered
//               </label>
//             </div>
//             <button onClick={handleUpdateOrder}>Update Order</button>
//           </div>
//         )}

//         {activeTab === "2" && (
//           <div className="order-products  ">
//             <h2>Update Order & Products</h2>
//             {updatedOrderData.products.map((product, index) => (
//               <div key={index} className="product-item">
//                 <label>Product Name:</label>
//                 <input
//                   type="text"
//                   value={product.name}
//                   onChange={(e) => handleProductChange(index, "name", e.target.value)}
//                 />
//                 <label>Quantity:</label>
//                 <input
//                   type="number"
//                   value={product.quantity}
//                   onChange={(e) => handleProductChange(index, "quantity", Number(e.target.value))}
//                 />
//                 <label>Price Per Item:</label>
//                 <input
//                   type="number"
//                   value={product.SingelProductPrice}
//                   onChange={(e) => handleProductChange(index, "SingelProductPrice", Number(e.target.value))}
//                 />
//                 <p>Final Price: {product.FinalPrice}</p>

//                 <label>Product Image:</label>
//                 <input
//                   type="file"
//                   onChange={(e) => handleImageChange(index, e)}
//                 />
//                 <p>{product.image ? product.image.name : "No image uploaded"}</p>

//                 <button onClick={() => handleRemoveProduct(index)}>Remove Product</button>
//               </div>
//             ))}
//             <button onClick={handleAddProduct}>Add Product</button>
//             <h3>Total Amount: {updatedOrderData.totalAmount}</h3>
//             <button onClick={handleUpdateOrder}>Update Order</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UpdateOrderPopup;
