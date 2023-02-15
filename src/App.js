import { Route, Routes } from "react-router";
import "./App.css";
import MainLayout from "./components/Layout/MainLayout";
import Aboutus from "./components/Pages/Aboutus";
import Contactus from "./components/Pages/Contactus";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Aboutus />} />
          <Route path="contact-us" element={<Contactus />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
