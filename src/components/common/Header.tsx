"use client";

import React, { useState, useEffect } from 'react'
import SidebarMenu from '../sidebar/SidebarMenu';
import Link from "next/link";
import NotificationDropdown from './NotificationDropdown';
import SevaServeAgentPanel from './SevaServeAgentPanel';
import Cart from './Cart';

const Header = () => {

  const [loginStatus, setLoginStatus] = useState<string | null>(null);


  useEffect(() => {

    // INITIAL VALUE
    setLoginStatus(
      localStorage.getItem("isLoggedIn")
    );

    // CHECK CHANGES EVERY 300ms
    // const interval = setInterval(() => {

    //   setLoginStatus(
    //     localStorage.getItem("isLoggedIn")
    //   );
    //   // console.log("sunil_check")

    // }, 300);

    // return () => clearInterval(interval);

  }, []);


  useEffect(() => {

    const handleLoginChange = () => {

      setLoginStatus(
        localStorage.getItem("isLoggedIn")
      );

    };

    window.addEventListener(
      "loginStatusChanged",
      handleLoginChange
    );

    return () => {

      window.removeEventListener(
        "loginStatusChanged",
        handleLoginChange
      );

    };

  }, []);

  return (
    <div>
      <header className="header">
        <div className="left-section">
          <Link href="/"><img src="/images/header/logo.svg" alt="Logo" className="logo" /></Link>

          <div className="dropdown location">
            <div className="dropdown-toggle location-toggle" data-bs-toggle="modal" data-bs-target="#your-location-popup">
              <img src="/images/header/location-icon.svg" alt="location" className="loca" />
              <span>123, Street, Anywhere, 11001</span>
              <img src="/images/header/down-icon.svg" alt="down-icon" className="down-icon" />
            </div>


          </div>
        </div>
        <div className="right-section">
          <div className="search-bar" data-bs-toggle="offcanvas" data-bs-target="#agent-msg-offcanvasRight"
            aria-controls="offcanvasRight">
            <img src="/images/header/search-left-icon.svg" alt="Search" className="search-icon" />
            <input type="text" placeholder="Explain the issue you are facing?" />
          </div>

          <SevaServeAgentPanel />

          <Cart />


          <NotificationDropdown />

          <div className="icon" data-bs-target="#SevaServeWorkpopup" data-bs-toggle="modal">
            <img src="/images/header/i-icon.svg" alt="Logo" className="logo" />
          </div>

          {
            // !isLoggedIn ? (
            loginStatus !== "true" ? (

              <div className="profile login">
                <a href="#login-screen-1" data-bs-toggle="modal" className="primary-cta">Log in <img
                  src="/images/header/top-right-img.svg" alt="Profile" /></a>
              </div>

            ) : (

              <div className="profile drop">

                <button type="button" className="dropdown-toggle head-cta" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside"> <img src="images/header/user-icon.svg" alt="Profile" /></button>
                <div className="profile-dropdown dropdown-menu dropdown-menu-end">
                  <div className="top-ims-mrg">
                    <div className="top-img-pro">
                      <div className="progress-wrp">
                        {/* <circle-progress className="my-progress"
                          max={100}
                          value={60}
                          text-format="percent"
                        /> */}
                        <img src="images/inner-page/user-profile.svg" alt="" />
                      </div>
                      <div className="roger-number">
                        <p className="roger">Roger Walker</p>
                        <p className="number">+1 555 232 254</p>
                      </div>
                    </div>
                    <div>

                    </div>
                    <div className="right-img">
                      <Link href="/profile"><img src="images/inner-page/right-side-move.svg" alt="" /></Link>
                    </div>
                  </div>
                  <div className="user-profile-list">
                    <ul className="profile-list-group-wrp">
                      <li className="profile-list-group">
                        <Link href="/about">
                          <div>
                            <img src="images/inner-page/about-seva-serve.svg" alt="" />
                            <span>About SevaServe </span>
                          </div>
                          <img src="images/inner-page/right-side-move.svg" alt="" /></Link>
                      </li>

                      <li className="profile-list-group">
                        <Link href="/account-privacy"><div>
                          <img src="images/inner-page/account-eye-icon.svg" alt="" />
                          <span>Account Privacy</span>
                        </div>
                          <img src="images/inner-page/right-side-move.svg" alt="" /></Link>
                      </li>

                      <li className="profile-list-group">
                        <Link href="/help-support"><div>
                          <img src="images/inner-page/help-suuport.svg" alt="" />
                          <span>Help & Support</span>
                        </div>
                          <img src="images/inner-page/right-side-move.svg" alt="" /></Link>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
            )
          }


          <button className="menu-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#home-end-offcanvasRight"
            aria-controls="offcanvasRight">
            <span className="frist">Menu</span>
            <span className="sec"><img src="/images/header/hamburger.svg" alt="Profile" /></span>
          </button>

          <SidebarMenu />
        </div>
        <div className="icon-header">
          <i id="bar-cross" className="fa-solid fa-bars"></i>
        </div>
      </header>
    </div>
  )
}

export default Header