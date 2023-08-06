import React from "react";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default MainPage;
