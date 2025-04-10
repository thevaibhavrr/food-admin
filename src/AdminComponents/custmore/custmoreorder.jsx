import "../../style/custmoredetails.css"

import React, { useEffect, useState } from 'react'
import { makeApi } from "../../api/callApi"
import { useParams } from "react-router-dom"

function CustomerOrder() {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState({ orders: [] });
    const [customerInfo, setCustomerInfo] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await makeApi(`/api/get-order-by-custmoreId/${id}`, "GET");
                setOrderDetails(response.data);
                if (response.data.orders.length > 0) {
                    setCustomerInfo(response.data.orders[0].custmoreId);
                }
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        };
        fetchOrderDetails();
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="custmore_details_container">
            <h1 className="custmore_details_title">Customer Orders</h1>
            
            {customerInfo && (
                <div className="custmore_details_customer_id">
                    <p><strong>Registration ID:</strong> {customerInfo._id}</p>
                    <p><strong>Register Mobile Number:</strong> {customerInfo.mobileNumber}</p>
                </div>
            )}
            
            {orderDetails.orders.length === 0 ? (
                <p className="custmore_details_no_orders">No orders found for this customer.</p>
            ) : (
                <div className="custmore_details_orders_list">
                    {orderDetails.orders.map((order, index) => (
                        <div key={order._id} className="custmore_details_order_card">
                            <div className="custmore_details_order_header">
                                <h2 className="custmore_details_order_number">Order #{index + 1}</h2>
                                <span className={`custmore_details_status custmore_details_status_${order.status.toLowerCase()}`}>
                                    {order.status}
                                </span>
                            </div>
                            
                            <div className="custmore_details_order_info">
                                <div className="custmore_details_info_section">
                                    <h3 className="custmore_details_section_title">Customer Information</h3>
                                    <p className="custmore_details_info_item"><strong>Name:</strong> {order.username}</p>
                                    <p className="custmore_details_info_item"><strong>Mobile:</strong> {order.mobileNumber}</p>
                                    <p className="custmore_details_info_item"><strong>Village:</strong> {order.village}</p>
                                    <p className="custmore_details_info_item"><strong>Address:</strong> {order.address}</p>
                                </div>
                                
                                <div className="custmore_details_info_section">
                                    <h3 className="custmore_details_section_title">Order Information</h3>
                                    <p className="custmore_details_info_item"><strong>Order Date:</strong> {formatDate(order.createdAt)}</p>
                                    {order.status === 'Delivered' && (
                                        <p className="custmore_details_info_item"><strong>Delivered Date:</strong> {formatDate(order.deliveredAt)}</p>
                                    )}
                                    <p className="custmore_details_info_item"><strong>Payment Method:</strong> {order.paymentMethod || 'N/A'}</p>
                                    <p className="custmore_details_info_item"><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                                </div>
                            </div>
                            
                            <div className="custmore_details_products_section">
                                <h3 className="custmore_details_section_title">Products</h3>
                                <div className="custmore_details_products_list">
                                    {order.products.map((product, idx) => (
                                        <div key={product._id} className={`custmore_details_product_item `}>
                                            <div className="custmore_details_product_image_container">
                                                <img 
                                                    src={product.productId.thumbnail} 
                                                    alt={product.productId.name} 
                                                    className="custmore_details_product_image"
                                                    onError={(e) => {
                                                        e.target.onerror = null; 
                                                        e.target.src = "https://via.placeholder.com/100?text=No+Image";
                                                    }}
                                                />
                                            </div>
                                            <div className="custmore_details_product_info">
                                                <p className="custmore_details_product_name">{product.productId.name}</p>
                                                <div className="custmore_details_product_details">
                                                    <p><strong>Quantity:</strong> {product.quantity}</p>
                                                    <p><strong>Price per unit:</strong> ₹{product.SingelProductPrice}</p>
                                                    <p><strong>Total:</strong> ₹{product.FinalPrice}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="custmore_details_delivery_info">
                                <h3 className="custmore_details_section_title">Delivery Information</h3>
                                <p className="custmore_details_info_item"><strong>Delivered By:</strong> {order.deliveredBy || 'N/A'}</p>
                                <p className="custmore_details_info_item"><strong>Seen By:</strong> {order.seenby || 'N/A'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CustomerOrder