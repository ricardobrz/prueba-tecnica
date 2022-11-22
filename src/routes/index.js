import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./home";
import UserDetail from "./detailUser";

const TemplateRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/user-detail/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
};

export default TemplateRoutes;
