import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./Landing-page/home/HomePage";
import AboutPage from "./Landing-page/about/AboutPage";
import Signup from "./Landing-page/signup/Signup";
import PricingPage from "./Landing-page/pricing/PricingPage";
import SupportPage from "./Landing-page/support/SupportPage";
import ProductsPage from "./Landing-page/products/ProductsPage";
import Navbar from "./Landing-page/Navbar";
import Footer from "./Landing-page/Footer";
import NotFound from "./Landing-page/NotFound";
import Login from "./Landing-page/Login";

const App = () => {
  return (
    <div>

  
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login/>} />
      <Route path="/support" element={<SupportPage />} />
       <Route path="*" element={<NotFound />} />
    </Routes> 
    <Footer/>
     </div>
  );
};

export default App;
