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
import { RequireAuth, HomeAuth } from "./components/requireAuth/RequireAuth";
import AcceptedRequests from "./pages/acceptedRequests/AcceptedRequests";
import PendingRequests from "./pages/pendingRequests/PendingRequests";
import CompletedRequests from "./pages/completedRequests/CompletedRequests";

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path="/contact" element={<Contact />} />
        {/* <Route element={<HomeAuth />}> */}
        <Route path="/" element={<Home />} />
        {/* </Route> */}
        <Route element={<RequireAuth allowed={"user"} />}>
          <Route path="/waterservices" element={<Services />} />
          <Route path="/viewbookings" element={<ViewBookings />} />
          <Route path="/allbookings" element={<AllBookings />}></Route>
        </Route>
        <Route element={<RequireAuth allowed={"serviceProvider"} />}>
          <Route path="/acceptedRequests" element={<AcceptedRequests />} />
          <Route path="/pendingRequests" element={<PendingRequests />} />
          <Route path="/completedRequests" element={<CompletedRequests />} />
        </Route>
        <Route element={<RequireAuth allowed={"manager"} />}>
          <Route path="/owner" element={<OwnerHome />} />
          <Route path="/userManagement" element={<UserManagement />} />
          <Route path="/bookingManagement" element={<BookingManagement />} />
        </Route>
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
