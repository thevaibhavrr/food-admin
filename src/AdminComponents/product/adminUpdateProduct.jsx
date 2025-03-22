
import "../../adminCss/adminUpdateProduct.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";
import uploadToCloudinary from "../../utils/cloudinaryUpload";
import { ToastContainer, toast } from "react-toastify";

function UpdateProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [updateloader, setUpdateLoader] = useState(false);
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]); // State to store categories
  const [uploadProgress, setUploadProgress] = useState(0);
  const [multicategory, setMulticategory] = useState([]); // For multiple categories
  const [subcategories, setSubcategories] = useState({}); // { categoryId: [subcategories] }
  const [selectedSubcategories, setSelectedSubcategories] = useState({}); // { categoryId: [subcategoryId1, subcategoryId2] }

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await makeApi(`/api/get-subcategories?categoryId=${categoryId}`, "GET");
      setSubcategories((prev) => ({ ...prev, [categoryId]: response.data.subservices }));
    } catch (error) {
      console.log("Error fetching subcategories:", error);
    }
  };
  
  const [formData, setFormData] = useState({
    name: "",
    shopname: "",
    price: "",
    discountPercentage: "",
    FinalPrice: "",
    category: "",
    thumbnail: "",
    availableTimes: [],
    minorderquantity: "",
    packof: "",
    active: "",
    setOurprice: "",
    shopPrices: [],
  });

  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false); // Track if user is loaded
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const checkUserRole = async () => {
        try {
          const response = await makeApi("/api/my-profile", "GET");
          setUser(response?.data?.user); // Set the logged-in user to state
          setUserLoaded(true); // Mark user as loaded
        } catch (error) {
          console.log(error);
          setUserLoaded(true); // Ensure to still continue even if there's an error
        }
      };
      checkUserRole();
    } else {
      setUserLoaded(true); // If no token, we can still proceed to fetch product
    }
  }, []);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await makeApi("/api/get-all-categories", "GET");
      if (user.role === "admin") {
        setCategories(response.data);
      } else {
        // Ensure user data is loaded before accessing it
        const accessibleCategoryIds = user?.categoryacess || [];

        // Filter categories based on user's access
        const accessibleCategories = response.data.filter(category =>
          accessibleCategoryIds.includes(category._id)
        );
        setCategories(accessibleCategories);
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userLoaded) {
      const fetchProduct = async () => {
        try {
          setLoading(true);

          // Fetch product details
          const response = await makeApi(`/api/get-single-product/${productId}`, "GET");
          const productData = await response?.data?.product;
          setProduct(productData);
          setMulticategory(productData?.multicategory);
          // Set form data with product details
          setFormData({
            name: productData?.name || "",
            shopname: productData?.shopname || "",
            price: productData?.price || "",
            discountPercentage: productData?.discountPercentage || "",
            FinalPrice: productData?.FinalPrice || "",
            category: productData?.category?._id || "",
            thumbnail: productData?.thumbnail || "",
            availableTimes: productData?.availableTimes.join(", ") || "", // Convert array to comma separated string
            minorderquantity: productData?.minorderquantity || "",
            packof: productData?.packof || "",
            active: productData?.active || "", // Ensure 'active' status is set
            ourprice: productData?.ourprice || "",
            shopPrices: productData?.shopPrices || [],
          });

          // Fetch categories
          await fetchCategory(); // Call fetchCategory directly
        } catch (error) {
          console.error("Error fetching product details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [userLoaded, productId]);

  // Handle drag start for shop price reordering
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
    e.target.style.opacity = "0.5";
  };

  // Handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = "#e8f5e9"; // Light green background on hover
  };

  // Handle drop event for reordering
  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData("text/plain");

    if (draggedIndex !== targetIndex) {
      const updatedShopPrices = [...formData.shopPrices];
      const [draggedItem] = updatedShopPrices.splice(draggedIndex, 1);
      updatedShopPrices.splice(targetIndex, 0, draggedItem);

      // Update positionId after reordering
      updatedShopPrices.forEach((shopPrice, index) => {
        shopPrice.poistionId = index + 1;
      });

      setFormData({ ...formData, shopPrices: updatedShopPrices });
    }

    e.target.style.backgroundColor = ""; // Reset background color
  };


  // Handle input field change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const newFormData = { ...prevData, [name]: value };

      // Recalculate Final Price when price or discountPercentage changes
      if (name === "price" || name === "discountPercentage") {
        const price = parseFloat(newFormData.price);
        const discountPercentage = parseFloat(newFormData.discountPercentage);

        if (!isNaN(price) && !isNaN(discountPercentage)) {
          let finalPrice = price - (price * discountPercentage) / 100;

          // Round the final price to the nearest whole number
          finalPrice = Math.round(finalPrice);

          newFormData.FinalPrice = finalPrice;
        } else {
          newFormData.FinalPrice = "";
        }
      }

      return newFormData;
    });
  };
  // Handle Shop Price Changes
  const handleShopPriceChange = (e, index, field) => {
    const { value } = e.target;
    const updatedShopPrices = [...formData.shopPrices];
    updatedShopPrices[index][field] = value; // Update the field (shopname, price, active, etc.)

    // Recalculate the FinalPrice if price or discountPercentage changes
    if (field === "price" || field === "discountPercentage") {
      const price = parseFloat(updatedShopPrices[index].price);
      let discountPercentage = parseFloat(updatedShopPrices[index].discountPercentage);

      if (!isNaN(price) && !isNaN(discountPercentage)) {
        let finalPrice = price - (price * discountPercentage) / 100;
        // Round the final price to the nearest whole number
        finalPrice = Math.round(finalPrice);

        updatedShopPrices[index].FinalPrice = finalPrice;
      } else {
        updatedShopPrices[index].FinalPrice = "";
      }
    }

    // Update the form data with the new shopPrices array
    setFormData({ ...formData, shopPrices: updatedShopPrices });
  };


  // Handle image upload to cloudinary
  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    try {
      const url = await uploadToCloudinary(file, setUploadProgress);
      if (type === "thumbnail") {
        setFormData({ ...formData, thumbnail: url });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const flattenSubcategories = (selectedSubcategories) => {
    return Object.values(selectedSubcategories).flat();
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Flatten selected subcategories into an array
      const subcategoryArray = flattenSubcategories(selectedSubcategories);
  
      // Update formData with multicategory and subcategory
      formData.multicategory = multicategory;
      formData.subcategory = subcategoryArray; // Include flattened subcategory array
  
      setUpdateLoader(true);
      await makeApi(`/api/update-product/${productId}`, "PUT", formData);
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    } finally {
      setUpdateLoader(false);
    }
  };

  const handleAddShopPrice = () => {
    const newShopPrice = {
      shopname: "",
      price: "",
      discountPercentage: "",
      FinalPrice: "",
      poistionId: formData.shopPrices.length + 1,
      ourprice: "",
      active: "true",
    };
    setFormData({ ...formData, shopPrices: [...formData.shopPrices, newShopPrice] });
  };

  const handleRemoveShopPrice = (index) => {
    const updatedShopPrices = [...formData.shopPrices];
    updatedShopPrices.splice(index, 1);
    // Reassign positionIds after removal
    updatedShopPrices.forEach((shopPrice, idx) => {
      shopPrice.poistionId = idx + 1;
    });
    setFormData({ ...formData, shopPrices: updatedShopPrices });
  };

  const handleMulticategoryChange = (e) => {
    const { value, checked } = e.target;
    setMulticategory((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
    if (checked) {
      fetchSubcategories(value); // Fetch subcategories for the selected category
    }
  };
  const handleSubcategoryChange = (e, categoryId, subcategoryId) => {
    const { checked } = e.target;
    setSelectedSubcategories((prev) => {
      const updatedSubcategories = { ...prev };
      if (checked) {
        updatedSubcategories[categoryId] = [
          ...(updatedSubcategories[categoryId] || []),
          subcategoryId,
        ];
      } else {
        updatedSubcategories[categoryId] = updatedSubcategories[categoryId].filter(
          (id) => id !== subcategoryId
        );
      }
      return updatedSubcategories;
    });
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="main_update_product_page">
          <div>
            <Link to={"/admin/allproducts"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="36"
                fill="currentColor"
                className="bi bi-arrow-left back_arrow_icon"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </Link>
          </div>
          <ToastContainer style={{ width: '300px' }} position="top-center" autoClose={3000} />

          <div className="update-product-container">
            <h2>Update Product</h2>
            <form onSubmit={handleSubmit}>
              {user?.role === "admin" && (
                <>
                  <div className="form-section">
                    <h3>Top Saller</h3>
                    <div className="form-group">
                      <label>Top Saller:</label>
                      <input
                        type="checkbox"
                        name="topsaller"
                        checked={formData.topsaller}
                        onChange={(e) =>
                          setFormData({ ...formData, topsaller: e.target.checked })
                        }
                      />
                    </div>
                  </div>
                </>
              )}

              {/* General Information Section */}
              <div className="form-section">
                <h3>General Information</h3>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Shop Name:</label>
                  <input
                    type="text"
                    name="shopname"
                    value={formData.shopname}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>

              {/* Pricing Section */}
              <div className="form-section">
                <h3>Pricing</h3>
                <div className="form-group">
                  <label>Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Discount Percentage:</label>
                  <input
                    type="number"
                    name="discountPercentage"
                    value={formData.discountPercentage}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Final Price:</label>
                  <input
                    type="number"
                    name="FinalPrice"
                    value={formData.FinalPrice || ""}
                    readOnly
                  />
                </div>
              </div>
              {/* ourprice */}
              <div className="form-group">
                <label>Our Price:</label>
                <input
                  type="number"
                  name="ourprice"
                  value={formData.ourprice}
                  onChange={handleChange}
                />
              </div>

              {/* Shop Prices Section */}
              {/* Shop Prices Section */}
              <div className="form-section">
                <h3>Shop Prices</h3>
                <div className="shop-prices-container">
                  {formData.shopPrices
                    .sort((a, b) => a.poistionId - b.poistionId) // Sort by positionId
                    .map((shopPrice, index) => (
                      <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        className="shop-price-item"
                      >
                        <div className="input-group">
                          <label htmlFor={`shopname-${index}`}>Shop Name</label>
                          <input
                            id={`shopname-${index}`}
                            type="text"
                            value={shopPrice.shopname}
                            onChange={(e) => handleShopPriceChange(e, index, "shopname")}
                            className="shop-price-input"
                            placeholder="Shop Name"
                          />
                        </div>

                        <div className="input-group">
                          <label htmlFor={`price-${index}`}>Price</label>
                          <input
                            id={`price-${index}`}
                            type="number"
                            value={shopPrice.price}
                            onChange={(e) => handleShopPriceChange(e, index, "price")}
                            className="shop-price-input"
                            placeholder="Price"
                          />
                        </div>

                        <div className="input-group">
                          <label htmlFor={`discountPercentage-${index}`}>Discount %</label>
                          <input
                            id={`discountPercentage-${index}`}
                            type="number"
                            value={shopPrice.discountPercentage}
                            onChange={(e) => handleShopPriceChange(e, index, "discountPercentage")}
                            className="shop-price-input"
                            placeholder="Discount %"
                          />
                        </div>

                        <div className="input-group">
                          <label htmlFor={`finalPrice-${index}`}>Final Price</label>
                          <input
                            id={`finalPrice-${index}`}
                            type="number"
                            value={shopPrice.FinalPrice || ""}
                            readOnly
                            className="shop-price-input"
                            placeholder="Final Price"
                          />
                        </div>

                        <div className="input-group">
                          <label htmlFor={`poistionId-${index}`}>Position ID</label>
                          <input
                            id={`poistionId-${index}`}
                            type="text"
                            value={shopPrice.poistionId}
                            readOnly
                            className="shop-price-position-id"
                          />
                        </div>

                        <div className="input-group">
                          <label htmlFor={`ourprice-${index}`}>Our Price</label>
                          <input
                            id={`ourprice-${index}`}
                            type="text"
                            value={shopPrice.ourprice}
                            onChange={(e) => handleShopPriceChange(e, index, "ourprice")}
                            className="shop-price-position-id"
                          />
                        </div>

                        <div className="input-group">
                          <label htmlFor={`active-${index}`}>Active</label>
                          <select
                            id={`active-${index}`}
                            value={shopPrice.active}
                            onChange={(e) => handleShopPriceChange(e, index, "active")}
                            className="shop-price-select"
                          >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                          </select>
                        </div>

                        <button
                          type="button"
                          className="remove-button"
                          onClick={() => handleRemoveShopPrice(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddShopPrice}
                  className="add-shop-price-button"
                >
                  Add Shop Price
                </button>
              </div>
              {user?.role === "admin" && (
                <>
                  {/* <h3>Multiple Categories</h3> */}
                  {/* {categories.map((cat) => (
                    <div key={cat._id} className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        id={cat._id}
                        value={cat._id}
                        checked={multicategory.includes(cat._id)}

                        onChange={handleMulticategoryChange}
                      />
                      <label htmlFor={cat._id}>{cat.name}</label>
                    </div>
                  ))} */}

                </>
              )}

<div className="form-section">
  <h3>Categories</h3>
  {categories.map((cat) => (
    <div key={cat._id} className="checkbox-wrapper">
      <input
        type="checkbox"
        id={cat._id}
        value={cat._id}
        checked={multicategory.includes(cat._id)}
        onChange={handleMulticategoryChange}
      />
      <label htmlFor={cat._id}>{cat.name}</label>

      {multicategory.includes(cat._id) && subcategories[cat._id] && (
        <div className="subcategory-wrapper">
          {subcategories[cat._id].map((subcat) => (
            <div key={subcat._id} className="subcategory-checkbox">
              <input
                type="checkbox"
                id={subcat._id}
                value={subcat._id}
                checked={selectedSubcategories[cat._id]?.includes(subcat._id)}
                onChange={(e) => handleSubcategoryChange(e, cat._id, subcat._id)}
              />
              <label htmlFor={subcat._id}>{subcat.name}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  ))}
</div>  
              {/* <>
                <div className="form-section">
                  <h3>Categories</h3>
                  {categories.map((cat) => (
                    <div key={cat._id} className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        id={cat._id}
                        value={cat._id}
                        checked={multicategory.includes(cat._id)}

                        onChange={handleMulticategoryChange}
                      />
                      <label htmlFor={cat._id}>{cat.name}</label>
                    </div>
                  ))}
                </div>
              </> */}
              {/* Minimum Order Quantity Section */}
              <div className="form-section">
                <h3>Order Quantity</h3>
                <div className="form-group">
                  <label>Min Order Quantity:</label>
                  <input
                    type="number"
                    name="minorderquantity"
                    value={formData.minorderquantity}
                    onChange={handleChange}
                  />
                </div>

              </div>

              {/* Active Status Section */}
              <div className="form-section">
                <h3>Active Status</h3>
                <div className="form-group">
                  <label>Active:</label>
                  <select
                    name="active"
                    value={formData.active}
                    onChange={handleChange}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="form-section">
                <h3>Product Image</h3>
                <div className="form-group">
                  <label>Thumbnail:</label>
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(e, "thumbnail")}
                  />
                  {formData.thumbnail && (
                    <img
                      src={formData.thumbnail}
                      alt="Thumbnail"
                      className="update_product_image_thumbnail"
                    />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-section">
                <button
                  type="submit"
                  className="admin_panel_button"
                  disabled={updateloader}
                >
                  {updateloader ? <Loader /> : "Update Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateProduct;

// import "../../adminCss/adminUpdateProduct.css";
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { makeApi } from "../../api/callApi";
// import Loader from "../../components/loader/loader";
// import uploadToCloudinary from "../../utils/cloudinaryUpload";
// import { ToastContainer, toast } from "react-toastify";

// function UpdateProduct() {
//   const navigate = useNavigate();
//   const { productId } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [updateloader, setUpdateLoader] = useState(false);
//   const [product, setProduct] = useState(null);
//   const [categories, setCategories] = useState([]); // State to store categories
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [multicategory, setMulticategory] = useState([]); // For multiple categories
//   const [subcategories, setSubcategories] = useState({}); // { categoryId: [subcategories] }
//   const [selectedSubcategories, setSelectedSubcategories] = useState({}); // { categoryId: [subcategoryId1, subcategoryId2] }

//   const [formData, setFormData] = useState({
//     name: "",
//     shopname: "",
//     price: "",
//     discountPercentage: "",
//     FinalPrice: "",
//     category: "",
//     thumbnail: "",
//     availableTimes: [],
//     minorderquantity: "",
//     packof: "",
//     active: "",
//     setOurprice: "",
//     shopPrices: [],
//   });

//   const [user, setUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false); // Track if user is loaded

//   // Fetch user profile on component mount
//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       const checkUserRole = async () => {
//         try {
//           const response = await makeApi("/api/my-profile", "GET");
//           setUser(response?.data?.user); // Set the logged-in user to state
//           setUserLoaded(true); // Mark user as loaded
//         } catch (error) {
//           console.log(error);
//           setUserLoaded(true); // Ensure to still continue even if there's an error
//         }
//       };
//       checkUserRole();
//     } else {
//       setUserLoaded(true); // If no token, we can still proceed to fetch product
//     }
//   }, []);

//   // Fetch categories
//   const fetchCategory = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi("/api/get-all-categories", "GET");
//       if (user.role === "admin") {
//         setCategories(response.data);
//       } else {
//         // Ensure user data is loaded before accessing it
//         const accessibleCategoryIds = user?.categoryacess || [];

//         // Filter categories based on user's access
//         const accessibleCategories = response.data.filter((category) =>
//           accessibleCategoryIds.includes(category._id)
//         );
//         setCategories(accessibleCategories);
//       }
//     } catch (error) {
//       console.log("Error fetching categories:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch subcategories for a given category
//   const fetchSubcategories = async (categoryId) => {
//     try {
//       const response = await makeApi(`/api/get-subcategories?categoryId=${categoryId}`, "GET");
//       setSubcategories((prev) => ({ ...prev, [categoryId]: response.data.subservices }));
//     } catch (error) {
//       console.log("Error fetching subcategories:", error);
//     }
//   };

//   // Fetch product details and categories
//   useEffect(() => {
//     if (userLoaded) {
//       const fetchProduct = async () => {
//         try {
//           setLoading(true);

//           // Fetch product details
//           const response = await makeApi(`/api/get-single-product/${productId}`, "GET");
//           const productData = await response?.data?.product;
//           setProduct(productData);
//           setMulticategory(productData?.multicategory || []);

//           // Set form data with product details
//           setFormData({
//             name: productData?.name || "",
//             shopname: productData?.shopname || "",
//             price: productData?.price || "",
//             discountPercentage: productData?.discountPercentage || "",
//             FinalPrice: productData?.FinalPrice || "",
//             category: productData?.category?._id || "",
//             thumbnail: productData?.thumbnail || "",
//             availableTimes: productData?.availableTimes?.join(", ") || "",
//             minorderquantity: productData?.minorderquantity || "",
//             packof: productData?.packof || "",
//             active: productData?.active || "",
//             ourprice: productData?.ourprice || "",
//             shopPrices: productData?.shopPrices || [],
//           });

//           // Fetch categories
//           await fetchCategory();

//           // Fetch subcategories for selected categories
//           if (productData?.multicategory) {
//             productData.multicategory.forEach((categoryId) => {
//               fetchSubcategories(categoryId);
//             });
//           }
//         } catch (error) {
//           console.error("Error fetching product details:", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchProduct();
//     }
//   }, [userLoaded, productId]);

//   // Handle category selection
//   const handleMulticategoryChange = (e) => {
//     const { value, checked } = e.target;
//     setMulticategory((prev) =>
//       checked ? [...prev, value] : prev.filter((id) => id !== value)
//     );
//     if (checked) {
//       fetchSubcategories(value); // Fetch subcategories for the selected category
//     }
//   };

//   // Handle subcategory selection
//   const handleSubcategoryChange = (e, categoryId, subcategoryId) => {
//     const { checked } = e.target;
//     setSelectedSubcategories((prev) => {
//       const updatedSubcategories = { ...prev };
//       if (checked) {
//         updatedSubcategories[categoryId] = [
//           ...(updatedSubcategories[categoryId] || []),
//           subcategoryId,
//         ];
//       } else {
//         updatedSubcategories[categoryId] = updatedSubcategories[categoryId].filter(
//           (id) => id !== subcategoryId
//         );
//       }
//       return updatedSubcategories;
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       formData.multicategory = multicategory;
//       formData.subcategories = selectedSubcategories; // Include selected subcategories
//       setUpdateLoader(true);
//       await makeApi(`/api/update-product/${productId}`, "PUT", formData);
//       toast.success("Product updated successfully!");
//     } catch (error) {
//       console.error("Error updating product:", error);
//     } finally {
//       setUpdateLoader(false);
//     }
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="main_update_product_page">
//           <div>
//             <Link to={"/admin/allproducts"}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="26"
//                 height="36"
//                 fill="currentColor"
//                 className="bi bi-arrow-left back_arrow_icon"
//                 viewBox="0 0 16 16"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
//                 />
//               </svg>
//             </Link>
//           </div>
//           <ToastContainer style={{ width: '300px' }} position="top-center" autoClose={3000} />

//           <div className="update-product-container">
//             <h2>Update Product</h2>
//             <form onSubmit={handleSubmit}>
//               {/* General Information Section */}
//               <div className="form-section">
//                 <h3>General Information</h3>
//                 <div className="form-group">
//                   <label>Name:</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Shop Name:</label>
//                   <input
//                     type="text"
//                     name="shopname"
//                     value={formData.shopname}
//                     onChange={(e) => setFormData({ ...formData, shopname: e.target.value })}
//                     readOnly
//                   />
//                 </div>
//               </div>

//               {/* Categories and Subcategories Section */}
//               <div className="form-section">
//                 <h3>Categories</h3>
//                 {categories.map((cat) => (
//                   <div key={cat._id} className="checkbox-wrapper">
//                     <input
//                       type="checkbox"
//                       id={cat._id}
//                       value={cat._id}
//                       checked={multicategory.includes(cat._id)}
//                       onChange={handleMulticategoryChange}
//                     />
//                     <label htmlFor={cat._id}>{cat.name}</label>

//                     {multicategory.includes(cat._id) && subcategories[cat._id] && (
//                       <div className="subcategory-wrapper">
//                         {subcategories[cat._id].map((subcat) => (
//                           <div key={subcat._id} className="subcategory-checkbox">
//                             <input
//                               type="checkbox"
//                               id={subcat._id}
//                               value={subcat._id}
//                               checked={selectedSubcategories[cat._id]?.includes(subcat._id)}
//                               onChange={(e) => handleSubcategoryChange(e, cat._id, subcat._id)}
//                             />
//                             <label htmlFor={subcat._id}>{subcat.name}</label>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Submit Button */}
//               <div className="form-section">
//                 <button
//                   type="submit"
//                   className="admin_panel_button"
//                   disabled={updateloader}
//                 >
//                   {updateloader ? <Loader /> : "Update Product"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default UpdateProduct;