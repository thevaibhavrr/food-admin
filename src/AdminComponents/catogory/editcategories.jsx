// import React, { useState, useEffect } from "react";
// import { makeApi } from "../../api/callApi";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import uploadToCloudinary from "../../utils/cloudinaryUpload";

// const EditCategory = () => {
//   const [name, setName] = useState("");
//   const [active, setDescription] = useState("");
//   const [thumbnail, setThumbnail] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);
//   const [closed, setClosed] = useState("");
// const [type, setType] = useState("");
//   const { Id } = useParams(); // Get category ID from URL
//   const navigate = useNavigate(); // Use to navigate after successful update

//   // Fetch category details by ID when the component mounts
//   useEffect(() => {
//     const fetchCategoryDetails = async () => {
//       try {
//         const response = await makeApi(`/api/get-single-category/${Id}`, "GET");
//         const category = response.data;
//         setName(category.name);
//         setDescription(category.active);
//         setThumbnail(category.image); // Assuming `image` is the category image URL
//         setClosed(category.closed);
//         setType(category.type);
//       } catch (error) {
//         console.error("Error fetching category details:", error);
//         setErrorMessage("Error fetching category details.");
//       }
//     };
//     fetchCategoryDetails();
//   }, [Id]);

//   // Handle category form submission (updating category)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const updatedFormData = { name, active, image: thumbnail };

//       const response = await makeApi(`/api/update-category/${Id}`, "PUT", updatedFormData);
//       if (response.status === 200) {
//         alert("Category updated successfully");
//         navigate("/admin/all-categories"); // Navigate back to the categories list
//       }
//     } catch (error) {
//       console.error("Error updating category:", error);
//       setErrorMessage("Error updating category. Please try again.");
//     }
//   };

//   // Handle file upload for category image
//   const handleThumbnailUpload = async (event) => {
//     try {
//       const file = event.target.files[0];
//       if (file) {
//         const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);
//         setThumbnail(uploadedImageUrl); // Set the new image URL after upload
//         setThumbnailUploadProgress(100); // Assuming upload is complete
//       }
//     } catch (error) {
//       console.log("Thumbnail upload error", error);
//     }
//   };

//   return (
//     <>
//       <div className="container mt-4">
//         <Link to={"/admin/all-categories"}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="26"
//             height="36"
//             fill="currentColor"
//             className="bi bi-arrow-left back_arrow_icon back_button_add_catogory"
//             viewBox="0 0 16 16"
//           >
//             <path
//               fillRule="evenodd"
//               d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
//             />
//           </svg>
//         </Link>
//         <div className="my-4">
//           <h3>Edit Category</h3>
//           {errorMessage && (
//             <div className="alert alert-danger" role="alert">
//               {errorMessage}
//             </div>
//           )}
//           <form onSubmit={handleSubmit} className="form-group">
//             <div className="mb-3">
//               <label htmlFor="name" className="form-label">
//                 Name:
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 className="form-control"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="active" className="form-label">
//               type:
//               </label>
//               <input
//                 id="active"
//                 className="form-control"
//                 value={type}
//                 onChange={(e) => setType(e.target.value)}
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="closed" className="form-label">
//                 Closed:
//               </label>
//                   {/* dropdown */}

//               <select
//                 id="closed"
//                 className="form-select"
//                 value={closed}
//                 onChange={(e) => setClosed(e.target.value)}
//               >
//                 <option value="false">false</option>
//                 <option value="true">true</option>
//               </select>

//             </div>

//             <div className="mb-3">
//               <label htmlFor="file" className="form-label">
//                 Category Image:
//               </label>
//               <input
//                 type="file"
//                 name="file"
//                 id="file"
//                 className="form-control"
//                 onChange={handleThumbnailUpload}
//               />
//             </div>
//             {thumbnail && (
//               <div>
//                 <img src={thumbnail.replace('http://', 'https://')} alt="Thumbnail" style={{ maxWidth: "100px" }} />
//               </div>
//             )}
//             <button type="submit" className="btn btn-primary mt-3">
//               Update Category
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditCategory;



// import React, { useState, useEffect } from "react";
// import { makeApi } from "../../api/callApi";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import uploadToCloudinary from "../../utils/cloudinaryUpload";

