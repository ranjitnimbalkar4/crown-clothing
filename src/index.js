import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvide } from "./components/contexts/user.context";
import { CatergoriesProvider } from "./components/contexts/categories.context";
import { CartProvider } from "./components/contexts/cart.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvide>
      <CatergoriesProvider>
        <CartProvider>      
          <App />
        </CartProvider>
      </CatergoriesProvider>
    </UserProvide>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
