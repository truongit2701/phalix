import React from "react";
import { Route, Routes } from "react-router-dom";
import Product from "./Product";
import UserPage from "./UserPage";
import ProductDetailPage from "./ProductDetailPage";
import LoginForm from "../../component/LoginForm";
import Cart from "./Cart";

function UserIndex() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<UserPage />}>
          <Route index element={<Product />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </div>
  );
}

export default UserIndex;