// const EditCategory = () => {
//   const [name, setName] = useState("");
//   const [active, setActive] = useState("");
//   const [thumbnail, setThumbnail] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);
//   const [closed, setClosed] = useState("");
//   const [type, setType] = useState("");
//   const [subcategories, setSubcategories] = useState([]);
//   const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
//   const [currentSubcategory, setCurrentSubcategory] = useState(null);
//   const [updatedSubcategoryName, setUpdatedSubcategoryName] = useState("");
//   const [updatedSubcategoryType, setUpdatedSubcategoryType] = useState("");
//   const [updatedSubcategoryImage, setUpdatedSubcategoryImage] = useState("");  // state for subcategory image
//   const { Id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCategoryDetails = async () => {
//       try {
//         const categoryResponse = await makeApi(`/api/get-single-category/${Id}`, "GET");
//         const category = categoryResponse.data;
//         setName(category.name);
//         setActive(category.active);
//         setThumbnail(category.image);
//         setClosed(category.closed);
//         setType(category.type);

//         const subcategoriesResponse = await makeApi(`/api/get-subcategories?categoryId=${Id}`, "GET");
//         setSubcategories(subcategoriesResponse.data.subservices);
//       } catch (error) {
//         console.error("Error fetching category or subcategory details:", error);
//         setErrorMessage("Error fetching category or subcategory details.");
//       }
//     };
//     fetchCategoryDetails();
//   }, [Id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const updatedFormData = { name, active, image: thumbnail, closed, type };
//       const response = await makeApi(`/api/update-category/${Id}`, "PUT", updatedFormData);
//       if (response.status === 200) {
//         alert("Category updated successfully");
//         navigate("/admin/all-categories");
//       }
//     } catch (error) {
//       console.error("Error updating category:", error);
//       setErrorMessage("Error updating category. Please try again.");
//     }
//   };

//   const handleThumbnailUpload = async (event) => {
//     try {
//       const file = event.target.files[0];
//       if (file) {
//         const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);
//         setThumbnail(uploadedImageUrl);
//         setThumbnailUploadProgress(100);
//       }
//     } catch (error) {
//       console.log("Thumbnail upload error", error);
//     }
//   };

//   const handleSubcategoryImageUpload = async (event) => {
//     try {
//       const file = event.target.files[0];
//       if (file) {
//         const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);
//         setUpdatedSubcategoryImage(uploadedImageUrl);
//       }
//     } catch (error) {
//       console.log("Subcategory image upload error", error);
//     }
//   };

//   const handleUpdateSubcategory = async (subcategoryId, updatedData) => {
//     try {
//       const response = await makeApi(`/api/update-subcategory/${subcategoryId}`, "PUT", updatedData);
//         alert("Subcategory updated successfully");
//         const subcategoriesResponse = await makeApi(`/api/get-subcategories?categoryId=${Id}`, "GET");
//         setSubcategories(subcategoriesResponse.data.subservices);
//         setShowSubcategoryModal(false); 
//     } catch (error) {
//       console.error("Error updating subcategory:", error);
//       setErrorMessage("Error updating subcategory. Please try again.");
//     }
//   };

//   const handleShowSubcategoryModal = (subcategory) => {
//     setCurrentSubcategory(subcategory);
//     setUpdatedSubcategoryName(subcategory.name);
//     setUpdatedSubcategoryType(subcategory.type);
//     setUpdatedSubcategoryImage(subcategory.image); // Set the current image as initial value
//     setShowSubcategoryModal(true);
//   };

//   const handleCloseSubcategoryModal = () => {
//     setShowSubcategoryModal(false);
//   };

//   const handleSubcategorySubmit = (e) => {
//     e.preventDefault();
//     if (updatedSubcategoryName && updatedSubcategoryType) {
//       handleUpdateSubcategory(currentSubcategory._id, {
//         name: updatedSubcategoryName,
//         type: updatedSubcategoryType,
//         image: updatedSubcategoryImage, // Send the updated image
//       });
//     }
//   };

