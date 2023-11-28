import React from "react";
import "../components/Style/Layout.css";
import { AdminMenu, UserMenu } from "../Data/Data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";

const Layout = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const naviagte = useNavigate();
  //Rendering menu list
  const SidebarMenu = user?.isAdmin ? AdminMenu : UserMenu;
  // console.log(user);

  //Logout Handler
  const logoutHandler = async () => {
    localStorage.clear();
    message.success("Logout Successfully");
    naviagte("/login");
  };

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>DOC APP</h6>
              <hr />
            </div>
            <div className="Menu ">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    key={menu.path}
                    className={`menu-item ${isActive && "active"}`}
                  >
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
              <div className={`menu-item`} onClick={logoutHandler}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="Header">
              <div className="header-content">
                <i className="fa-solid fa-bell"></i>
                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="Body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
