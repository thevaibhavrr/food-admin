// import React, { useState, useEffect } from "react";
// import "../../adminCss/allproduct.css";
// import { makeApi } from "../../api/callApi";
// import { Link } from "react-router-dom";
// import ConfirmationModal from "./admindeleteproduct";
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import Loader from "../../components/loader/loader";
// import uploadToCloudinary from "../../utils/cloudinaryUpload"; 


// const Allproduct = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [deleteProductId, setDeleteProductId] = useState(null);
//   const [category, setCategory] = useState(""); // Selected category
//   const [categories, setCategories] = useState([]); // List of categories
//   const [searchQuery, setSearchQuery] = useState("");
//   const [stockQuery, setStockQuery] = useState("");
//   const [ResultPerPage, setResultPerPage] = useState(30);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [toalProduct, setToalProduct] = useState(0);
//   const [productType, setProductType] = useState("");

//   // Fetching all products and categories
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await makeApi("/api/get-all-products-for-admin", "GET");
//         const reversedProducts = response.data.products.reverse();
//         setProducts(reversedProducts);
//         setToalProduct(response.data.totalProducts);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [searchQuery, category, stockQuery, currentPage, ResultPerPage, productType]);

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         setLoading(true);
//         const response = await makeApi("/api/get-all-categories", "GET");
//         setCategories(response.data); // Set available categories
//       } catch (error) {
//         console.log("Error fetching categories:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const a = Math.ceil(toalProduct / ResultPerPage);
//     setTotalPages(a);
//   }, [products, ResultPerPage]);