//   return (
//     <>
//       <div className="container mt-4">
//         <Link to={"/admin/all-categories"}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="26"
//             height="36"
//             fill="currentColor"
//             className="bi bi-arrow-left back_arrow_icon back_button_add_catogory"
//             viewBox="0 0 16 16"
//           >
//             <path
//               fillRule="evenodd"
//               d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
//             />
//           </svg>
//         </Link>
//         <div className="my-4">
//           <h3>Edit Category</h3>
//           {errorMessage && (
//             <div className="alert alert-danger" role="alert">
//               {errorMessage}
//             </div>
//           )}
//           <form onSubmit={handleSubmit} className="form-group">
//             <div className="mb-3">
//               <label htmlFor="name" className="form-label">
//                 Name:
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 className="form-control"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="type" className="form-label">
//                 Type:
//               </label>
//               <input
//                 id="type"
//                 className="form-control"
//                 value={type}
//                 onChange={(e) => setType(e.target.value)}
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="closed" className="form-label">
//                 Closed:
//               </label>
//               <select
//                 id="closed"
//                 className="form-select"
//                 value={closed}
//                 onChange={(e) => setClosed(e.target.value)}
//               >
//                 <option value="false">false</option>
//                 <option value="true">true</option>
//               </select>
//             </div>

//             <div className="mb-3">
//               <label htmlFor="file" className="form-label">
//                 Category Image:
//               </label>
//               <input
//                 type="file"
//                 name="file"
//                 id="file"
//                 className="form-control"
//                 onChange={handleThumbnailUpload}
//               />
//             </div>
//             {thumbnail && (
//               <div>
//                 <img src={thumbnail.replace("http://", "https://")} alt="Thumbnail" style={{ maxWidth: "100px" }} />
//               </div>
//             )}
//             <button type="submit" className="btn btn-primary mt-3">
//               Update Category
//             </button>
//           </form>

//           {/* Subcategories Section */}
//           <div className="mt-5">
//             <h4>Subcategories</h4>
//             {subcategories.length > 0 ? (
//               subcategories.map((subcategory) => (
//                 <div key={subcategory._id} className="card mb-3">
//                   <div className="card-body">
//                     <h5 className="card-title">{subcategory.name}</h5>
//                     <p className="card-text">Type: {subcategory.type}</p>
//                     <img src={subcategory.image} alt={subcategory.name} style={{ maxWidth: "100px", marginBottom: "10px" }} />
//                     <button
//                       className="btn btn-sm btn-warning"
//                       onClick={() => handleShowSubcategoryModal(subcategory)}
//                     >
//                       Edit Subcategory
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No subcategories found.</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Custom Subcategory Edit Modal */}
//       {showSubcategoryModal && (
//         <div className="custom-modal">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5>Edit Subcategory</h5>
//               <button className="close-btn" onClick={handleCloseSubcategoryModal}>
//                 X
//               </button>
//             </div>
//             <form onSubmit={handleSubcategorySubmit}>
//               <div className="mb-3">
//                 <label htmlFor="subcategoryName" className="form-label">
//                   Name:
//                 </label>
//                 <input
//                   type="text"
//                   id="subcategoryName"
//                   className="form-control"
//                   value={updatedSubcategoryName}
//                   onChange={(e) => setUpdatedSubcategoryName(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="subcategoryType" className="form-label">
//                   Type:
//                 </label>
//                 <input
//                   type="text"
//                   id="subcategoryType"
//                   className="form-control"
//                   value={updatedSubcategoryType}
//                   onChange={(e) => setUpdatedSubcategoryType(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="subcategoryImage" className="form-label">
//                   Subcategory Image:
//                 </label>
//                 <input
//                   type="file"
//                   id="subcategoryImage"
//                   className="form-control"
//                   onChange={handleSubcategoryImageUpload}
//                 />
//               </div>
//               {updatedSubcategoryImage && (
//                 <div>
//                   <img
//                     src={updatedSubcategoryImage.replace("http://", "https://")}
//                     alt="Updated Subcategory"
//                     style={{ maxWidth: "100px", marginBottom: "10px" }}
//                   />
//                 </div>
//               )}
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={handleCloseSubcategoryModal}>
//                   Close
//                 </button>
//                 <button type="submit" className="btn btn-primary">
//                   Update Subcategory
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EditCategory;


