
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
          setUser(response.data.user); // Set the logged-in user to state
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
        const allUsers = await response.data.user;
        if (user.role === "admin") {
          await setUsers(allUsers);
        } else if (user.role === "delivryboy") {
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
        const orderData = response.data.order;
        setOrder(orderData);

        setUpdatedOrderData((prevData) => ({
          ...prevData,
          paymentMethod: orderData?.paymentMethod || "",
          status: orderData?.status || "",
          deliveredBy: orderData?.deliveredBy || user?.username || "",
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
                  {users.map((user) => (

                    <label key={user._id}>
                      <input
                        type="radio"
                        name="deliveredBy"
                        value={user.username}
                        checked={updatedOrderData.deliveredBy === user.username}
                        onChange={handleInputChange}
                      />
                      {user.username}
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
