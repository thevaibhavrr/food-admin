import React, { useState, useEffect } from "react";
import "../../adminCss/sidebar/adminsidebar.css";
import { Link } from "react-router-dom";
import { makeApi } from "../../api/callApi";

function Adminsidebar() {
  const [selectedItem, setSelectedItem] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu toggle state
  const [userRole, setUserRole] = useState(null); // Store user role

  const handleMenuItemClick = (itemName) => {
    setSelectedItem(itemName);
    setIsMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    // Function to detect if DevTools are open (only for non-admin users)
    const detectDevTools = () => {
      if (userRole !== "admin") {
        const widthThreshold = window.outerWidth - window.innerWidth > 200;
        if (widthThreshold) {
          localStorage.removeItem("token");
          alert("Developer tools detected! Access is restricted.");
          window.location.href = "/";
        }
      }
    };

    // Detect DevTools when the component mounts
    window.addEventListener("resize", detectDevTools);

    if (localStorage.getItem("token")) {
      const checkUserRole = async () => {
        try {
          const response = await makeApi("/api/my-profile", "GET");
          const role = response.data.user.role;
          setUserRole(role);

          // Call DevTools detection only if the user is not an admin
          if (role !== "admin") {
            detectDevTools();
          }
        } catch (error) {
          console.log(error);
        }
      };
      checkUserRole();
    } else {
      window.location.href = "/";
    }

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", detectDevTools);
    };
  }, [userRole]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <>
      <div className="main_admin_sidebar">
        <button className="hamburger-menu" onClick={toggleMobileMenu}>
          &#9776;
        </button>

        {isMenuOpen && (
          <div
            className="mobile-menu-backdrop"
            onClick={closeMobileMenu} // Close when clicking outside
          ></div>
        )}

        <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
          <button className="close-menu" onClick={closeMobileMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </button>

          <div className="menu-list">
            {userRole === "admin" && (
              <>
                <Link
                  className="Link_tag"
                  to={"/admin/allproducts"}
                  onClick={() => handleMenuItemClick("All Products")}
                >
                  <div
                    className={`menu-item ${selectedItem === "All Products" ? "selected" : ""}`}
                  >
                    Products
                  </div>
                </Link>
                <Link
                  className="Link_tag"
                  to={"/admin/all-orders"}
                  onClick={() => handleMenuItemClick("All Orders")}
                >
                  <div
                    className={`menu-item ${selectedItem === "All Orders" ? "selected" : ""}`}
                  >
                    Orders
                  </div>
                </Link>
                <Link
                  className="Link_tag"
                  to={"/admin/all-categories"}
                  onClick={() => handleMenuItemClick("Service")}
                >
                  <div
                    className={`menu-item ${selectedItem === "Service" ? "selected" : ""}`}
                  >
                    Service
                  </div>
                </Link>
                <Link
                  className="Link_tag"
                  to={"/admin/saller"}
                  onClick={() => handleMenuItemClick("Saller")}
                >
                  <div
                    className={`menu-item ${selectedItem === "Saller" ? "selected" : ""}`}
                  >
                    Saller
                  </div>
                </Link>
                <Link className="Link_tag" to={"/admin/new-user"}>
                  <div
                    className={`menu-item ${selectedItem === "New User" ? "selected" : ""}`}
                  >
                    New User
                  </div>
                </Link>
              </>
            )}
          </div>
      <button className="btn btn-danger" onClick={handleLogout}> Logout </button>
        </div>
      </div>
    </>
  );
}

export default Adminsidebar;