// import React, { useState, useEffect } from "react";
// import { makeApi } from "../../api/callApi";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import uploadToCloudinary from "../../utils/cloudinaryUpload";

// const EditCategory = () => {
//   const [name, setName] = useState("");
//   const [active, setActive] = useState("");
//   const [thumbnail, setThumbnail] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);
//   const [closed, setClosed] = useState("");
//   const [type, setType] = useState("");
//   const [subcategories, setSubcategories] = useState([]);
//   const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
//   const [currentSubcategory, setCurrentSubcategory] = useState(null);
//   const [updatedSubcategoryName, setUpdatedSubcategoryName] = useState("");
//   const [updatedSubcategoryType, setUpdatedSubcategoryType] = useState("");
//   const [updatedSubcategoryImage, setUpdatedSubcategoryImage] = useState("");
//   const [showAddSubcategoryModal, setShowAddSubcategoryModal] = useState(false);
//   const [newSubcategoryName, setNewSubcategoryName] = useState("");
//   const [newSubcategoryType, setNewSubcategoryType] = useState("");
//   const [newSubcategoryImage, setNewSubcategoryImage] = useState("");
//   const { Id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCategoryDetails = async () => {
//       try {
//         const categoryResponse = await makeApi(`/api/get-single-category/${Id}`, "GET");
//         const category = categoryResponse.data;
//         setName(category.name);
//         setActive(category.active);
//         setThumbnail(category.image);
//         setClosed(category.closed);
//         setType(category.type);

//         const subcategoriesResponse = await makeApi(`/api/get-subcategories?categoryId=${Id}`, "GET");
//         setSubcategories(subcategoriesResponse.data.subservices);
//       } catch (error) {
//         console.error("Error fetching category or subcategory details:", error);
//         setErrorMessage("Error fetching category or subcategory details.");
//       }
//     };
//     fetchCategoryDetails();
//   }, [Id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const updatedFormData = { name, active, image: thumbnail, closed, type };
//       const response = await makeApi(`/api/update-category/${Id}`, "PUT", updatedFormData);
//       if (response.status === 200) {
//         alert("Category updated successfully");
//         navigate("/admin/all-categories");
//       }
//     } catch (error) {
//       console.error("Error updating category:", error);
//       setErrorMessage("Error updating category. Please try again.");
//     }
//   };

//   const handleThumbnailUpload = async (event) => {
//     try {
//       const file = event.target.files[0];
//       if (file) {
//         const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);
//         setThumbnail(uploadedImageUrl);
//         setThumbnailUploadProgress(100);
//       }
//     } catch (error) {
//       console.log("Thumbnail upload error", error);
//     }
//   };

//   const handleSubcategoryImageUpload = async (event) => {
//     try {
//       const file = event.target.files[0];
//       if (file) {
//         const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);
//         setUpdatedSubcategoryImage(uploadedImageUrl);
//       }
//     } catch (error) {
//       console.log("Subcategory image upload error", error);
//     }
//   };

//   const handleUpdateSubcategory = async (subcategoryId, updatedData) => {
//     try {
//       const response = await makeApi(`/api/update-subcategory/${subcategoryId}`, "PUT", updatedData);
//       alert("Subcategory updated successfully");
//       const subcategoriesResponse = await makeApi(`/api/get-subcategories?categoryId=${Id}`, "GET");
//       setSubcategories(subcategoriesResponse.data.subservices);
//       setShowSubcategoryModal(false);
//     } catch (error) {
//       console.error("Error updating subcategory:", error);
//       setErrorMessage("Error updating subcategory. Please try again.");
//     }
//   };

//   const handleShowSubcategoryModal = (subcategory) => {
//     setCurrentSubcategory(subcategory);
//     setUpdatedSubcategoryName(subcategory.name);
//     setUpdatedSubcategoryType(subcategory.type);
//     setUpdatedSubcategoryImage(subcategory.image);
//     setShowSubcategoryModal(true);
//   };

//   const handleCloseSubcategoryModal = () => {
//     setShowSubcategoryModal(false);
//   };

//   const handleSubcategorySubmit = (e) => {
//     e.preventDefault();
//     if (updatedSubcategoryName && updatedSubcategoryType) {
//       handleUpdateSubcategory(currentSubcategory._id, {
//         name: updatedSubcategoryName,
//         type: updatedSubcategoryType,
//         image: updatedSubcategoryImage,
//       });
//     }
//   };

