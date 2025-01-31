import React, { useState, useEffect } from "react";
import "../../adminCss/allproduct.css";
import { makeApi } from "../../api/callApi";
import { Link } from "react-router-dom";
import ConfirmationModal from "./admindeleteproduct";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Loader from "../../components/loader/loader";
import uploadToCloudinary from "../../utils/cloudinaryUpload"; 


const Allproduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [category, setCategory] = useState(""); // Selected category
  const [categories, setCategories] = useState([]); // List of categories
  const [searchQuery, setSearchQuery] = useState("");
  const [stockQuery, setStockQuery] = useState("");
  const [ResultPerPage, setResultPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [toalProduct, setToalProduct] = useState(0);
  const [productType, setProductType] = useState("");

  // Fetching all products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await makeApi("/api/get-all-products-for-admin", "GET");
        const reversedProducts = response.data.products.reverse();
        setProducts(reversedProducts);
        setToalProduct(response.data.totalProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchQuery, category, stockQuery, currentPage, ResultPerPage, productType]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await makeApi("/api/get-all-categories", "GET");
        setCategories(response.data); // Set available categories
      } catch (error) {
        console.log("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    const a = Math.ceil(toalProduct / ResultPerPage);
    setTotalPages(a);
  }, [products, ResultPerPage]);

  const deleteProduct = async (productId) => {
    try {
      const response = await makeApi(`/api/delete-product/${productId}`, "DELETE");
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteProductId) {
      deleteProduct(deleteProductId);
      setDeleteProductId(null);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category ? product.category._id === category : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div>
        <div className="admin_add_product_button_div">
          <Link to="/admin/add-product">
            <div className="admin_add_product_button">Add product</div>
          </Link>
        </div>

        {/* Search Box */}
        <div className="d-flex w-100" >
        <div className="mb-4 w-75 me-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search Products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "250px",
              margin: "20px 0",
              padding: "10px",
              borderRadius: "5px",
            }}
          />
        </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div>
            <div className="text-center">
              {filteredProducts.length === 0 && (
                <LazyLoadImage
                  effect="blur"
                  loading="lazy"
                  src="https://prenixfurniture.com/image/noproduct.jpg"
                  alt="no product"
                  className="w-50 img-fluid"
                />
              )}
            </div>
            <div className="product-list">
              {filteredProducts.map((product) => (
                <div key={product._id} className="product-card">
                  <LazyLoadImage
                    effect="blur"
                    loading="lazy"
                    src={product.thumbnail.replace('http://', 'https://')}
                    alt={product.name}
                    className={"admin_page_product_thumbnail"}
                  />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>Price: ₹{product.FinalPrice}</p>
                  </div>
                  <div className="all_products_page_button">
                    <Link to={`/admin/product-update/${product._id}`}>
                      <button className="edit_button_all_product">Edit</button>
                    </Link>
                    <button
                      onClick={() => setDeleteProductId(product._id)}
                      className="delete_button_all_product"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="text-center" >
                    <Link to={`/admin/product-details/${product._id}`}>
                      <button className="view_button_all_product">View</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

       
      </div>

      <ConfirmationModal
        isOpen={deleteProductId !== null}
        onClose={() => setDeleteProductId(null)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default Allproduct;

// import React, { useState, useEffect } from "react";
// import "../../adminCss/allproduct.css";
// import { makeApi } from "../../api/callApi";
// import { Link } from "react-router-dom";
// import ConfirmationModal from "./admindeleteproduct";
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import Loader from "../../components/loader/loader";
// // import uploadToS3 from "../../utils/uploadToS3";
// import uploadToCloudinary from "../../utils/cloudinaryUpload"; 


// const Allproduct = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [deleteProductId, setDeleteProductId] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await makeApi("/api/get-all-products-for-admin", "GET");
//         setProducts(response.data.products.reverse());
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleImageUpload = async (file, productId) => {
//     try {
//       const imageUrl = await uploadToCloudinary(file, (progress) => {
//         setUploadProgress((prev) => ({ ...prev, [productId]: progress }));
//       });
//       if (imageUrl) {
//         await makeApi(`/api/update-product/${productId}`, "PUT", { thumbnail: imageUrl });
//         setProducts((prevProducts) =>
//           prevProducts.map((product) =>
//             product._id === productId ? { ...product, thumbnail: imageUrl } : product
//           )
//         );
//       }
//     } catch (error) {
//       console.error("Error updating product image:", error);
//     }
//   };

//   return (
//     <div>
//       <div className="admin_add_product_button_div">
//         <Link to="/admin/add-product">
//           <div className="admin_add_product_button">Add product</div>
//         </Link>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="product-list">
//           {products.map((product) => (
//             <div key={product._id} className="product-card">
//               <LazyLoadImage
//                 effect="blur"
//                 loading="lazy"
//                 src={product.thumbnail.replace('http://', 'https://')}
//                 alt={product.name}
//                 className="admin_page_product_thumbnail"
//               />
//               <small>{product?.thumbnail}</small>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleImageUpload(e.target.files[0], product._id)}
//                 className="image-upload-input"
//               />
//               {uploadProgress[product._id] && (
//                 <p>Uploading: {uploadProgress[product._id]}%</p>
//               )}
//               <div className="product-info">
//                 <h3>{product.name}</h3>
//                 <p>Price: ₹{product.FinalPrice}</p>
//               </div>
//               <div className="all_products_page_button">
//                 <Link to={`/admin/product-update/${product._id}`}>
//                   <button className="edit_button_all_product">Edit</button>
//                 </Link>
//                 <button
//                   onClick={() => setDeleteProductId(product._id)}
//                   className="delete_button_all_product"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}


//     </div>
//   );
// };

// export default Allproduct;
