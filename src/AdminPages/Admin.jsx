// import React, { useEffect, useState } from "react"
// import { Route, Routes } from "react-router"

// import Allproduct from "../AdminComponents/product/Allproduct";
// import AdminProductDetaills from "../AdminComponents/product/adminProductDetaills";
// import UpdateProduct from "../AdminComponents/product/adminUpdateProduct";
// import Adminsidebar from "../AdminComponents/slidebar/adminsidebar";
// import AdminaddProduct from "../AdminComponents/product/adminaddProduct";
// import Getallcatogory from "../AdminComponents/catogory/getallcatogory";
// import Addcatogory from "../AdminComponents/catogory/addcatogory";
// import Editcategories from "../AdminComponents/catogory/editcategories";
// import Allorder from "../AdminComponents/Order/allorder";
// import Orderdetails from "../AdminComponents/Order/orderdetails";
// import Admindasboard from "../AdminComponents/dasboard/admindasboard";
// import OfferPage from "../AdminComponents/email/OfferTemplate";
// import GetallCoupan from "../AdminComponents/Coupan/coupanallcatogory";
// import AddCoupan from "../AdminComponents/Coupan/coupanCreate";
// import EditCoupan from "../AdminComponents/Coupan/coupanUpdate";
// import CouponDetails from "../AdminComponents/Coupan/couapndetails";
// import AllUser from "../AdminComponents/User/allUser";
// import SubscribeUser from "../AdminComponents/User/subscribeUser";
// import BannerManagement from "../AdminComponents/Offer/Banner";
// import AddBanner from "../AdminComponents/Offer/AddBanner";
// import AddEditBanner from "../AdminComponents/Offer/EditBanner";
// import AllExistOfferBanner from "../AdminComponents/Offer/existOfferBanner/Banner";
// import AddExistOfferBanner from "../AdminComponents/Offer/existOfferBanner/AddBanner";
// import EditExistOfferBanner from "../AdminComponents/Offer/existOfferBanner/EditBanner";
// import Adduser from "../AdminComponents/User/Adduser";
// import AddUserForm from "../components/auth/Adduser";
// import { makeApi } from "../api/callApi";

// function Admin() {
// 	const [userRole, setUserRole] = useState(null); // Store user role

// 	useEffect(() => {
// 		const token = localStorage.getItem("token");
// 		if (!token) {
// 			window.location.href = "/";
// 		}
// 	}, []);


// 	useEffect(() => {
// 		if (localStorage.getItem("token")) {
// 			const checkUserRole = async () => {
// 				try {
// 					const response = await makeApi("/api/my-profile", "GET");
// 					// Assuming the response contains a `user` object with the `role`
// 					setUserRole(response.data.user.role); // Set the user's role to state
// 				} catch (error) {
// 					console.log(error);
// 				}
// 			};
// 			checkUserRole();
// 		}
// 	}, []);

// 	return (
// 		<div className="main_admin_pages">
// 			{userRole === "admin" && (
// 				<div className="admin_page_sidebar_div">
// 					<Adminsidebar />
// 				</div>
// 			)}
// 			<div className="admin_page_main_div mt-3">
// 				<Routes>
// 					<Route
// 						path="/sidebar"
// 						element={<Adminsidebar />}
// 					/>
// 					{/* products */}
// 					<Route
// 						path="/allproducts"
// 						element={<Allproduct />}
// 					/>
// 					<Route
// 						path="/add-product"
// 						element={<AdminaddProduct />}
// 					/>
// 					<Route
// 						path="/product-details/:productId"
// 						element={<AdminProductDetaills />}
// 					/>
// 					<Route
// 						path="/product-update/:productId"
// 						element={<UpdateProduct />}
// 					/>

// 					{/* category */}
// 					<Route
// 						path="/all-categories"
// 						element={<Getallcatogory />}
// 					/>
// 					<Route
// 						path="/add-category"
// 						element={<Addcatogory />}
// 					/>
// 					<Route
// 						path="/category-update/:Id"
// 						element={<Editcategories />}
// 					/>

// 					{/* orders */}
// 					<Route
// 						path="/all-orders"
// 						element={<Allorder />}
// 					/>
// 					<Route
// 						path="/order/:id"
// 						element={<Orderdetails />}
// 					/>
// 					{/* coupan */}
// 					<Route path="/All-coupan" element={<GetallCoupan />} />
// 					<Route path="/add-coupan" element={<AddCoupan />} />
// 					<Route path="/update-coupan/:Id" element={<EditCoupan />} />
// 					<Route path="/coupan-details/:Id" element={<CouponDetails />} />


// 					{/*           

// {/* admin */}
// 					<Route
// 						path="/admin-dashboard"
// 						element={<Admindasboard />}
// 					/>
// 					<Route path="/saller" element={<Adduser />} />{" "}


// 					{/* email send */}
// 					<Route
// 						path="/send-email"
// 						element={<OfferPage />}
// 					/>

// 					{/* user */}
// 					<Route path="/new-user" element={<AddUserForm />} />{" "}
// 					<Route
// 						path="/all-user"
// 						element={<AllUser />}
// 					/>
// 					<Route
// 						path="/subscribe-user"
// 						element={<SubscribeUser />}
// 					/>


