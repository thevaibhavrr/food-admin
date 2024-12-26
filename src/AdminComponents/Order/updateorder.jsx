
import React, { useState, useEffect } from "react";
import { makeApi } from "../../api/callApi";
import "../../adminCss/order/updateorder.css";
import Loader from "../../components/loader/loader";


const UpdateOrderPopup = ({ orderId, onClose }) => {
  const [order, setOrder] = useState(null);
  const[loading, setLoading] = useState(false);
  const [updatedOrderData, setUpdatedOrderData] = useState({
    paymentMethod: "",
    deliveredAt: "",
    status: "",
  });

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
          deliveredAt: orderData?.deliveredAt ? new Date(orderData?.deliveredAt).toISOString().slice(0, 16) : "",
          status: orderData.status,
        });
      } catch (error) {
        console.log(error);
      }finally{
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

  const handleUpdateOrder = async () => {
    try {
      const response = await makeApi(
        `/api/update-second-order-by-id/${orderId}`,
        "PUT",
        updatedOrderData
      );
      console.log(response, "updated");
      onClose(); // Close popup after updating
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleClose = () => {
    onClose();
  };
   if (loading) {
    return <div style={{display:"flex", justifyContent:"center", alignItems:"center"}} > <Loader /> </div>;
  }

  return (
    <div className="popup-container">
      {order && (
        <div className="popup-content-for-update-page">
          <h2>Update Order</h2>
          <div className="update_page_payment_details">
            <h3>Payment Details:</h3>
            <label>Payment Method:</label>
            <input
              type="text"
              className="update_order_input_fileds"
              name="paymentMethod"
              value={updatedOrderData?.paymentMethod}
              onChange={handleInputChange}
            />
            
            <div>
              <label>Delivered At:</label>
              <input
                type="datetime-local"
                className="update_order_input_fileds"
                name="deliveredAt"
                value={updatedOrderData?.deliveredAt}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Status:</label>
              <select
                name="status"
                className="update_order_input_fileds"
                value={updatedOrderData?.status}
                onChange={handleInputChange}
              >
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Delivered">Delivered</option>
                <option value="Shipped">Shipped</option>
              </select>
            </div> 

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


// UpdateOrderPopup Component
// import React, { useState, useEffect } from "react";
// import { makeApi } from "../../api/callApi";
// import "../../adminCss/order/updateorder.css";

// const UpdateOrderPopup = ({ orderId, onClose }) => {
//   const [order, setOrder] = useState(null);
//   const [updatedOrderData, setUpdatedOrderData] = useState({
//     paymentMethod: "",
//     deliveredAt: "",
//     status: "",
//   });

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const response = await makeApi(`/api/get-second-order-by-id/${orderId}`, "GET");
//         const orderData = response.data.order;
//         setOrder(orderData);
//         setUpdatedOrderData({
//           paymentMethod: orderData?.paymentMethod,
//           deliveredAt: orderData?.deliveredAt ? new Date(orderData.deliveredAt).toISOString().slice(0, 16) : "",
//           status: orderData.status,
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchOrderDetails();
//   }, [orderId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedOrderData({ ...updatedOrderData, [name]: value });
//   };

//   const handleUpdateOrder = async () => {
//     try {
//       await makeApi(`/api/update-second-order-by-id/${orderId}`, "PUT", updatedOrderData);
//       onClose(); // Close the popup and refresh orders
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="popup-container">
//       {order && (
//         <div className="popup-content-for-update-page">
//           <h2>Update Order</h2>
//           <div className="update_page_payment_details">
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
//           </div>
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
