import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./AdminPage";
import Category from "./Category";
import Material from "./Material";
import Order from "./Order";
import ProductPage from "./ProductAdmin";
import Size from "./Size";

function AdminIndex() {
  return (
    <div className="">
      <Routes>
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<ProductPage />} />
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/order" element={<Order />} />
          <Route path="/admin/material" element={<Material />} />
          <Route path="/admin/size" element={<Size />} />
        </Route>
      </Routes>
    </div>
  );
}

export default AdminIndex;
