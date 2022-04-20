import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NavBar from "./components/navBar/NavBar";
import Services from "./pages/services/Services";
import ViewBookings from "./pages/viewBookings/ViewBookings";
import AllBookings from "./pages/viewBookings/AllBookings";
import Footer from "./components/footer/Footer";
import OwnerHome from "./pages/ownerHome/OwnerHome";
import UserManagement from "./pages/userManagement/UserManagement";
import BookingManagement from "./pages/bookingManagement/BookingManagement";
import Contact from "./pages/contact/Contact";

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/waterservices" element={<Services />} />
        <Route path="/viewbookings" element={<ViewBookings />} />
        <Route path="/allbookings" element={<AllBookings />}></Route>
        <Route path="/owner" element={<OwnerHome />} />
        <Route path="/userManagement" element={<UserManagement />} />
        <Route path="/bookingManagement" element={<BookingManagement />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