//   const handleAddSubcategory = async (e) => {
//     e.preventDefault();
//     try {
//       const newSubcategoryData = {
//         name: newSubcategoryName,
//         type: newSubcategoryType,
//         image: newSubcategoryImage,
//         categoryId: Id,
//       };
//       const response = await makeApi("/api/create-subcategory", "POST", newSubcategoryData);
//       if (response.status === 201) {
//         alert("Subcategory created successfully");
//         const subcategoriesResponse = await makeApi(`/api/get-subcategories?categoryId=${Id}`, "GET");
//         setSubcategories(subcategoriesResponse.data.subservices);
//         setShowAddSubcategoryModal(false);
//         setNewSubcategoryName("");
//         setNewSubcategoryType("");
//         setNewSubcategoryImage("");
//       }
//     } catch (error) {
//       console.error("Error creating subcategory:", error);
//       setErrorMessage("Error creating subcategory. Please try again.");
//     }
//   };

//   const handleNewSubcategoryImageUpload = async (event) => {
//     try {
//       const file = event.target.files[0];
//       if (file) {
//         const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);
//         setNewSubcategoryImage(uploadedImageUrl);
//       }
//     } catch (error) {
//       console.log("New subcategory image upload error", error);
//     }
//   };

//   return (
//     <>
//       <div className="container mt-4">
//         <Link to={"/admin/all-categories"}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="26"
//             height="36"
//             fill="currentColor"
//             className="bi bi-arrow-left back_arrow_icon back_button_add_catogory"
//             viewBox="0 0 16 16"
//           >
//             <path
//               fillRule="evenodd"
//               d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
//             />
//           </svg>
//         </Link>
//         <div className="my-4">
//           <h3>Edit Category</h3>
//           {errorMessage && (
//             <div className="alert alert-danger" role="alert">
//               {errorMessage}
//             </div>
//           )}
//           <form onSubmit={handleSubmit} className="form-group">
//             <div className="mb-3">
//               <label htmlFor="name" className="form-label">
//                 Name:
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 className="form-control"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="type" className="form-label">
//                 Type:
//               </label>
//               <input
//                 id="type"
//                 className="form-control"
//                 value={type}
//                 onChange={(e) => setType(e.target.value)}
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="closed" className="form-label">
//                 Closed:
//               </label>
//               <select
//                 id="closed"
//                 className="form-select"
//                 value={closed}
//                 onChange={(e) => setClosed(e.target.value)}
//               >
//                 <option value="false">false</option>
//                 <option value="true">true</option>
//               </select>
//             </div>

//             <div className="mb-3">
//               <label htmlFor="file" className="form-label">
//                 Category Image:
//               </label>
//               <input
//                 type="file"
//                 name="file"
//                 id="file"
//                 className="form-control"
//                 onChange={handleThumbnailUpload}
//               />
//             </div>
//             {thumbnail && (
//               <div>
//                 <img src={thumbnail.replace("http://", "https://")} alt="Thumbnail" style={{ maxWidth: "100px" }} />
//               </div>
//             )}
//             <button type="submit" className="btn btn-primary mt-3">
//               Update Category
//             </button>
//           </form>

