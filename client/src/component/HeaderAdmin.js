import React from "react";
import { Link } from "react-router-dom";
import "./HeaderAdmin.css";
import { BiUser } from "react-icons/bi";

function HeaderAdmin() {
  return (
    <header className="">
      <Link to={"/admin"} className="logo">
        Admin
      </Link>
      <nav className="">
        <Link to={"/admin"}>Product</Link>
        <Link to={"/admin/material"}>Material</Link>
        <Link to={"/admin/category"}>Category</Link>
        <Link to={"/admin/size"}>Size</Link>
        <Link to={"/admin/order"}>Order</Link>
      </nav>
      <Link>
        <BiUser className="icon" />
      </Link>
    </header>
  );
}

export default HeaderAdmin;
