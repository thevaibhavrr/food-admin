// import React, { useState, useEffect } from "react";
// import "../../adminCss/product/adminaddProduct.css";
// import { makeApi } from "../../api/callApi";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import uploadToCloudinary from "../../utils/cloudinaryUpload";
// import Loader from "../../components/loader/loader";

// function AdminAddProduct() {
//   const [categories, setCategories] = useState([]);
//   const [Loading, setLoading] = useState(false);
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [shopPrices, setShopPrices] = useState([]);
//   const [discountPercentage, setDiscountPercentage] = useState(0);
//   const [thumbnail, setThumbnail] = useState("");
//   const [category, setCategory] = useState("");
//   const [availableTimes, setAvailableTimes] = useState([]);
//   const [minorderquantity, setMinorderquantity] = useState("");
//   const [packof, setPackof] = useState("");
//   const [ourprice, setOurprice] = useState("");
//   const [FinalPrice, setFinalPrice] = useState(0);
//   const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);
//   const [user, setUser] = useState(null);
//   const [shopname, setShopname] = useState("");

//   // Function to fetch categories and filter based on user access
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
//         const accessibleCategories = response.data.filter(category =>
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

//   useEffect(() => {
//     if (user) {
//       // Fetch categories once the user data is available
//       fetchCategory();
//     }
//   }, [user]); // Add 'user' as a dependency

//   // Fetch user profile on component mount
//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       const checkUserRole = async () => {
//         try {
//           const response = await makeApi("/api/my-profile", "GET");
//           setShopname(response?.data?.user?.shopname);
//           setUser(response?.data?.user); // Set the logged-in user to state
//         } catch (error) {
//           console.log(error);
//         }
//       };
//       checkUserRole();
//     }
//   }, []);

//   const calculateFinalPrice = (price, discountPercentage) => {
//     const finalPrice = price - (price * (discountPercentage / 100));
//     return Math.round(finalPrice);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const requiredFields = [];
//     if (!name) requiredFields.push("Name");
//     if (!price && shopPrices.length === 0) requiredFields.push("Price or Shop Prices");
//     if (!category) requiredFields.push("Category");
//     if (!thumbnail) requiredFields.push("Thumbnail");

//     if (requiredFields.length > 0) {
//       const fieldNames = requiredFields.join(", ");
//       toast.error(`Please fill all required fields: ${fieldNames}`);
//       setLoading(false);
//       return;
//     }

//     const finalPrice = calculateFinalPrice(price, discountPercentage);

//     try {
//       const response = await makeApi("/api/create-product", "POST", {
//         name,
//         shopPrices,
//         shopname,
//         price,
//         discountPercentage,
//         FinalPrice: finalPrice,
//         thumbnail,
//         category,
//         availableTimes,
//         minorderquantity,
//         packof,
//         ourprice,
//       });

//       toast.success("Product added successfully!");

//       // Reset the form fields
//       setName("");
//       setShopPrices([{ shopname: "", price: "", poistionId: "", active: "true", ourprice: "" }]);
//       setPrice("");
//       setDiscountPercentage(0);
//       setThumbnail("");
//       setCategory("");
//       setAvailableTimes([]);
//       setMinorderquantity("");
//       setPackof("");
//       setFinalPrice(0);
//       setThumbnailUploadProgress(0);
//     } catch (error) {
//       toast.error("Failed to add product.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleThumbnailUpload = async (event) => {
//     try {
//       const file = event.target.files[0];
//       if (file) {
//         const uploadedImageUrl = await uploadToCloudinary(file, setThumbnailUploadProgress);
//         setThumbnail(uploadedImageUrl);
//         setThumbnailUploadProgress(100);
//       }
//     } catch (error) {
//       toast.error("Thumbnail upload failed.");
//     }
//   };

//   return (
//     <div className="add-product-container">
//       <div className="header-section">
//         <Link to={"/admin/allproducts"}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="26"
//             height="36"
//             fill="currentColor"
//             className="bi bi-arrow-left back_arrow_icon"
//             viewBox="0 0 16 16"
//           >
//             <path
//               fillRule="evenodd"
//               d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
//             />
//           </svg>
//         </Link>
//         <div className="add_product_text">Add Product</div>
//         <ToastContainer />
//       </div>

//       {Loading && <Loader />}

//       <form onSubmit={handleSubmit} className="form-section">
//         <div className="section-wrapper">
//           <h3>Product Details</h3>
//           <p>shop :  {shopname}</p>
//           <input
//             type="text"
//             className="add_product_input_filed"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         {user?.role === "admin" && (
//           <div className="section-wrapper">
//             <h3>Shop Prices</h3>
//             {shopPrices.map((shopPrice, index) => (
//               <div key={index} className="shop-price-row">
//                 <input
//                   type="text"
//                   className="add_product_input_filed"
//                   placeholder="Shop Name"
//                   value={shopPrice.shopname}
//                   onChange={(e) => {
//                     const updatedShopPrices = [...shopPrices];
//                     updatedShopPrices[index].shopname = e.target.value;
//                     setShopPrices(updatedShopPrices);
//                   }}
//                 />
//                 <input
//                   type="number"
//                   className="add_product_input_filed"
//                   placeholder="Price"
//                   value={shopPrice.price}
//                   onChange={(e) => {
//                     const updatedShopPrices = [...shopPrices];
//                     updatedShopPrices[index].price = e.target.value;
//                     setShopPrices(updatedShopPrices);
//                   }}
//                 />
//                 <input
//                   type="number"
//                   className="add_product_input_filed"
//                   placeholder="Position ID"
//                   value={shopPrice.poistionId}
//                   onChange={(e) => {
//                     const updatedShopPrices = [...shopPrices];
//                     updatedShopPrices[index].poistionId = e.target.value;
//                     setShopPrices(updatedShopPrices);
//                   }}
//                 />
//                 {/* ourprice */}
//                 <input
//                   type="number"
//                   className="add_product_input_filed"
//                   placeholder="ourprice"
//                   value={shopPrice.ourprice}
//                   onChange={(e) => {
//                     const updatedShopPrices = [...shopPrices];
//                     updatedShopPrices[index].ourprice = e.target.value;
//                     setShopPrices(updatedShopPrices);
//                   }}
//                 />
//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   onClick={() => {
//                     const updatedShopPrices = shopPrices.filter((_, i) => i !== index);
//                     setShopPrices(updatedShopPrices);
//                   }}
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               className="btn btn-warning"
//               onClick={() => setShopPrices([...shopPrices, { shopname: "", price: "" }])}
//             >
//               Add Shop Price
//             </button>
//           </div>
//         )}


//         <div className="section-wrapper">
//           <h3>Price & Discount</h3>


//           <input
//             type="number"
//             className="add_product_input_filed"
//             placeholder="Price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//           <input
//             type="number"
//             className="add_product_input_filed"
//             placeholder="Discount Percentage"
//             value={discountPercentage}
//             onChange={(e) => setDiscountPercentage(e.target.value)}
//           />
//           <input
//             type="number"
//             className="add_product_input_filed"
//             placeholder="Final Price"
//             value={calculateFinalPrice(price, discountPercentage)}
//             readOnly
//           />
//           {/* setOurprice */}
//           <input
//             type="number"
//             className="add_product_input_filed"
//             placeholder="ourprice"
//             value={ourprice}
//             onChange={(e) => setOurprice(e.target.value)}
//           />

//         </div>

//         <div className="section-wrapper">
//           <h3>Product Thumbnail</h3>
//           <input
//             type="file"
//             onChange={handleThumbnailUpload}
//           />
//           {thumbnailUploadProgress > 0 && <div>Upload Progress: {thumbnailUploadProgress}%</div>}
//           {thumbnail && <img src={thumbnail} alt="Thumbnail" width="100" />}
//         </div>

//         <div className="section-wrapper">
//           <h3>Category</h3>
//           <select
//             className="add_product_input_filed"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat._id} value={cat._id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button type="submit" className="admin_add_product_button">
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AdminAddProduct;


import React, { useState, useEffect } from "react";
import "../../adminCss/product/adminaddProduct.css";
import { makeApi } from "../../api/callApi";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uploadToCloudinary from "../../utils/cloudinaryUpload";
import Loader from "../../components/loader/loader";

function AdminAddProduct() {
  const [categories, setCategories] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [shopPrices, setShopPrices] = useState([]);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState(""); // For single category
  const [multicategory, setMulticategory] = useState([]); // For multiple categories
  const [availableTimes, setAvailableTimes] = useState([]);
  const [minorderquantity, setMinorderquantity] = useState("");
  const [packof, setPackof] = useState("");
  const [ourprice, setOurprice] = useState("");
  const [FinalPrice, setFinalPrice] = useState(0);
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);
  const [user, setUser] = useState(null);
  const [shopname, setShopname] = useState("");

  // Function to fetch categories and filter based on user access
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
    if (user) {
      // Fetch categories once the user data is available
      fetchCategory();
    }
  }, [user]); // Add 'user' as a dependency

  // Fetch user profile on component mount
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const checkUserRole = async () => {
        try {
          const response = await makeApi("/api/my-profile", "GET");
          setShopname(response?.data?.user?.shopname);
          setUser(response?.data?.user); // Set the logged-in user to state
        } catch (error) {
          console.log(error);
        }
      };
      checkUserRole();
    }
  }, []);

  const calculateFinalPrice = (price, discountPercentage) => {
    const finalPrice = price - (price * (discountPercentage / 100));
    return Math.round(finalPrice);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requiredFields = [];
    if (!name) requiredFields.push("Name");
    if (!price && shopPrices.length === 0) requiredFields.push("Price or Shop Prices");
    if (!category && multicategory.length === 0) requiredFields.push("Category");
    if (!thumbnail) requiredFields.push("Thumbnail");

    if (requiredFields.length > 0) {
      const fieldNames = requiredFields.join(", ");
      toast.error(`Please fill all required fields: ${fieldNames}`);
      setLoading(false);
      return;
    }

    const finalPrice = calculateFinalPrice(price, discountPercentage);

    try {
      const response = await makeApi("/api/create-product", "POST", {
        name,
        shopPrices,
        shopname,
        price,
        discountPercentage,
        FinalPrice: finalPrice,
        thumbnail,
        // category,
        multicategory, // Multiple categories
        availableTimes,
        minorderquantity,
        packof,
        ourprice,
      });

      toast.success("Product added successfully!");

      // Reset the form fields
      setName("");
      setShopPrices([{ shopname: "", price: "", poistionId: "", active: "true", ourprice: "" }]);
      setPrice("");
      setDiscountPercentage(0);
      setThumbnail("");
      setCategory("");
      setMulticategory([]); // Reset multiple categories
      setAvailableTimes([]);
      setMinorderquantity("");
      setPackof("");
      setFinalPrice(0);
      setThumbnailUploadProgress(0);
    } catch (error) {
      toast.error("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnailUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const uploadedImageUrl = await uploadToCloudinary(file, setThumbnailUploadProgress);
        setThumbnail(uploadedImageUrl);
        setThumbnailUploadProgress(100);
      }
    } catch (error) {
      toast.error("Thumbnail upload failed.");
    }
  };

  // Handle multiple category selection
  const handleMulticategoryChange = (e) => {
    const { value, checked } = e.target;
    setMulticategory((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  return (
    <div className="add-product-container">
      <div className="header-section">
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
        <div className="add_product_text">Add Product</div>
        <ToastContainer />
      </div>

      {Loading && <Loader />}

      <form onSubmit={handleSubmit} className="form-section">
        <div className="section-wrapper">
          <h3>Product Details</h3>
          <p>shop : {shopname}</p>
          <input
            type="text"
            className="add_product_input_filed"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="section-wrapper">
          <h3>Price & Discount</h3>
          <input
            type="number"
            className="add_product_input_filed"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            className="add_product_input_filed"
            placeholder="Discount Percentage"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
          />
          <input
            type="number"
            className="add_product_input_filed"
            placeholder="Final Price"
            value={calculateFinalPrice(price, discountPercentage)}
            readOnly
          />
          <input
            type="number"
            className="add_product_input_filed"
            placeholder="ourprice"
            value={ourprice}
            onChange={(e) => setOurprice(e.target.value)}
          />
        </div>

        <div className="section-wrapper">
          <h3>Product Thumbnail</h3>
          <input
            type="file"
            onChange={handleThumbnailUpload}
          />
          {thumbnailUploadProgress > 0 && <div>Upload Progress: {thumbnailUploadProgress}%</div>}
          {thumbnail && <img src={thumbnail} alt="Thumbnail" width="100" />}
        </div>

        <div className="section-wrapper">
          <h3>Category</h3>
          <select
            className="add_product_input_filed"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="section-wrapper">
          <h3>Multiple Categories</h3>
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

        <button type="submit" className="admin_add_product_button">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AdminAddProduct;
