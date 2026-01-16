
import './index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import App from "./App";
import { AuthProvider } from './components/context/AuthContext';

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>

 
  <CookiesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CookiesProvider>
 </AuthProvider>
 );