//           {/* Subcategories Section */}
//           <div className="mt-5">
//             <h4>Subcategories</h4>
//             <button className="btn btn-success mb-3" onClick={() => setShowAddSubcategoryModal(true)}>
//               Add Subcategory
//             </button>
//             {subcategories.length > 0 ? (
//               subcategories.map((subcategory) => (
//                 <div key={subcategory._id} className="card mb-3">
//                   <div className="card-body">
//                     <h5 className="card-title">{subcategory.name}</h5>
//                     <p className="card-text">Type: {subcategory.type}</p>
//                     <img src={subcategory.image} alt={subcategory.name} style={{ maxWidth: "100px", marginBottom: "10px" }} />
//                     <button
//                       className="btn btn-sm btn-warning"
//                       onClick={() => handleShowSubcategoryModal(subcategory)}
//                     >
//                       Edit Subcategory
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No subcategories found.</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Custom Subcategory Edit Modal */}
//       {showSubcategoryModal && (
//         <div className="custom-modal">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5>Edit Subcategory</h5>
//               <button className="close-btn" onClick={handleCloseSubcategoryModal}>
//                 X
//               </button>
//             </div>
//             <form onSubmit={handleSubcategorySubmit}>
//               <div className="mb-3">
//                 <label htmlFor="subcategoryName" className="form-label">
//                   Name:
//                 </label>
//                 <input
//                   type="text"
//                   id="subcategoryName"
//                   className="form-control"
//                   value={updatedSubcategoryName}
//                   onChange={(e) => setUpdatedSubcategoryName(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="subcategoryType" className="form-label">
//                   Type:
//                 </label>
//                 <input
//                   type="text"
//                   id="subcategoryType"
//                   className="form-control"
//                   value={updatedSubcategoryType}
//                   onChange={(e) => setUpdatedSubcategoryType(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="subcategoryImage" className="form-label">
//                   Subcategory Image:
//                 </label>
//                 <input
//                   type="file"
//                   id="subcategoryImage"
//                   className="form-control"
//                   onChange={handleSubcategoryImageUpload}
//                 />
//               </div>
//               {updatedSubcategoryImage && (
//                 <div>
//                   <img
//                     src={updatedSubcategoryImage.replace("http://", "https://")}
//                     alt="Updated Subcategory"
//                     style={{ maxWidth: "100px", marginBottom: "10px" }}
//                   />
//                 </div>
//               )}
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={handleCloseSubcategoryModal}>
//                   Close
//                 </button>
//                 <button type="submit" className="btn btn-primary" onClick={ handleSubcategorySubmit} >
//                   Update Subcategory
//                 </button> 
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Add Subcategory Modal */}
//       {showAddSubcategoryModal && (
//         <div className="custom-modal">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5>Add Subcategory</h5>
//               <button className="close-btn" onClick={() => setShowAddSubcategoryModal(false)}>
//                 X
//               </button>
//             </div>
//             <form onSubmit={handleAddSubcategory}>
//               <div className="mb-3">
//                 <label htmlFor="newSubcategoryName" className="form-label">
//                   Name:
//                 </label>
//                 <input
//                   type="text"
//                   id="newSubcategoryName"
//                   className="form-control"
//                   value={newSubcategoryName}
//                   onChange={(e) => setNewSubcategoryName(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="newSubcategoryType" className="form-label">
//                   Type:
//                 </label>
//                 <input
//                   type="text"
//                   id="newSubcategoryType"
//                   className="form-control"
//                   value={newSubcategoryType}
//                   onChange={(e) => setNewSubcategoryType(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="newSubcategoryImage" className="form-label">
//                   Subcategory Image:
//                 </label>
//                 <input
//                   type="file"
//                   id="newSubcategoryImage"
//                   className="form-control"
//                   onChange={handleNewSubcategoryImageUpload}
//                 />
//               </div>
//               {newSubcategoryImage && (
//                 <div>
//                   <img
//                     src={newSubcategoryImage.replace("http://", "https://")}
//                     alt="New Subcategory"
//                     style={{ maxWidth: "100px", marginBottom: "10px" }}
//                   />
//                 </div>
//               )}
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={() => setShowAddSubcategoryModal(false)}>
//                   Close
//                 </button>
//                 <button type="submit" className="btn btn-primary">
//                   Add Subcategory
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EditCategory;


import React, { useState, useEffect } from "react";
import { makeApi } from "../../api/callApi";
import { Link, useParams, useNavigate } from "react-router-dom";
import uploadToCloudinary from "../../utils/cloudinaryUpload";

