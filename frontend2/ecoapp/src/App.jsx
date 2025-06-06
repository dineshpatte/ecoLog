import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";

// Pages
import Home from "./pages/Home";
import Register from "./pages/register";
import Login from "./pages/login";
import LogActivity from "./pages/activity.log";
import Dashboard from "./pages/Dashboard";
import ChangePassword from "./pages/changepassword";
import UpdateAccount from "./pages/changedetails";
import About from "./pages/about";

// Optional: remove these if not meant to be separate routes
// import Tips from "./components/tip";
// import Rewards from "./components/reward";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logactivity" element={<LogActivity />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/updatedetails" element={<UpdateAccount />} />
            <Route path="/about" element={<About />} />

           
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
