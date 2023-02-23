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
          <Route index element={<Aboutus />} />
          <Route path="contact-us" element={<Contactus />} />
          <Route path="auth" element={<Auth />} />
          <Route path="/" element={<AuthenticatedRoute />}>
            <Route path="profile" element={<UserProfile />} />
            <Route path="me/update" element={<UpdateProfile />} />
            <Route path="password/update" element={<UpdatePassword />} />

            <Route path="/authorized" element={<AuthorizedRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="brand" element={<AddNewBrand />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
