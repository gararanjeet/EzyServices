import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NavBar from "./components/navBar/NavBar";
import Services from "./pages/services/Services";
import ViewBookings from "./pages/viewBookings/ViewBookings";
import { AuthContextProvide } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvide>
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/waterservices" element={<Services />} />
          <Route path="/viewbookings" element={<ViewBookings />} />
        </Routes>
      </Router>
    </AuthContextProvide>
  );
}

export default App;
