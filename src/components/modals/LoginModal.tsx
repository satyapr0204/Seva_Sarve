"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const LoginModal = () => {
    const [isEmailLogin, setIsEmailLogin] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");

    const handleContinue = () => {
        if (isEmailLogin) {
            // EMAIL VALIDATION
            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!inputValue) {
                setError("Email is required");
                return;
            }

            if (!emailRegex.test(inputValue)) {
                setError("Please enter valid email");
                return;
            }
        } else {

            // PHONE VALIDATION
            const phoneRegex = /^[0-9]{10}$/;

            if (!inputValue) {

                setError("Phone number is required");
                return;

            }

            if (!phoneRegex.test(inputValue)) {

                setError(
                    "Please enter valid 10 digit phone number"
                );

                return;

            }
        }

        setError("");

        const currentModal = document.getElementById("login-screen-1");

        if (currentModal) {
            const bootstrapModal = window.bootstrap?.Modal.getInstance(currentModal);

            bootstrapModal?.hide();
        }

        const nextModal =
            document.getElementById("login-screen-2");

        if (nextModal) {

            const nextInstance =
                new window.bootstrap.Modal(nextModal);

            nextInstance.show();

        }

    }

    return (
        <div
            className="modal fade log-in-slid"
            id="login-screen-1"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="left-rgt-car-wrp">
                            <div className="left-slider-pop">
                                <div
                                    id="carouselExampleCaptions"
                                    className="carousel slide"
                                    data-bs-ride="carousel"
                                >
                                    <div className="carousel-indicators">
                                        <button
                                            type="button"
                                            data-bs-target="#carouselExampleCaptions"
                                            data-bs-slide-to="0"
                                            className="active"
                                            aria-current="true"
                                            aria-label="Slide 1"
                                        ></button>
                                        <button
                                            type="button"
                                            data-bs-target="#carouselExampleCaptions"
                                            data-bs-slide-to="1"
                                            aria-label="Slide 2"
                                        ></button>
                                        <button
                                            type="button"
                                            data-bs-target="#carouselExampleCaptions"
                                            data-bs-slide-to="2"
                                            aria-label="Slide 3"
                                        ></button>
                                    </div>
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img
                                                src="images/modal/login-1-left.svg"
                                                className="frist-img d-block w-100"
                                                alt="..."
                                            />
                                            <div className="my-text-carousel">
                                                <h5>
                                                    Reliable Home Services,<br />
                                                    Powered by <span>SevaServe</span>
                                                </h5>
                                                <p>
                                                    Get fast, trusted, and professional help for any<br />
                                                    home problem right when you need it.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="carousel-item">
                                            <img
                                                src="images/modal/login-2-left.svg"
                                                className="sec-img d-block w-100"
                                                alt="..."
                                            />
                                            <div className="my-text-carousel">
                                                <h5>Tell SevaServe the Issue, We Handle the Rest</h5>
                                                <p>
                                                    Describe your problem or upload a photo , our smart
                                                    system instantly identifies the right service.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="carousel-item">
                                            <img
                                                src="images/modal/login-3-left.svg"
                                                className="thd-img d-block w-100"
                                                alt="..."
                                            />
                                            <div className="my-text-carousel">
                                                <h5>
                                                    Clear Estimates. Easy Booking. Total Peace of Mind.
                                                </h5>
                                                <p>
                                                    SevaServe gives you upfront pricing, secure payments,
                                                    and flexible scheduling in just a few taps.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="carousel-control-prev"
                                        type="button"
                                        data-bs-target="#carouselExampleCaptions"
                                        data-bs-slide="prev"
                                    >
                                        <span
                                            className="carousel-control-prev-icon"
                                            aria-hidden="true"
                                        ></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button
                                        className="carousel-control-next"
                                        type="button"
                                        data-bs-target="#carouselExampleCaptions"
                                        data-bs-slide="next"
                                    >
                                        <span
                                            className="carousel-control-next-icon"
                                            aria-hidden="true"
                                        ></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                            <div className="right-slider-pop">
                                <h5>Let’s get you started</h5>
                                <p>
                                    {isEmailLogin ?
                                        "Enter your email to receive a verification code." :
                                        "Enter your number to receive a verification code."
                                    }
                                </p>

                                <form>
                                    <div className="phone-number">
                                        <input type="text"
                                            placeholder={isEmailLogin ? "Email Address" : "Phone Number"}
                                            value={inputValue}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                if (isEmailLogin) {

                                                    // EMAIL INPUT
                                                    setInputValue(e.target.value);

                                                } else {

                                                    // PHONE INPUT
                                                    const onlyNumbers = e.target.value.replace(/\D/g, "");

                                                    setInputValue(onlyNumbers);

                                                }
                                            }}
                                        />
                                        <img src={
                                            isEmailLogin ? "images/modal/mail-icon.svg" : "images/modal/phone-icon.svg"
                                        } alt="" />
                                    </div>

                                    {
                                        error && (
                                            <p style={{
                                                color: "red",
                                                fontSize: "14px",
                                                marginTop: "5px"
                                            }}>
                                                {error}
                                            </p>
                                        )
                                    }
                                    <button
                                        type="button"
                                        // data-bs-toggle="modal"
                                        // data-bs-target="#login-screen-2"

                                        onClick={handleContinue}
                                        className="continue-btn"
                                    >
                                        Continue
                                    </button>
                                </form>

                                <div className="divider"></div>

                                <div className="email-option" onClick={() =>{ 
                                setIsEmailLogin(!isEmailLogin);
                                setInputValue("");
                                setError("");
                                }}
                                    style={{ cursor: "pointer" }}
                                >
                                    <span className="icon">
                                        <img src={
                                            isEmailLogin ? "images/modal/phone-icon.svg" : "images/modal/mail-icon.svg"
                                        }
                                            alt="" />
                                    </span>
                                    <span>
                                        {
                                            isEmailLogin ?
                                                "Continue with phone" :
                                                "Continue with mail"
                                        }

                                    </span>
                                </div>

                                <p className="terms">
                                    By continuing, you agree to our <br />
                                    <Link href="/termcondition">Terms &</Link>
                                    {/* & */}
                                    <Link href="/privacypolicy"> Privacy Policy</Link>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal