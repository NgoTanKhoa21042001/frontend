import { Route, Routes } from "react-router";
import "./App.css";
import Auth from "./components/Auth/Auth";
import MainLayout from "./components/Layout/MainLayout";
import Aboutus from "./components/Pages/Aboutus";
import Contactus from "./components/Pages/Contactus";
import UserProfile from "./components/Auth/UserProfile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute";
import AuthorizedRoute from "./components/Routes/AuthorizedRoute";
import UpdatePassword from "./components/Auth/UpdatePassword";
import UpdateProfile from "./components/Auth/UpdateProfile";
import Dashboard from "./components/Authorized/Dashboard/Dashboard";
import AddNewBrand from "./components/Authorized/Brand/AddNewBrand";
import BrandList from "./components/Authorized/Brand/BrandList";
import UpdateBrand from "./components/Authorized/Brand/UpdateBrand";
import AddNewCategory from "./components/Authorized/Category/AddNewCategory";
import CategoryList from "./components/Authorized/Category/CategoryList";
import UpdateCategory from "./components/Authorized/Category/UpdateCategory";
import AddNewStore from "./components/Authorized/Store/AddNewStore";
import StoreList from "./components/Authorized/Store/StoreList";
import UpdateStore from "./components/Authorized/Store/UpdateStore";
import ProductList from "./components/Authorized/Product/ProductList";
import AddNewProduct from "./components/Authorized/Product/AddNewProduct";
import UpdateProduct from "./components/Authorized/Product/UpdateProduct";
import Products from "./components/Product/Products";
import ProductDetails from "./components/Product/ProductDetails";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <div className="App">
      {/* toasity  */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* Same as */}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* <Route index element={<Home />} />   */}
          <Route path="product" element={<Products />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="about-us" element={<Aboutus />} />
          <Route path="contact-us" element={<Contactus />} />
          <Route path="auth" element={<Auth />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/" element={<AuthenticatedRoute />}>
            <Route path="profile" element={<UserProfile />} />
            <Route path="me/update" element={<UpdateProfile />} />
            <Route path="password/update" element={<UpdatePassword />} />

            <Route path="/authorized" element={<AuthorizedRoute />}>
              <Route path="dashboard" element={<Dashboard />} />

              <Route path="brand" element={<AddNewBrand />} />
              <Route path="brandlist" element={<BrandList />} />
              <Route path="brand/:id" element={<UpdateBrand />} />

              <Route path="category" element={<AddNewCategory />} />
              <Route path="categorylist" element={<CategoryList />} />
              <Route path="category/:id" element={<UpdateCategory />} />

              <Route path="store" element={<AddNewStore />} />
              <Route path="storelist" element={<StoreList />} />
              <Route path="store/:id" element={<UpdateStore />} />

              <Route path="product" element={<AddNewProduct />} />
              <Route path="productlist" element={<ProductList />} />
              <Route path="product/:id" element={<UpdateProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
