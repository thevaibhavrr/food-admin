
// import React, { useEffect, useState } from "react";
// import "../../adminCss/order/allorder.css";
// import { makeApi } from "../../api/callApi";
// import { Link } from "react-router-dom";
// import UpdateOrderPopup from "./updateorder";
// import Loader from "../../components/loader/loader";

// function AllOrder() {
//   const [loading, setLoading] = useState(false);
//   const [orders, setOrders] = useState([]);
//   const [status, setStatus] = useState("Pending");
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const [selectedStatus, setSelectedStatus] = useState("Pending");

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi(`/api/get-all-second-order?status=${status}`, "GET");
//       setOrders(response.data.orders);  // Assuming response.data.orders contains the array of orders
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

//   const handleClose = () => {
//     setSelectedOrderId(null);
//   };

//   const formatNumber = (number) => {
//     return Math.round(number).toString();
//   };

//   return (
//     <div className="all-orders-container">
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
//             {orders.map((order) => (
//               <div key={order._id} className="order_list_container">
//                 <div>
//                   {order.products.map((item) => (
//                     <div key={item._id} className="order_item_details">
//                       <div>
//                         <img
//                           loading="lazy"
//                           src={item.productId.thumbnail}
//                           alt={item.productId.name}
//                           className="all_order_thumbnail"
//                         />
//                       </div>
//                       <div>
//                         <p><b>Name:</b> {item.productId.name}</p>
//                         <p><b>Price:</b> ₹{item.productId.FinalPrice}</p>
//                         <p><b>Quantity:</b> {item.quantity}</p>
                      
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="order_details all_order_details">
//                 <div><b>Address:</b> {order.address}</div>
//                 <div><b>mobileNumber:</b> {order.mobileNumber}</div>

//                   {/* <div><b>Order Id:</b> {order._id}</div> */}
//                   <div><b>Status:</b> {order.status}</div>
//                   <div><b>Total Price:</b> ₹{formatNumber(order.totalAmount)}</div>
//                 </div>

//                 <div className="all_order_buttons_div">
//                   <Link to={`/admin/order/${order._id}`} className="all_order_order_view_button">View Order</Link>
//                   <div
//                     className="all_order_order_update_button"
//                     onClick={() => handleOpenPopup(order._id)}
//                   >
//                     Update Order
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {selectedOrderId && <UpdateOrderPopup orderId={selectedOrderId} onClose={handleClose} />}
//     </div>
//   );
// }

// export default AllOrder;
import React, { useEffect, useState } from "react";
import "../../adminCss/order/allorder.css";
import { makeApi } from "../../api/callApi";
import { Link } from "react-router-dom";
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
      setOrders(response.data.orders);
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
      await makeApi(`/api/delete-product/${orderToDelete}`, "DELETE");
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
            {orders.map((order) => (
              <div key={order._id} className="order_list_container">
                <div>
                  {order.products.map((item) => (
                    <div key={item._id} className="order_item_details">
                      <div>
                        <img
                          loading="lazy"
                          src={item.productId.thumbnail}
                          alt={item.productId.name}
                          className="all_order_thumbnail"
                        />
                      </div>
                      <div>
                        <p><b>Name:</b> {item.productId.name}</p>
                        <p><b>Price:</b> ₹{item.productId.FinalPrice}</p>
                        <p><b>Quantity:</b> {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order_details all_order_details">
                  <div><b>Address:</b> {order.address}</div>
                  <div><b>Mobile Number:</b> {order.mobileNumber}</div>
                  <div><b>Status:</b> {order.status}</div>
                  <div><b>Total Price:</b> ₹{formatNumber(order.totalAmount)}</div>
                  <div><b>Created At:</b> {formatDate(order.createdAt)}</div> {/* Display local creation time */}
                </div>

                <div className="all_order_buttons_div">
                  <Link to={`/admin/order/${order._id}`} className="all_order_order_view_button">View Order</Link>
                  <div
                    className="all_order_order_update_button"
                    onClick={() => handleOpenPopup(order._id)}
                  >
                    Update Order
                  </div>
                  <div
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
                  </div>
                </div>
              </div>
            ))}
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