// 					{/* offer */}
// 					<Route path="/offer-banner" element={<BannerManagement />} />
// 					<Route path="/add-banner" element={<AddBanner />} />
// 					<Route path='/edit-banner/:bannerId' element={<AddEditBanner />} />

// 					{/* existing offer */}
// 					<Route path="/exist-offer-banner" element={<AllExistOfferBanner />} />
// 					<Route path="/add-existing-banner" element={<AddExistOfferBanner />} />
// 					<Route path='/edit-existing-banner/:bannerId' element={<EditExistOfferBanner />} />
// 				</Routes>
// 			</div>
// 		</div>
// 	)
// }

// export default Admin

import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Allproduct from "../AdminComponents/product/Allproduct";
import AdminProductDetaills from "../AdminComponents/product/adminProductDetaills";
import UpdateProduct from "../AdminComponents/product/adminUpdateProduct";
import Adminsidebar from "../AdminComponents/slidebar/adminsidebar";
import AdminaddProduct from "../AdminComponents/product/adminaddProduct";
import Getallcatogory from "../AdminComponents/catogory/getallcatogory";
import Addcatogory from "../AdminComponents/catogory/addcatogory";
import Editcategories from "../AdminComponents/catogory/editcategories";
import Allorder from "../AdminComponents/Order/allorder";
import Orderdetails from "../AdminComponents/Order/orderdetails";
import Admindasboard from "../AdminComponents/dasboard/admindasboard";
import OfferPage from "../AdminComponents/email/OfferTemplate";
import GetallCoupan from "../AdminComponents/Coupan/coupanallcatogory";
import AddCoupan from "../AdminComponents/Coupan/coupanCreate";
import EditCoupan from "../AdminComponents/Coupan/coupanUpdate";
import CouponDetails from "../AdminComponents/Coupan/couapndetails";
import AllUser from "../AdminComponents/User/allUser";
import SubscribeUser from "../AdminComponents/User/subscribeUser";
import BannerManagement from "../AdminComponents/Offer/Banner";
import AddBanner from "../AdminComponents/Offer/AddBanner";
import AddEditBanner from "../AdminComponents/Offer/EditBanner";
import AllExistOfferBanner from "../AdminComponents/Offer/existOfferBanner/Banner";
import AddExistOfferBanner from "../AdminComponents/Offer/existOfferBanner/AddBanner";
import EditExistOfferBanner from "../AdminComponents/Offer/existOfferBanner/EditBanner";
import Adduser from "../AdminComponents/User/Adduser";
import AddUserForm from "../components/auth/Adduser";
import { makeApi } from "../api/callApi";

function PrivateRoute({ children, allowedRoles }) {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/"; 
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const checkUserRole = async () => {
        try {
          const response = await makeApi("/api/my-profile", "GET");
          const role = response.data.user.role;
          setUserRole(role);
        } catch (error) {
          console.log(error);
        }
      };
      checkUserRole();
    }
  }, []);

  if (!userRole) {
    return <div>Loading...</div>; // Show loading until user role is determined
  }

  // If the user does not have the required role, clear the token and redirect
  if (!allowedRoles.includes(userRole)) {
    localStorage.removeItem("token"); // Remove token from localStorage
    return <Navigate to="/" />; // Redirect to homepage or login page
  }

  return children; // Render children if the user has the appropriate role
}

function Admin() {
  return (
    <div className="main_admin_pages">
      <div className="admin_page_sidebar_div">
        <Adminsidebar />
      </div>
      <div className="admin_page_main_div mt-3">
        <Routes>
          {/* Define routes and wrap them with PrivateRoute */}
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <Admindasboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/allproducts"
            element={
              <PrivateRoute allowedRoles={['admin',"supersaller"]}>
                <Allproduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-product"
            element={
              <PrivateRoute allowedRoles={['admin',"supersaller"]}>
                <AdminaddProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/product-details/:productId"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminProductDetaills />
              </PrivateRoute>
            }
          />
          <Route
            path="/product-update/:productId"
            element={
              <PrivateRoute allowedRoles={['admin',"supersaller","saller"]}>
                <UpdateProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/all-categories"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <Getallcatogory />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-category"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <Addcatogory />
              </PrivateRoute>
            }
          />
          <Route
            path="/category-update/:Id"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <Editcategories />
              </PrivateRoute>
            }
          />
          <Route
            path="/all-orders"
            element={
              <PrivateRoute allowedRoles={['admin',"user","delivryboy","manager"]}>
                <Allorder />
              </PrivateRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <Orderdetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/All-coupan"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <GetallCoupan />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-coupan"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AddCoupan />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-coupan/:Id"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <EditCoupan />
              </PrivateRoute>
            }
          />
          <Route
            path="/coupan-details/:Id"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <CouponDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/new-user"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AddUserForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/all-user"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AllUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/subscribe-user"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <SubscribeUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/offer-banner"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <BannerManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-banner"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AddBanner />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-banner/:bannerId"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AddEditBanner />
              </PrivateRoute>
            }
          />
          <Route
            path="/exist-offer-banner"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AllExistOfferBanner />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-existing-banner"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AddExistOfferBanner />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-existing-banner/:bannerId"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <EditExistOfferBanner />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
