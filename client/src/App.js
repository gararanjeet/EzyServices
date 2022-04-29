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
import {
  PartialUserAuth,
  RequireAuth,
  UserAuth,
} from "./components/requireAuth/RequireAuth";
import { ManagerAuth } from "./components/requireAuth/RequireAuth";
import ServiceRequest from "./pages/serviceRequest/ServiceRequest";

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/waterservices" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

        {/* for test  */}
        <Route path="/serviceRequests" element={<ServiceRequest />} />

        <Route element={<RequireAuth allowed={"user"} />}>
          <Route path="/viewbookings" element={<ViewBookings />} />
          <Route path="/allbookings" element={<AllBookings />}></Route>
        </Route>
        {/* <Route element={<RequireAuth allowed={"serviceProvider"} />}>
          <Route path="/serviceRequests" />
        </Route> */}
        <Route element={<RequireAuth allowed={"manager"} />}>
          <Route path="/ownerhome" element={<OwnerHome />} />
          <Route path="/userManagement" element={<UserManagement />} />
          <Route path="/bookingManagement" element={<BookingManagement />} />
        </Route>
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
