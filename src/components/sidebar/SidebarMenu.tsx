"use client";


import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

const SidebarMenu = () => {

  const router = useRouter()
  return (
    <div className="offcanvas offcanvas-end custom-home-right" tabIndex={-1} id="home-end-offcanvasRight"
    aria-labelledby="offcanvasRightLabel-logo">
    <div className="offcanvas-header">
      <h5 id="offcanvasRightLabel-logo">
        <img src="/images/header/logo.svg" alt="123" />
      </h5>
      <button type="button" className="btn-close my-cross" data-bs-dismiss="offcanvas" aria-label="Close">
        <img src="/images/off-canvas/cross-icon-off-canvas.svg" alt="" />
      </button>
    </div>
    <div className="offcanvas-body custom-home-list">
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/services">Services</Link></li>
        <li><Link href="/booking">My Bookings</Link></li>
        <li><Link href="/quotes">My Quotes</Link></li>
        <li><Link href="/my-payment">My Payments</Link></li>
        <li><Link href="/choose-plan">Subscription</Link></li>
        <li><Link href="/saved-address">Saved Address</Link></li>
        <li><Link href="#logout-popup" data-bs-toggle="modal">Logout</Link></li>
      </ul>
    </div>
  </div>
  )
}

export default SidebarMenu