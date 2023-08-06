import React from "react";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "../../component/HeaderAdmin";

function AdminPage() {
  return (
    <div>
      <HeaderAdmin />
      <Outlet />
    </div>
  );
}

export default AdminPage;
