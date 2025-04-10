// import React, { useEffect, useState } from "react";
// import "../../adminCss/order/allorder.css";
// import { makeApi } from "../../api/callApi";
// import UpdateOrderPopup from "./updateorder";
// import Loader from "../../components/loader/loader";
// import UpdateOrderProductPopup from "./updateproduct";

// function AllOrder() {
//   const [loading, setLoading] = useState(false);
//   const [orders, setOrders] = useState([]);
//   const [status, setStatus] = useState("Pending");
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const [selectedOrderIdforproduct, setSelectedOrderIdforproduct] = useState(null);

//   const [selectedStatus, setSelectedStatus] = useState("Pending");
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [orderToDelete, setOrderToDelete] = useState(null);
//   const [user, setUser] = useState(null); // Store user role


//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       const checkUserRole = async () => {
//         try {
//           const response = await makeApi("/api/my-profile", "GET");
//           setUser(response?.data?.user);
//         } catch (error) {
//           console.log(error);
//         }
//       };
//       checkUserRole();
//     }
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi(`/api/get-all-second-order?status=${status}`, "GET");
//       // reverse data
//       const ndata = response.data.orders;
//       setOrders(ndata);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [status]);



//   const handleStatusChange = (newStatus) => {
//     setStatus(newStatus);
//     setSelectedStatus(newStatus);
//   };

//   const handleOpenPopup = (orderId) => {
//     setSelectedOrderId(orderId);
//   };
//   const handleOpenPopupforproduct = (orderId) => {
//     setSelectedOrderIdforproduct(orderId);
//   };

//   const handleClose = () => {
//     setSelectedOrderId(null);
//   };
//   const handleCloseproduct = () => {
//     setSelectedOrderIdforproduct(null);
//   };

//   const handleOpenDeleteConfirm = (orderId) => {
//     setOrderToDelete(orderId);
//     setShowDeleteConfirm(true);
//   };

//   const handleCloseDeleteConfirm = () => {
//     setShowDeleteConfirm(false);
//     setOrderToDelete(null);
//   };

//   const handleDeleteOrder = async () => {
//     try {
//       // Call the API to delete the order here
//       await makeApi(`/api/delete-order/${orderToDelete}`, "DELETE");
//       setOrders(orders.filter((order) => order._id !== orderToDelete));
//       handleCloseDeleteConfirm();
//     } catch (error) {
//       console.log("Error deleting order", error);
//     }
//   };

//   const formatNumber = (number) => {
//     return Math.round(number).toString();
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleString(); // Converts the UTC date to local time
//   };

//   const handleSeenToggle = async (orderId) => {
//     try {
//       const updatedOrderData = { Isseen: "true", seenby: user?.username };
//       await makeApi(`/api/update-second-order-by-id/${orderId}`, "PUT", updatedOrderData);
//       fetchOrders(); // Refresh orders after update
//     } catch (error) {
//       console.error("Error updating Isseen:", error);
//     }
//   };

//   const handleCalledUpdate = async (orderId, calledValue) => {
//     try {
//       const updatedOrderData = { called: calledValue };
//       await makeApi(`/api/update-second-order-by-id/${orderId}`, "PUT", updatedOrderData);
//       fetchOrders(); // Refresh orders after update
//     } catch (error) {
//       console.error("Error updating called:", error);
//     }
//   };

//   // Add the refresh function here:
//   const handleRefresh = () => {
//     fetchOrders(); // This will reload the orders
//   };

//   return (
//     <div className="all-orders-container">
//       {/* Refresh Button */}
//       <button onClick={handleRefresh} className="refresh-button mb-3">
//         Refresh Orders
//       </button>

//       <div className="all_orders_status_buttons">
//         <button
//           className={`admin_add_product_button ${selectedStatus === "Pending" ? "selectedStatus" : ""}`}
//           onClick={() => handleStatusChange("Pending")}
//         >
//           Pending Orders
//         </button>
//         <button
//           className={`admin_add_product_button ${selectedStatus === "Cancelled" ? "selectedStatus" : ""}`}
//           onClick={() => handleStatusChange("Cancelled")}
//         >
//           Cancelled Orders
//         </button>
//         <button
//           className={`admin_add_product_button ${selectedStatus === "Shipped" ? "selectedStatus" : ""}`}
//           onClick={() => handleStatusChange("Shipped")}
//         >
//           Shipped Orders
//         </button>
//         <button
//           className={`admin_add_product_button ${selectedStatus === "Delivered" ? "selectedStatus" : ""}`}
//           onClick={() => handleStatusChange("Delivered")}
//         >
//           Delivered Orders
//         </button>
//       </div>

//       <div className="order-list">
//         {loading ? (
//           <Loader />
//         ) : (
//           <div className="main_order_list_container">
//             {orders.length === 0 ? (
//               <div className="no-orders-message">No Orders Available</div>
//             ) : (
//               orders.map((order) => (
//                 <div key={order._id} className="order_list_container">
//                   <div>
//                     {order.products.map((item) => (
//                       <div key={item._id} className="order_item_details">
//                         <div>
//                           <img
//                             loading="lazy"
//                             src={item?.productId?.thumbnail}
//                             alt={item?.productId?.name}
//                             className="all_order_thumbnail"
//                           />
//                         </div>
//                         <div>
//                           <p><b>Name:</b> {item?.productId?.name}</p>
//                           <p><b>Price:</b> ₹{item?.SingelProductPrice}</p>
//                           <p><b>Quantity:</b> {item?.quantity}</p>
//                           <p  ><b>Total:</b> ₹{item?.SingelProductPrice} × {item?.quantity} = ₹{item?.SingelProductPrice * item?.quantity} </p>
//                           {item?.shopname && <p><b>Shop Name:</b> <span style={{ backgroundColor: "red",color: "white", padding: "5px 10px", borderRadius: "5px" }}>{item?.shopname}</span></p>}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="order_details all_order_details">
//                     <div><b>Address:</b> {order.address}</div>
//                     {order.village && <div  ><b>Village:</b> <sapn className="bg-dark text-white w-50 px-3" > {order.village} </sapn> </div>}
//                     <div><b>Name:</b> {order?.username}</div>
//                     <div>
//                       <b>Mobile Number:</b>
//                       {order.mobileNumber}
//                       <a href={`tel:${order.mobileNumber}`} style={{ textDecoration: 'none', color: 'inherit' }}>

//                         <button style={{ marginLeft: "10px", backgroundColor: "yellow", padding: "5px 10px", borderRadius: "5px" }} >call</button>
//                       </a>
//                     </div>

//                     <div><b>Status:</b> {order.status}</div>
//                     <div className="btn btn-outline-dark" ><>Total Price:</> <b style={{ fontSize: '20px' }} > ₹{formatNumber(order.totalAmount)}</b></div>
//                     <div style={{ backgroundColor: "green", padding: "5px 10px", borderRadius: "5px" }}><b>Created At:</b> {formatDate(order.createdAt)}</div>

//                     <div> <b>delivered By:</b> <span style={{ backgroundColor: "yellow", padding: "5px 10px", borderRadius: "5px" }} > {order?.deliveredBy}</span> </div>
//                   </div>

//                   <div className="action-buttons">
//                     <label style={{ marginBottom: '10px' }} >
//                       <input
//                         type="checkbox"
//                         checked={order.Isseen === "true"}
//                         onChange={() => handleSeenToggle(order._id)}
//                         style={{ transform: 'scale(1.8)', marginRight: '8px' }}
//                       />
//                       Seen
//                     </label>
//                     <small> {order.seenby} </small>
//                   </div>

//                   <div className="all_order_buttons_div">
//                     <div
//                       className="all_order_order_update_button"
//                       onClick={() => handleOpenPopup(order._id)}
//                     >
//                       Update Order
//                     </div>
//                     {(user?.role === "admin") && (
//                       <div
//                         className="all_order_order_update_button"
//                         onClick={() => handleOpenPopupforproduct(order._id)}
//                       >
//                         Update Order product
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>

//       {selectedOrderId && <UpdateOrderPopup orderId={selectedOrderId} onClose={handleClose} />}
//       {selectedOrderIdforproduct && <UpdateOrderProductPopup orderId={selectedOrderIdforproduct} onClose={handleCloseproduct} />}

//       {showDeleteConfirm && (
//         <div className="delete-confirm-popup">
//           <div>
//             <h4>Are you sure you want to delete this order?</h4>
//             <button onClick={handleDeleteOrder}>Yes, Delete</button>
//             <button onClick={handleCloseDeleteConfirm}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AllOrder;

import React, { useEffect, useState } from "react";
import "../../adminCss/order/allorder.css";
import { makeApi } from "../../api/callApi";
import UpdateOrderPopup from "./updateorder";
import Loader from "../../components/loader/loader";
import UpdateOrderProductPopup from "./updateproduct";
import { Link } from "react-router-dom";

