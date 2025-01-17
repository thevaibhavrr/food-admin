import React, { useEffect, useState } from "react";
import "../../adminCss/order/allorder.css";
import { makeApi } from "../../api/callApi";
import UpdateOrderPopup from "./updateorder";
import Loader from "../../components/loader/loader";

function TodayDeliveredOrders() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("Delivered");
  const [todayDeliveredOrders, setTodayDeliveredOrders] = useState([]);
  const [withoutDeliveryInfo, setWithoutDeliveryInfo] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedTab, setSelectedTab] = useState("all"); // Track selected tab

  // Function to fetch orders and filter them
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await makeApi("/api/get-all-second-order?status=Delivered", "GET");
      const allOrders = response.data.orders;

      // Filter orders delivered today
      const today = new Date().toISOString().split("T")[0]; // Get today's date in "YYYY-MM-DD" format
      const deliveredToday = allOrders.filter(order =>
        order.deliveredAt && order.deliveredAt.split("T")[0] === today
      );

      // Separate orders with and without delivery info
      const withDeliveryInfo = deliveredToday.filter(order => order.deliveredBy);
      const withoutDeliveryInfo = deliveredToday.filter(order => !order.deliveredBy);

      setTodayDeliveredOrders(withDeliveryInfo);
      setWithoutDeliveryInfo(withoutDeliveryInfo);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Converts the UTC date to local time
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="all-orders-container">
      <div className="tabs-container">
        <button
          className={`tab-button ${selectedTab === "all" ? "active" : ""}`}
          onClick={() => handleTabChange("all")}
        >
          All Delivered Orders
        </button>
        <button
          className={`tab-button ${selectedTab === "withoutDeliveryInfo" ? "active" : ""}`}
          onClick={() => handleTabChange("withoutDeliveryInfo")}
        >
          Orders Without Delivery Info
        </button>
      </div>

      <div className="order-list">
        {loading ? (
          <Loader />
        ) : (
          <div className="main_order_list_container">
            {/* Displaying orders based on selected tab */}
            {selectedTab === "all" ? (
              todayDeliveredOrders.length === 0 ? (
                <div className="no-orders-message">No Orders Delivered Today</div>
              ) : (
                todayDeliveredOrders.map((order) => (
                  <div key={order._id} className="order_list_container">
                    {/* Render order details */}
                    <div>
                      {order.products.map((item) => (
                        <div key={item._id} className="order_item_details">
                          <div>
                            <img
                              loading="lazy"
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
                      <div><b>Total Price:</b> ₹{order.totalAmount}</div>
                      <div><b>Delivered At:</b> {formatDate(order.deliveredAt)}</div>
                      <div><b>Delivered By:</b> {order.deliveredBy || "N/A"}</div>
                    </div>
                  </div>
                ))
              )
            ) : selectedTab === "withoutDeliveryInfo" ? (
              withoutDeliveryInfo.length === 0 ? (
                <div className="no-orders-message">No Orders Without Delivery Info</div>
              ) : (
                withoutDeliveryInfo.map((order) => (
                  <div key={order._id} className="order_list_container">
                    {/* Render order details */}
                    <div>
                      {order.products.map((item) => (
                        <div key={item._id} className="order_item_details">
                          <div>
                            <img
                              loading="lazy"
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
                      <div><b>Total Price:</b> ₹{order.totalAmount}</div>
                      <div><b>Delivered At:</b> {formatDate(order.deliveredAt)}</div>
                      <div><b>Delivered By:</b> N/A</div>
                    </div>
                  </div>
                ))
              )
            ) : null}
          </div>
        )}
      </div>

      {selectedOrderId && <UpdateOrderPopup orderId={selectedOrderId} onClose={() => setSelectedOrderId(null)} />}
    </div>
  );
}

export default TodayDeliveredOrders;