const EditCategory = () => {
  const [name, setName] = useState("");
  const [active, setActive] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);
  const [closed, setClosed] = useState("");
  const [type, setType] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
  const [currentSubcategory, setCurrentSubcategory] = useState(null);
  const [updatedSubcategoryName, setUpdatedSubcategoryName] = useState("");
  const [updatedSubcategoryType, setUpdatedSubcategoryType] = useState("");
  const [updatedSubcategoryImage, setUpdatedSubcategoryImage] = useState("");
  const [showAddSubcategoryModal, setShowAddSubcategoryModal] = useState(false);
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [newSubcategoryType, setNewSubcategoryType] = useState("");
  const [newSubcategoryImage, setNewSubcategoryImage] = useState("");
  const { Id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const categoryResponse = await makeApi(`/api/get-single-category/${Id}`, "GET");
        const category = categoryResponse.data;
        setName(category.name);
        setActive(category.active);
        setThumbnail(category.image);
        setClosed(category.closed);
        setType(category.type);

        const subcategoriesResponse = await makeApi(`/api/get-subcategories?categoryId=${Id}`, "GET");
        setSubcategories(subcategoriesResponse.data.subservices);
      } catch (error) {
        console.error("Error fetching category or subcategory details:", error);
        setErrorMessage("Error fetching category or subcategory details.");
      }
    };
    fetchCategoryDetails();
  }, [Id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = { name, active, image: thumbnail, closed, type };
      const response = await makeApi(`/api/update-category/${Id}`, "PUT", updatedFormData);
      if (response.status === 200) {
        alert("Category updated successfully");
        navigate("/admin/all-categories");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      setErrorMessage("Error updating category. Please try again.");
    }
  };

  const handleThumbnailUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);
        setThumbnail(uploadedImageUrl);
        setThumbnailUploadProgress(100);
      }
    } catch (error) {
      console.log("Thumbnail upload error", error);
    }
  };

  const handleSubcategoryImageUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);
        setUpdatedSubcategoryImage(uploadedImageUrl);
      }
    } catch (error) {
      console.log("Subcategory image upload error", error);
    }
  };

  const handleUpdateSubcategory = async (subcategoryId, updatedData) => {
    try {
      const response = await makeApi(`/api/update-subcategory/${subcategoryId}`, "PUT", updatedData);
      if (response.status === 200) {
        alert("Subcategory updated successfully");
        const subcategoriesResponse = await makeApi(`/api/get-subcategories?categoryId=${Id}`, "GET");
        setSubcategories(subcategoriesResponse.data.subservices);
        setShowSubcategoryModal(false);
      }
    } catch (error) {
      console.error("Error updating subcategory:", error);
      setErrorMessage("Error updating subcategory. Please try again.");
    }
  };

  const handleShowSubcategoryModal = (subcategory) => {
    setCurrentSubcategory(subcategory);
    setUpdatedSubcategoryName(subcategory.name);
    setUpdatedSubcategoryType(subcategory.type);
    setUpdatedSubcategoryImage(subcategory.image);
    setShowSubcategoryModal(true);
  };

  const handleCloseSubcategoryModal = () => {
    setShowSubcategoryModal(false);
  };

  const handleSubcategorySubmit = (e) => {
    e.preventDefault();
    if (currentSubcategory && updatedSubcategoryName ) {
      handleUpdateSubcategory(currentSubcategory._id, {
        name: updatedSubcategoryName,
        type: updatedSubcategoryType,
        image: updatedSubcategoryImage,
      });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleAddSubcategory = async (e) => {
    e.preventDefault();
    try {
      const newSubcategoryData = {
        name: newSubcategoryName,
        type: newSubcategoryType,
        image: newSubcategoryImage,
        categoryId: Id,
      };
      const response = await makeApi("/api/add-subcategory", "POST", newSubcategoryData);
      if (response.status === 201) {
        alert("Subcategory created successfully");
        const subcategoriesResponse = await makeApi(`/api/get-subcategories?categoryId=${Id}`, "GET");
        setSubcategories(subcategoriesResponse.data.subservices);
        setShowAddSubcategoryModal(false);
        setNewSubcategoryName("");
        setNewSubcategoryType("");
        setNewSubcategoryImage("");
      }
    } catch (error) {
      console.error("Error creating subcategory:", error);
      setErrorMessage("Error creating subcategory. Please try again.");
    }
  };

  const handleNewSubcategoryImageUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);
        setNewSubcategoryImage(uploadedImageUrl);
      }
    } catch (error) {
      console.log("New subcategory image upload error", error);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <Link to={"/admin/all-categories"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="36"
            fill="currentColor"
            className="bi bi-arrow-left back_arrow_icon back_button_add_catogory"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </Link>
        <div className="my-4">
          <h3>Edit Category</h3>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="form-group">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">
                Type:
              </label>
              <input
                id="type"
                className="form-control"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="closed" className="form-label">
                Closed:
              </label>
              <select
                id="closed"
                className="form-select"
                value={closed}
                onChange={(e) => setClosed(e.target.value)}
              >
                <option value="false">false</option>
                <option value="true">true</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="file" className="form-label">
                Category Image:
              </label>
              <input
                type="file"
                name="file"
                id="file"
                className="form-control"
                onChange={handleThumbnailUpload}
              />
            </div>
            {thumbnail && (
              <div>
                <img src={thumbnail.replace("http://", "https://")} alt="Thumbnail" style={{ maxWidth: "100px" }} />
              </div>
            )}
            <button type="submit" className="btn btn-primary mt-3">
              Update Category
            </button>
          </form>

          {/* Subcategories Section */}
          <div className="mt-5">
            <h4>Subcategories</h4>
            <button className="btn btn-success mb-3" onClick={() => setShowAddSubcategoryModal(true)}>
              Add Subcategory
            </button>
            {subcategories.length > 0 ? (
              subcategories.map((subcategory) => (
                <div key={subcategory._id} className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{subcategory.name}</h5>
                    <p className="card-text">Type: {subcategory.type}</p>
                    <img src={subcategory.image} alt={subcategory.name} style={{ maxWidth: "100px", marginBottom: "10px" }} />
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleShowSubcategoryModal(subcategory)}
                    >
                      Edit Subcategory
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No subcategories found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Custom Subcategory Edit Modal */}
      {showSubcategoryModal && (
        <div className="custom-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Edit Subcategory</h5>
              <button className="close-btn" onClick={handleCloseSubcategoryModal}>
                X
              </button>
            </div>
            <form onSubmit={handleSubcategorySubmit}>
              <div className="mb-3">
                <label htmlFor="subcategoryName" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  id="subcategoryName"
                  className="form-control"
                  value={updatedSubcategoryName}
                  onChange={(e) => setUpdatedSubcategoryName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="subcategoryType" className="form-label">
                  Type:
                </label>
                <input
                  type="text"
                  id="subcategoryType"
                  className="form-control"
                  value={updatedSubcategoryType}
                  onChange={(e) => setUpdatedSubcategoryType(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="subcategoryImage" className="form-label">
                  Subcategory Image:
                </label>
                <input
                  type="file"
                  id="subcategoryImage"
                  className="form-control"
                  onChange={handleSubcategoryImageUpload}
                />
              </div>
              {updatedSubcategoryImage && (
                <div>
                  <img
                    src={updatedSubcategoryImage.replace("http://", "https://")}
                    alt="Updated Subcategory"
                    style={{ maxWidth: "100px", marginBottom: "10px" }}
                  />
                </div>
              )}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseSubcategoryModal}>
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Subcategory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Subcategory Modal */}
      {showAddSubcategoryModal && (
        <div className="custom-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Add Subcategory</h5>
              <button className="close-btn" onClick={() => setShowAddSubcategoryModal(false)}>
                X
              </button>
            </div>
            <form onSubmit={handleAddSubcategory}>
              <div className="mb-3">
                <label htmlFor="newSubcategoryName" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  id="newSubcategoryName"
                  className="form-control"
                  value={newSubcategoryName}
                  onChange={(e) => setNewSubcategoryName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newSubcategoryType" className="form-label">
                  Type:
                </label>
                <input
                  type="text"
                  id="newSubcategoryType"
                  className="form-control"
                  value={newSubcategoryType}
                  onChange={(e) => setNewSubcategoryType(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newSubcategoryImage" className="form-label">
                  Subcategory Image:
                </label>
                <input
                  type="file"
                  id="newSubcategoryImage"
                  className="form-control"
                  onChange={handleNewSubcategoryImageUpload}
                />
              </div>
              {newSubcategoryImage && (
                <div>
                  <img
                    src={newSubcategoryImage.replace("http://", "https://")}
                    alt="New Subcategory"
                    style={{ maxWidth: "100px", marginBottom: "10px" }}
                  />
                </div>
              )}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddSubcategoryModal(false)}>
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Subcategory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategory;