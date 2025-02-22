import React, { useState } from "react";
import { makeApi } from "../../api/callApi";
import { Link } from "react-router-dom";
import uploadToCloudinary from "../../utils/cloudinaryUpload";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);
  const [thumbnail, setThumbnail] = useState("");
  const [closed, setClosed] = useState("false");
  const [type , setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await makeApi("/api/add-category", "POST", {
        name: name,
        image: thumbnail,
        closed: closed,
        type : type
      });
      alert("Category added successfully");
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error adding category:", error);
      setErrorMessage("Error adding category. Please try again.");
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

  return (
    <>
      <div className="container my-5">
        <Link to={"/admin/all-categories"} className="btn btn-outline-primary mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="36"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </Link>

        <div className="card p-4">
          <h3 className="text-center">Add Category</h3>
          {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Category Name:</label>
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
              <label htmlFor="file" className="form-label">Category Image:</label>
              <input
                type="file"
                name="file"
                id="file"
                className="form-control"
                onChange={handleThumbnailUpload}
              />
            </div>

           <div className="mb-3">
            <label htmlFor="setType" className="form-label">setType:</label>
            <input
              type="text"
              id="setType"
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
            </div>

            {thumbnail && (
              <div className="mb-3 text-center">
                <img src={thumbnail.replace('http://', 'https://')} alt="Thumbnail Preview" style={{ maxWidth: "150px" }} />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-success w-100"
            >
              Add Category
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