function AllOrder() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("Pending");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderIdforproduct, setSelectedOrderIdforproduct] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [user, setUser] = useState(null); // Store user role

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const checkUserRole = async () => {
        try {
          const response = await makeApi("/api/my-profile", "GET");
          setUser(response?.data?.user);
        } catch (error) {
          console.log(error);
        }
      };
      checkUserRole();
    }
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await makeApi(`/api/get-all-second-order?status=${status}`, "GET");
      const ndata = response.data.orders;
      setOrders(ndata);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setSelectedStatus(newStatus);
  };

  const handleOpenPopup = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const handleOpenPopupforproduct = (orderId) => {
    setSelectedOrderIdforproduct(orderId);
  };

  const handleClose = () => {
    setSelectedOrderId(null);
  };

  const handleCloseproduct = () => {
    setSelectedOrderIdforproduct(null);
  };

  const handleOpenDeleteConfirm = (orderId) => {
    setOrderToDelete(orderId);
    setShowDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    setOrderToDelete(null);
  };

  const handleDeleteOrder = async () => {
    try {
      await makeApi(`/api/delete-order/${orderToDelete}`, "DELETE");
      setOrders(orders.filter((order) => order._id !== orderToDelete));
      handleCloseDeleteConfirm();
    } catch (error) {
      console.log("Error deleting order", error);
    }
  };

  const formatNumber = (number) => {
    return Math.round(number).toString();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Converts the UTC date to local time
  };

  const calculateTimeDifference = (createdAt, deliveredAt) => {
    const createdTime = new Date(createdAt).getTime();
    const deliveredTime = deliveredAt ? new Date(deliveredAt).getTime() : new Date().getTime();
    const differenceInMinutes = Math.floor((deliveredTime - createdTime) / (1000 * 60));

    if (differenceInMinutes < 60) {
      return `${differenceInMinutes} min`;
    } else {
      const hours = Math.floor(differenceInMinutes / 60);
      const minutes = differenceInMinutes % 60;
      return `${hours} hr ${minutes} min`;
    }
  };

  const handleSeenToggle = async (orderId) => {
    try {
      const updatedOrderData = { Isseen: "true", seenby: user?.username };
      await makeApi(`/api/update-second-order-by-id/${orderId}`, "PUT", updatedOrderData);
      fetchOrders(); // Refresh orders after update
    } catch (error) {
      console.error("Error updating Isseen:", error);
    }
  };

  const handleCalledUpdate = async (orderId, calledValue) => {
    try {
      const updatedOrderData = { called: calledValue };
      await makeApi(`/api/update-second-order-by-id/${orderId}`, "PUT", updatedOrderData);
      fetchOrders(); // Refresh orders after update
    } catch (error) {
      console.error("Error updating called:", error);
    }
  };

  const handleRefresh = () => {
    fetchOrders(); // This will reload the orders
  };

  return (
    <div className="all-orders-container">
      {/* Refresh Button */}
      <button onClick={handleRefresh} className="refresh-button mb-3">
        Refresh Orders
      </button>

      <div className="all_orders_status_buttons">
        <button
          className={`admin_add_product_button ${selectedStatus === "Pending" ? "selectedStatus" : ""}`}
          onClick={() => handleStatusChange("Pending")}
        >
          Pending Orders
        </button>
        <button
          className={`admin_add_product_button ${selectedStatus === "Cancelled" ? "selectedStatus" : ""}`}
          onClick={() => handleStatusChange("Cancelled")}
        >
          Cancelled Orders
        </button>
        <button
          className={`admin_add_product_button ${selectedStatus === "Shipped" ? "selectedStatus" : ""}`}
          onClick={() => handleStatusChange("Shipped")}
        >
          Shipped Orders
        </button>
        <button
          className={`admin_add_product_button ${selectedStatus === "Delivered" ? "selectedStatus" : ""}`}
          onClick={() => handleStatusChange("Delivered")}
        >
          Delivered Orders
        </button>
      </div>

      <div className="order-list">
        {loading ? (
          <Loader />
        ) : (
          <div className="main_order_list_container">
            {orders.length === 0 ? (
              <div className="no-orders-message">No Orders Available</div>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="order_list_container">
                  <div>
                    {order.products.map((item) => (
                      <>
                        <div className="text-center mb-4" >
                          <b>Time Taken:</b>{" "}
                          <span style={{ backgroundColor: "red", color: "white", fontWeight: "bold", padding: "5px 10px", borderRadius: "5px" }}>
                            {calculateTimeDifference(order.createdAt, order.deliveredAt)}
                          </span>
                        </div>

                        <div key={item._id} className="order_item_details">

                          <div>
                            <img
                              loading="lazy"
                              src={item?.productId?.thumbnail}
                              alt={item?.productId?.name}
                              className="all_order_thumbnail"
                            />
                          </div>
                          <div>

                            <p><b>Name:</b> {item?.productId?.name}</p>
                            <p><b>Price:</b> ₹{item?.SingelProductPrice}</p>
                            <p><b>Quantity:</b> {item?.quantity}</p>
                            <p><b>Total:</b> ₹{item?.SingelProductPrice} × {item?.quantity} = ₹{item?.SingelProductPrice * item?.quantity} </p>
                            {item?.shopname && <p><b>Shop Name:</b> <span style={{ backgroundColor: "red", color: "white", padding: "5px 10px", borderRadius: "5px" }}>{item?.shopname}</span></p>}
                          </div>
                        </div>
                      </>

                    ))}
                  </div>

                  <div className="order_details all_order_details">
                    <div><b>Address:</b> {order.address}</div>
                    {order.village && <div><b>Village:</b> <span className="bg-dark text-white w-50 px-3">{order.village}</span></div>}
                    <div><b>Name:</b> {order?.username}</div>
                    <div>
                      <b>Mobile Number:</b>
                      {order.mobileNumber}
                      <a href={`tel:${order.mobileNumber}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <button style={{ marginLeft: "10px", backgroundColor: "yellow", padding: "5px 10px", borderRadius: "5px" }}>call</button>
                      </a>
                    </div>

                    <div><b>Status:</b> {order.status}</div>
                    <div className="btn btn-outline-dark"><>Total Price:</> <b style={{ fontSize: '20px' }}> ₹{formatNumber(order.totalAmount)}</b></div>
                    <div style={{ backgroundColor: "green", padding: "5px 10px", borderRadius: "5px" }}><b>Created At:</b> {formatDate(order.createdAt)}</div>

                    {order.deliveredAt && (
                      <div style={{ backgroundColor: "blue", padding: "5px 10px", borderRadius: "5px" }}>
                        <b>Delivered At:</b> {formatDate(order.deliveredAt)}
                      </div>
                    )}


                    <div> <b>Delivered By:</b> <span style={{ backgroundColor: "yellow", padding: "5px 10px", borderRadius: "5px" }}>{order?.deliveredBy}</span></div>
                  </div>

                  <div className="action-buttons">
                    <label style={{ marginBottom: '10px' }}>
                      <input
                        type="checkbox"
                        checked={order.Isseen === "true"}
                        onChange={() => handleSeenToggle(order._id)}
                        style={{ transform: 'scale(1.8)', marginRight: '8px' }}
                      />
                      Seen
                    </label>
                    <small> {order.seenby} </small>
                  </div>

                  <div className="all_order_buttons_div">
                    <div
                      className="all_order_order_update_button"
                      onClick={() => handleOpenPopup(order._id)}
                    >
                      Update Order
                    </div>
                    {(user?.role === "admin") && (
                      <div
                        className="all_order_order_update_button"
                        onClick={() => handleOpenPopupforproduct(order._id)}
                      >
                        Update Order Product
                      </div>
                    )}
                  </div>

                  <div>
                    {user?.role === "admin" && order.custmoreId && (
                      <strong className="p-3 mt-4" >
                        custmoreId:{" "}
                        <Link to={`/admin/custmoreorder/${order.custmoreId} `} target="_blank">
                          {order.custmoreId}
                        </Link>
                      </strong>
                    )}
                  </div>

                </div>
              ))
            )}
          </div>
        )}
      </div>

      {selectedOrderId && <UpdateOrderPopup orderId={selectedOrderId} onClose={handleClose} />}
      {selectedOrderIdforproduct && <UpdateOrderProductPopup orderId={selectedOrderIdforproduct} onClose={handleCloseproduct} />}

      {showDeleteConfirm && (
        <div className="delete-confirm-popup">
          <div>
            <h4>Are you sure you want to delete this order?</h4>
            <button onClick={handleDeleteOrder}>Yes, Delete</button>
            <button onClick={handleCloseDeleteConfirm}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllOrder;