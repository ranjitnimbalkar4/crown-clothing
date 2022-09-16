import Home from "./routes/home/home.compoent";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.compoenent";
import Checkout from "./components/checkout/checkout.component";
import React from "react";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route> 
        <Route index path="shop/*" element={<Shop />}></Route>         
        <Route path="auth" element={<Authentication/>}></Route>
        <Route path="checkout" element={<Checkout/>}/>
      </Route>
    </Routes>
  );
}

export default App;
