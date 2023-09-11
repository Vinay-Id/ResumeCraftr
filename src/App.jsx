import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ResumeCreate from "./components/ResumeCreate";
import ResumeView from "./components/ResumeView";
import ResumeDelete from "./components/ResumeDelete";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<ResumeCreate />} />
        <Route path="/edit/:id" element={<ResumeCreate />} />
        <Route path="/view/:id" element={<ResumeView />} />
        <Route path="/delete/:id" element={<ResumeDelete />} />
      </Routes>
    </Router>
  );
}

export default App;
