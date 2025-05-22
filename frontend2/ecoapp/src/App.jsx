import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";

// Pages
import Home from "./pages/Home";

import Register from "./pages/register";
import Login from "./pages/login";
import LogActivity from "./pages/activity.log";
import Tip from "./pages/tip";
import Rewards from "./pages/reward";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/tips" element={<Tip/>} />
            <Route path="/rewards" element={<Rewards/>} />

            

            <Route path="/logactivity" element={<LogActivity/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
