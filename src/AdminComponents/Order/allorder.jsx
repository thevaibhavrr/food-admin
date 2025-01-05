import React, { useEffect, useState } from "react";
import "../../adminCss/order/allorder.css";
import { makeApi } from "../../api/callApi";
import UpdateOrderPopup from "./updateorder";
import Loader from "../../components/loader/loader";

function AllOrder() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("Pending");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await makeApi(`/api/get-all-second-order?status=${status}`, "GET");
      // revers data
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

  const handleClose = () => {
    setSelectedOrderId(null);
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
      // Call the API to delete the order here
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
  const handleSeenToggle = async (orderId) => {
    try {
      const updatedOrderData = { Isseen: "true" };
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

  return (
    <div className="all-orders-container">
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
            {/* If no orders, display "No Orders" message */}
            {orders.length === 0 ? (
              <div className="no-orders-message">No Orders Available</div>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="order_list_container">
                  <div>
                    {order.products.map((item) => (
                      <div key={item._id} className="order_item_details">
                        <div>
                          <img
                            loading="lazy"
                            // src={item?.productId?.thumbnail}
                            src={item?.productId?.thumbnail.replace('http://', 'https://')}
                            alt={item?.productId?.name}
                            className="all_order_thumbnail"
                          />
                        </div>
                        <div>
                          <p><b>Name:</b> {item?.productId?.name}</p>
                          <p><b>Price:</b> ₹{item?.productId?.FinalPrice}</p>
                          <p><b>Quantity:</b> {item?.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order_details all_order_details">
                    <div><b>Address:</b> {order.address}</div>
                    <div><b>Name:</b> {order?.username}</div>
                    <div><b>Mobile Number:</b> {order.mobileNumber}</div>
                    <div><b>Status:</b> {order.status}</div>
                    <div><b>Total Price:</b> ₹{formatNumber(order.totalAmount)}</div>
                    <div style={{ backgroundColor: "green", padding: "5px 10px", borderRadius: "5px" }} ><b>Created At:</b> {formatDate(order.createdAt)}</div> {/* Display local creation time */}
                    <div> <b>delivered At:</b> {formatDate(order.deliveredAt)} </div>
                  </div>

                  <div className="action-buttons">
                    <label>
                      <input
                        type="checkbox"
                        checked={order.Isseen === "true"}
                        onChange={() => handleSeenToggle(order._id)}
                      />
                      Seen
                    </label>

                    <select
                      onChange={(e) => handleCalledUpdate(order._id, e.target.value)}
                      value={order.called === "false" || !order.called ? "" : order.called} // Default to empty if no caller
                    >
                      <option value="" disabled>Select Caller</option>
                      <option value="Vaibhav">Vaibhav</option>
                      <option value="Manish">Manish</option>
                      <option value="Rakesh">Rakesh</option>
                      <option value="Mahesh">Mahesh</option>
                    </select>

                  </div>

                  <div className="all_order_buttons_div">
                    {/* <Link to={`/admin/order/${order._id}`} className="all_order_order_view_button">View Order</Link> */}
                    <div
                      className="all_order_order_update_button"
                      onClick={() => handleOpenPopup(order._id)}
                    >
                      Update Order
                    </div>
                    {/* <div
                      className="all_order_order_delete_button"
                      onClick={() => handleOpenDeleteConfirm(order._id)}
                      style={{
                        backgroundColor: "#f44336",
                        color: "white",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginLeft: "10px",
                      }}
                    >
                      Delete Order
                    </div> */}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {selectedOrderId && <UpdateOrderPopup orderId={selectedOrderId} onClose={handleClose} />}

      {/* Delete Confirmation Popup */}
      {showDeleteConfirm && (
        <div
          className="delete-confirm-popup"
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              width: "300px",
            }}
          >
            <h4 style={{ marginBottom: "20px" }}>Are you sure you want to delete this order?</h4>
            <button
              onClick={handleDeleteOrder}
              style={{
                backgroundColor: "#f44336",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Yes, Delete
            </button>
            <button
              onClick={handleCloseDeleteConfirm}
              style={{
                backgroundColor: "#4caf50",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllOrder;



// import React, { useEffect, useState } from "react";
// import "../../adminCss/order/allorder.css";
// import "../../adminCss/order/updateorder.css";

// import { makeApi } from "../../api/callApi";
// import Loader from "../../components/loader/loader";

// function AllOrder() {
//   const [loading, setLoading] = useState(false);
//   const [orders, setOrders] = useState([]);
//   const [status, setStatus] = useState("Pending");
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [orderToDelete, setOrderToDelete] = useState(null);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi(
//         `/api/get-all-second-order?status=${status}`,
//         "GET"
//       );
//       const ndata = response.data.orders.reverse();
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
//   };

//   const handleOpenPopup = (orderId) => setSelectedOrderId(orderId);
//   const handleClosePopup = () => setSelectedOrderId(null);

//   const updateOrderInState = (updatedOrder) => {
//     setOrders((prevOrders) =>
//       prevOrders.map((order) =>
//         order._id === updatedOrder._id ? updatedOrder : order
//       )
//     );
//   };

//   const removeOrderFromState = (orderId) => {
//     setOrders((prevOrders) =>
//       prevOrders.filter((order) => order._id !== orderId)
//     );
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
//       await makeApi(`/api/delete-order/${orderToDelete}`, "DELETE");
//       setOrders((prevOrders) =>
//         prevOrders.filter((order) => order._id !== orderToDelete)
//       );
//       handleCloseDeleteConfirm();
//     } catch (error) {
//       console.log("Error deleting order", error);
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleString();
//   };

//   return (
//     <div className="all-orders-container">
//       <div className="all_orders_status_buttons">
//         {["Pending", "Cancelled", "Shipped", "Delivered"].map((statusOption) => (
//           <button
//             key={statusOption}
//             className={`admin_add_product_button ${
//               status === statusOption ? "selectedStatus" : ""
//             }`}
//             onClick={() => handleStatusChange(statusOption)}
//           >
//             {statusOption} Orders
//           </button>
//         ))}
//       </div>

//       <div className="order-list">
//         {loading ? (
//           <Loader />
//         ) : orders.length === 0 ? (
//           <div className="no-orders-message">No Orders Available</div>
//         ) : (
//           orders.map((order) => (
//             <div key={order._id} className="order_list_container">
//               <div>
//                 {order.products.map((item?) => (
//                   <div key={item?._id} className="order_item_details">
//                     <div>
//                       <img
//                         src={item?.productId.thumbnail}
//                         alt={item.productId.name}
//                         className="all_order_thumbnail"
//                       />
//                     </div>
//                     <div>
//                       <p><b>Name:</b> {item.productId.name}</p>
//                       <p><b>Price:</b> ₹{item.productId.FinalPrice}</p>
//                       <p><b>Quantity:</b> {item.quantity}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="order_details all_order_details">
//                 <div><b>Address:</b> {order.address}</div>
//                 <div><b>Name:</b> {order?.username}</div>
//                 <div><b>Mobile Number:</b> {order.mobileNumber}</div>
//                 <div><b>Status:</b> {order.status}</div>
//                 <div><b>Total Price:</b> ₹{order.totalAmount}</div>
//                 <div><b>Created At:</b> {formatDate(order.createdAt)}</div>
//                 <div><b>Delivered At:</b> {formatDate(order.deliveredAt)}</div>
//               </div>

//               <div className="all_order_buttons_div">
//                 <div
//                   className="all_order_order_update_button"
//                   onClick={() => handleOpenPopup(order._id)}
//                 >
//                   Update Order
//                 </div>
//                 <div
//                   className="all_order_order_delete_button"
//                   onClick={() => handleOpenDeleteConfirm(order._id)}
//                 >
//                   Delete Order
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {selectedOrderId && (
//         <UpdateOrderPopup
//           orderId={selectedOrderId}
//           onClose={handleClosePopup}
//           updateOrderInState={updateOrderInState}
//           removeOrderFromState={removeOrderFromState}
//         />
//       )}

//       {showDeleteConfirm && (
//         <div className="delete-confirm-popup">
//           <div className="popup-content">
//             <h4>Are you sure you want to delete this order?</h4>
//             <button onClick={handleDeleteOrder}>Yes, Delete</button>
//             <button onClick={handleCloseDeleteConfirm}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const UpdateOrderPopup = ({ orderId, onClose, updateOrderInState, removeOrderFromState }) => {
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [updatedOrderData, setUpdatedOrderData] = useState({
//     paymentMethod: "",
//     deliveredAt: "",
//     status: "",
//   });

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await makeApi(
//           `/api/get-second-order-by-id/${orderId}`,
//           "GET"
//         );
//         const orderData = response.data.order;
//         setOrder(orderData);
//         setUpdatedOrderData({
//           paymentMethod: orderData?.paymentMethod,
//           deliveredAt: orderData?.deliveredAt
//             ? new Date(orderData.deliveredAt).toISOString().slice(0, 16)
//             : "",
//           status: orderData.status,
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
//     setUpdatedOrderData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleUpdateOrder = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi(
//         `/api/update-second-order-by-id/${orderId}`,
//         "PUT",
//         updatedOrderData
//       );
//       const updatedOrder = response.data.order;

//       if (updatedOrder.status !== "Pending") {
//         removeOrderFromState(orderId);
//       } else {
//         updateOrderInState(updatedOrder);
//       }

//       onClose(); // Close popup after update
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="popup-container">
//       {loading ? (
//         <Loader />
//       ) : (
//         order && (
//           <div className="popup-content-for-update-page">
//             <h2>Update Order</h2>
//             <label>Payment Method:</label>
//             <input
//               type="text"
//               name="paymentMethod"
//               value={updatedOrderData.paymentMethod}
//               onChange={handleInputChange}
//             />
//             <label>Delivered At:</label>
//             <input
//               type="datetime-local"
//               name="deliveredAt"
//               value={updatedOrderData.deliveredAt}
//               onChange={handleInputChange}
//             />
//             <label>Status:</label>
//             <select
//               name="status"
//               value={updatedOrderData.status}
//               onChange={handleInputChange}
//             >
//               <option value="Pending">Pending</option>
//               <option value="Cancelled">Cancelled</option>
//               <option value="Delivered">Delivered</option>
//               <option value="Shipped">Shipped</option>
//             </select>
//             <div className="button-group">
//               <button onClick={onClose}>Close</button>
//               <button onClick={handleUpdateOrder}>Update Order</button>
//             </div>
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default AllOrder;