//   const deleteProduct = async (productId) => {
//     try {
//       const response = await makeApi(`/api/delete-product/${productId}`, "DELETE");
//       setProducts(products.filter((product) => product._id !== productId));
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   const handleDeleteConfirm = () => {
//     if (deleteProductId) {
//       deleteProduct(deleteProductId);
//       setDeleteProductId(null);
//     }
//   };

//   const handlePageClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Filter products based on search query and category
//   const filteredProducts = products.filter((product) => {
//     const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = category ? product.category._id === category : true;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <>
//       <div>
//         <div className="admin_add_product_button_div">
//           <Link to="/admin/add-product">
//             <div className="admin_add_product_button">Add product</div>
//           </Link>
//         </div>

//         {/* Search Box */}
//         <div className="d-flex w-100" >
//         <div className="mb-4 w-75 me-2">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search Products..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             style={{
//               width: "250px",
//               margin: "20px 0",
//               padding: "10px",
//               borderRadius: "5px",
//             }}
//           />
//         </div>
//         </div>

//         {loading ? (
//           <Loader />
//         ) : (
//           <div>
//             <div className="text-center">
//               {filteredProducts.length === 0 && (
//                 <LazyLoadImage
//                   effect="blur"
//                   loading="lazy"
//                   src="https://prenixfurniture.com/image/noproduct.jpg"
//                   alt="no product"
//                   className="w-50 img-fluid"
//                 />
//               )}
//             </div>
//             <div className="product-list">
//               {filteredProducts.map((product) => (
//                 <div key={product._id} className="product-card">
//                   <LazyLoadImage
//                     effect="blur"
//                     loading="lazy"
//                     src={product.thumbnail.replace('http://', 'https://')}
//                     alt={product.name}
//                     className={"admin_page_product_thumbnail"}
//                   />
//                   <div className="product-info">
//                     <h3>{product.name}</h3>
//                     <p>Price: ₹{product.FinalPrice}</p>
//                   </div>
//                   <div className="all_products_page_button">
//                     <Link to={`/admin/product-update/${product._id}`}>
//                       <button className="edit_button_all_product">Edit</button>
//                     </Link>
//                     <button
//                       onClick={() => setDeleteProductId(product._id)}
//                       className="delete_button_all_product"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                   <div className="text-center" >
//                     <Link to={`/admin/product-details/${product._id}`}>
//                       <button className="view_button_all_product">View</button>
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

       
//       </div>

//       <ConfirmationModal
//         isOpen={deleteProductId !== null}
//         onClose={() => setDeleteProductId(null)}
//         onConfirm={handleDeleteConfirm}
//       />
//     </>
//   );
// };

// export default Allproduct;
import React, { useState, useEffect } from "react";
import "../../adminCss/allproduct.css";
import { makeApi } from "../../api/callApi";
import { Link } from "react-router-dom";
import ConfirmationModal from "./admindeleteproduct";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loader from "../../components/loader/loader";

const Allproduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [ResultPerPage, setResultPerPage] = useState(50); // Default to 50 products per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [toalProduct, setToalProduct] = useState(0);
  const [categories, setCategories] = useState([]); // All categories
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category for filtering
  const [user, setUser] = useState(null);

  // Fetch products with pagination and category filter
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await makeApi(
          `/api/get-all-products-for-admin?page=${currentPage}&limit=${ResultPerPage}&category=${selectedCategory}`,
          "GET"
        );
        setProducts(response.data.products);
        setToalProduct(response.data.totalProducts);
        setTotalPages(Math.ceil(response.data.totalProducts / ResultPerPage));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, ResultPerPage, selectedCategory]);

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await makeApi("/api/get-all-categories", "GET");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle search functionality
  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await makeApi(
        `/api/search-products?q=${searchQuery}&page=${currentPage}&limit=${ResultPerPage}`,
        "GET"
      );
      setProducts(response.data.products);
      setToalProduct(response.data.totalProducts);
      setTotalPages(Math.ceil(response.data.totalProducts / ResultPerPage));
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle product deletion
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

  // Handle pagination
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // call search api on when any changes in search query
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

    useEffect(() => {
      if (localStorage.getItem("token")) {
        const checkUserRole = async () => {
          try {
            const response = await makeApi("/api/my-profile", "GET");
            setUser(response?.data?.user.role); // Set the logged-in user to state
          } catch (error) {
            console.log(error);
          }
        };
        checkUserRole();
      }
    }, []);

  return (
    <>
      <div className="admin_product_page_container">
        <div className="admin_add_product_button_div">
          <Link to="/admin/add-product">
            <div className="admin_add_product_button">Add Product</div>
          </Link>
        </div>

        {/* Search Box and Category Filter */}
        {user === "admin" && (
          
        <div className="filters_container">
          <div className="search_container">
            <input
              type="text"
              className="search_input"
              placeholder="Search Products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch} className="search_button">
              Search
            </button>
          </div>

          <div className="category_filter">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category_select"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <div>
            {products.length === 0 ? (
              <div className="no_products_found">
                <LazyLoadImage
                  effect="blur"
                  src="https://prenixfurniture.com/image/noproduct.jpg"
                  alt="No products found"
                  className="no_product_image"
                />
              </div>
            ) : (
              <div className="product_list">
                {products.map((product) => (
                  <div key={product._id} className="product_card">
                    <LazyLoadImage
                      effect="blur"
                      src={product.thumbnail.replace("http://", "https://")}
                      alt={product.name}
                      className="product_thumbnail"
                    />
                    <div className="product_info">
                      <h3>{product?.name}</h3>
                      <p>Price: ₹{product.FinalPrice}</p>
                      <p>Category: {product?.category?.name}</p>
                    </div>
                    <div className="product_actions">
                      <Link to={`/admin/product-update/${product._id}`}>
                        <button className="edit_button">Edit</button>
                      </Link>
                      <button
                        onClick={() => setDeleteProductId(product._id)}
                        className="delete_button"
                      >
                        Delete
                      </button>
                      <Link to={`/admin/product-details/${product._id}`}>
                        <button className="view_button">View</button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="pagination_container">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination_button"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="pagination_button"
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteProductId !== null}
        onClose={() => setDeleteProductId(null)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default Allproduct;