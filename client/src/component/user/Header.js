import React, { useContext } from "react";
import { BiUser } from "react-icons/bi";
import { BsFillPhoneFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./Header.css";
import { UserContext } from "../../context/userContext";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, updateUser } = useContext(UserContext);
  const cookies = new Cookies();
  const navigate = useNavigate();

  function logout() {
    navigate("/");
    cookies.remove("token");
    updateUser(null);
  }
  return (
    <div className="header-nav">
      <Link>
        <BsFillPhoneFill />
      </Link>
      <div className="header-nav-center">
        <Link to={"/"} className="logo">
          <img src={Logo} className="logo-img" />
        </Link>
        <nav className="">
          <Link to={"/"}>Bán chạy</Link>
          <Link to={"/cart"}>Giỏ hàng</Link>
        </nav>
      </div>
      {user ? (
        <div>
          {user.username}
          <BiLogOut className="icon icon-header>" onClick={logout} />
        </div>
      ) : (
        <Link to={"/login"}>
          <BiUser className="icon icon-header" />
        </Link>
      )}
    </div>
  );
}

export default Header;
