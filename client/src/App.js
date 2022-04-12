import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NavBar from "./components/navBar/NavBar";
import Services from "./pages/services/Services";
import ViewBookings from "./pages/viewBookings/ViewBookings";
import AllBookings from "./pages/viewBookings/AllBookings";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/waterservices" element={<Services />} />
        <Route path="/viewbookings" element={<ViewBookings />} />
        <Route path="/allbookings" element={<AllBookings />}></Route>
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
