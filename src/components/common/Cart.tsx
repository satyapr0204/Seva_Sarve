// import React from 'react'

// const Cart = () => {
//   return (
//     <>
//     <div className="icon cart-icon" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRightCart"
//     aria-controls="offcanvasRight" style={{cursor: "pointer" }}>
//     <img src="/images/header/vector-img.svg" alt="Logo" className="logo" />
//   </div>

//   <div className="offcanvas offcanvas-end cart-unfill" tabIndex="-1" id="offcanvasRightCart"
//     aria-labelledby="offcanvasRightLabel">
//     <div className="offcanvas-header">
//       <button type="button" className="btn-close my-cross" data-bs-dismiss="offcanvas" aria-label="Close">
//         <img src="/images/off-canvas/cross-icon-off-canvas.svg" alt="" />
//       </button>
//       <h5 id="offcanvasRightLabel">Cart</h5>
//     </div>
//     <div className="offcanvas-body empaty-cart">
//       <div className="cart-emp-wrp">
//         <div className="cart-color-img">
//           <img src="/images/modal/cart-color-icon.svg" alt="" />
//         </div>
//         <p className="emt">Empty Cart</p>
//       </div>
//     </div>
//   </div>

//   </>

//   )
// }

// export default Cart



import React, { useState, useEffect } from "react";
import { cartItems } from "../../json/cart.json";
import { useRouter } from "next/navigation";
import SidebarMenu from "../sidebar/SidebarMenu";

function Cart() {
  const router = useRouter();
  const [cartData, setCartData] = useState(cartItems);
  const [loginStatus, setLoginStatus] = useState<string | null>(null);

  useEffect(() => {
    setLoginStatus(localStorage.getItem("isLoggedIn"));
  }, []);

  useEffect(() => {
    const handleLoginChange = () => {
      setLoginStatus(localStorage.getItem("isLoggedIn"));
    };

    window.addEventListener("loginStatusChanged", handleLoginChange);

    return () => {
      window.removeEventListener("loginStatusChanged", handleLoginChange);
    };
  }, []);

  const handleRemoveCartItem = (id: number) => {
    setCartData((prev:any[]) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      {loginStatus !== "true" ? (
        <>
          <div
            className="icon cart-icon"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRightCart"
            aria-controls="offcanvasRight"
            style={{ cursor: "pointer" }}
          >
            <img
              src="/images/header/vector-img.svg"
              alt="Logo"
              className="logo"
            />
          </div>

          <div
            className="offcanvas offcanvas-end cart-unfill"
            tabIndex={-1}
            id="offcanvasRightCart"
            aria-labelledby="offcanvasRightLabel"
          >
            <div className="offcanvas-header">
              <button
                type="button"
                className="btn-close my-cross"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <img
                  src="/images/off-canvas/cross-icon-off-canvas.svg"
                  alt=""
                />
              </button>
              <h5 id="offcanvasRightLabel">Cart</h5>
            </div>

            <div className="offcanvas-body empaty-cart">
              <div className="cart-emp-wrp">
                <div className="cart-color-img">
                  <img
                    src="/images/modal/cart-color-icon.svg"
                    alt=""
                  />
                </div>
                <p className="emt">Empty Cart</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="icon cart-icon"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRightCartFill"
            aria-controls="offcanvasRight"
            style={{ cursor: "pointer" }}
          >
            <img
              src="/images/header/vector-img.svg"
              alt="Logo"
              className="logo"
            />
          </div>

          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasRightCartFill"
            aria-labelledby="offcanvasRightLabel"
          >
            <div className="offcanvas-header cart-head">
              <button
                type="button"
                className="btn-close my-cross"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <img
                  src="/images/off-canvas/cross-icon-off-canvas.svg"
                  alt=""
                />
              </button>
              <h5 id="offcanvasRightLabel">My Service Cart</h5>
            </div>

            <div className="offcanvas-body cart-data">
              <div className="wrp-cart">
                {cartData?.map((item) => (
                  <div className="plumbing-wrp-cart" key={item.id}>
                    <div className="plumbing">
                      <p className="plm">
                        {item.category}
                        <img
                          src="/images/home/up-right-arrow.svg"
                          alt=""
                        />
                      </p>

                      <p className="sub-cate">
                        Sub categories Selected
                      </p>

                      <div className="service-list-type">
                        <ol className="main-category">
                          {item.visibleServices?.map(
                            (service, index) => (
                              <li
                                key={index}
                                className={index === 0 ? "bdr" : ""}
                              >
                                {service.mainCategory}
                                <ul>
                                  <li>
                                    {service.subCategory}
                                    <ul>
                                      <li>{service.service}</li>
                                    </ul>
                                  </li>
                                </ul>
                              </li>
                            )
                          )}
                        </ol>

                        {item.additionalServices?.length > 0 && (
                          <ol className="main-category">
                            <li className="more-service">
                              + {item.additionalServices.length} more service
                              <img
                                src="/images/header/down-icon.svg"
                                alt=""
                              />
                            </li>

                            <div className="service-data">
                              {item.additionalServices.map(
                                (service, index) => (
                                  <li key={index}>
                                    {service.mainCategory}
                                    <ul>
                                      <li>
                                        {service.subCategory}
                                        <ul>
                                          <li>{service.service}</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                )
                              )}
                            </div>

                            <li className="less-service">
                              Less service
                            </li>
                          </ol>
                        )}
                      </div>
                    </div>

                    <div className="service-quotes card-quotes">
                      <p className="service-cost cart-cost">
                        Estimated Cost:{" "}
                        <span>${item.estimatedCost}</span>
                      </p>

                      <div className="home-quotes-cta cart-cta">
                        <button
                          className="reject-btn"
                          onClick={() =>
                            handleRemoveCartItem(item.id)
                          }
                        >
                          <img
                            src="/images/off-canvas/remove-cart.svg"
                            alt=""
                          />
                          Remove
                        </button>

                        <button
                          className="primary-cta rgt"
                          onClick={() => router.push("/quotes")}
                        >
                          Request
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Cart;