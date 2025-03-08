// import React, { useState, useEffect } from "react";
// import { makeApi } from "../../api/callApi";
// import "../../adminCss/order/updateorderproduct.css";
// import { ToastContainer, toast } from "react-toastify";
// import Loader from "../../components/loader/loader";

// const UpdateOrderProductPopup = ({ orderId, onClose }) => {
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
//         const orderData = response?.data?.order;
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
//     <div className="update_product-popup-container">
//       {order && (
//         <div className="update_product-popup-content-for-update-page">
//           <h2>Update Order</h2>
//           <div className="update_product-order-products">
//             <h3>Products:</h3>
//             {updatedOrderData?.products?.map((product, index) => (
//               <div key={product._id} className="update_product-product-item">
//                 {/* Product name */}
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
//           <h3>Total Amount: {updatedOrderData?.totalAmount}</h3>
//           <div className="update_product-button-group">
//             <button onClick={onClose}>Close</button>
//             <button onClick={handleUpdateOrder}>Update Order</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpdateOrderProductPopup;

import React, { useState, useEffect } from "react";
import { makeApi } from "../../api/callApi";
import "../../adminCss/order/updateorderproduct.css";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/loader/loader";

const UpdateOrderProductPopup = ({ orderId, onClose }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatedOrderData, setUpdatedOrderData] = useState({
    paymentMethod: "",
    deliveredAt: "",
    status: "",
    deliveredBy: "",
    products: [],
    totalAmount: 0,
  });
  const [additionalPrice, setAdditionalPrice] = useState(0);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const response = await makeApi(`/api/get-second-order-by-id/${orderId}`, "GET");
        const orderData = response?.data?.order;
        setOrder(orderData);
        setUpdatedOrderData({
          paymentMethod: orderData?.paymentMethod || "",
          status: orderData?.status || "",
          deliveredBy: orderData?.deliveredBy || "",
          products: orderData?.products || [],
          totalAmount: orderData?.totalAmount || 0,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  const handleProductChange = (index, key, value) => {
    const updatedProducts = [...updatedOrderData.products];
    updatedProducts[index][key] = value;

    if (key === "quantity" || key === "SingelProductPrice") {
      updatedProducts[index].FinalPrice =
        updatedProducts[index].quantity * updatedProducts[index].SingelProductPrice;
    }

    const newTotalAmount = updatedProducts.reduce(
      (sum, product) => sum + product.FinalPrice,
      0
    ) + additionalPrice;

    setUpdatedOrderData((prev) => ({
      ...prev,
      products: updatedProducts,
      totalAmount: newTotalAmount,
    }));
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...updatedOrderData.products];
    updatedProducts.splice(index, 1);

    const newTotalAmount = updatedProducts.reduce(
      (sum, product) => sum + product.FinalPrice,
      0
    ) + additionalPrice;

    setUpdatedOrderData((prev) => ({
      ...prev,
      products: updatedProducts,
      totalAmount: newTotalAmount,
    }));
  };

  const handleAdditionalPriceChange = (e) => {
    const newAdditionalPrice = Number(e.target.value);
    setAdditionalPrice(newAdditionalPrice);

    const newTotalAmount = updatedOrderData.products.reduce(
      (sum, product) => sum + product.FinalPrice,
      0
    ) + newAdditionalPrice;

    setUpdatedOrderData((prev) => ({
      ...prev,
      totalAmount: newTotalAmount,
    }));
  };

  const handleUpdateOrder = async () => {
    try {
      await makeApi(`/api/update-second-order-by-id/${orderId}`, "PUT", {
        ...updatedOrderData,
        additionalPrice,
      });
      toast.success("Order updated successfully");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update order");
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="update_product-popup-container">
      {order && (
        <div className="update_product-popup-content-for-update-page">
          <h2>Update Order</h2>
          <div className="update_product-order-products">
            <h3>Products:</h3>
            {updatedOrderData?.products?.map((product, index) => (
              <div key={product._id} className="update_product-product-item">
                {/* Product name */}
                <p>Name: {product.name}</p>
                <p>Shop: {product.shopname}</p>
                <label>Quantity:</label>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleProductChange(index, "quantity", Number(e.target.value))}
                />
                <label>Price Per Item:</label>
                <input
                  type="number"
                  value={product.SingelProductPrice}
                  onChange={(e) => handleProductChange(index, "SingelProductPrice", Number(e.target.value))}
                />
                <p>Final Price: {product.FinalPrice}</p>
                <button className="btn btn-warning" onClick={() => handleRemoveProduct(index)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="update_product-additional-price">
            <label>Additional Price:</label>
            <input
              type="text"
              value={additionalPrice}
              onChange={handleAdditionalPriceChange}
            />
          </div>
          <h3>Total Amount: {updatedOrderData?.totalAmount}</h3>
          <div className="update_product-button-group">
            <button onClick={onClose} className="btn btn-danger" >Close</button>
            <button onClick={handleUpdateOrder}>Update Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateOrderProductPopup;