import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../component/user/Header";

function UserPage() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default UserPage;
