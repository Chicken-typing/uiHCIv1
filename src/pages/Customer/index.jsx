import { Layout } from "antd";
import React from "react";
import ListNavigation from "../../containers/ListNavigation";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import { Outlet, Route, useNavigate } from "react-router-dom";
import ListNavigations from "../../containers/ListNavigations";

function Customer() {
  const navigate = useNavigate();
  return (
    <div>
      {/* <Header /> */}

      <ListNavigations />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Customer;
