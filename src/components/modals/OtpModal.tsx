"use client";

import React, { useState } from 'react'

const OtpModal = () => {

    const [otp, setOtp] = useState(["", "", "", "", ""]);
    const [error, setError] = useState("");

    const handleChange = (
        value: string,
        index: number
    ) => {
        // ONLY NUMBERS
        const numericValue = value.replace(/\D/g, "");

        const updatedOtp = [...otp];

        updatedOtp[index] = numericValue;

        setOtp(updatedOtp);

        // AUTO FOCUS NEXT INPUT
        // if (numericValue && index < 4) {

        //     const nextInput = document.getElementById(
        //         `otp-${index + 1}`
        //     );

        //     nextInput?.focus();

        // }


    }


    const handleVerify = () => {

        const finalOtp = otp.join("");

        // CHECK ALL 5 FILLED
        if (finalOtp.length !== 5) {

            setError("Please enter complete OTP");

            return;

        }

        setError("");

        console.log("OTP:", finalOtp);

        const currentModal = document.getElementById("login-screen-2");

        if (currentModal) {
            const currentInstance = window.bootstrap?.Modal.getInstance(currentModal);

            currentInstance?.hide();
        }

        const nextModal = document.getElementById("welcome-SevaServeModal");

        if (nextModal) {
            const nextInstance = new window.bootstrap.Modal(nextModal);

            nextInstance.show();
        }

    };

    return (
        <div
            className="modal fade log-in-slid"
            id="login-screen-2"
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
                                <h5>Verify Your Number</h5>
                                <p>
                                    Enter the 5-digit code we sent to <br />
                                    +1 ******1234
                                </p>
                                <form>
                                    <div className="input-multigrp">
                                        {
                                            otp?.map((digit, index) => (
                                                <input
                                                    key={index}
                                                    id={`otp-${index}`}
                                                    type="text"
                                                    placeholder='-'
                                                    className='input-field-code-in inputs'
                                                    maxLength={1}
                                                    value={digit}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                        handleChange(e.target.value, index)
                                                    }
                                                />
                                            ))
                                        }
                                        {/* <input
                                            type="text"
                                            placeholder="-"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                                                                        e.currentTarget.value =
                                                                        e.currentTarget.value.replace(/[^0-9]/g, "");
                                                                    }}
                                                                    onKeyPress={(e) => {
                                                                        if (
                                                                        (e.target as HTMLInputElement).value.length === 1
                                                                        ) {
                                                                        e.preventDefault();
                                                                        }
                                                                    }}
                                            className="input-field-code-in inputs"
                                            maxLength={1}

                                            onkeyPress="if (this.value.length == 1) return false;"
                                        /> */}
                                        {/* <input

                                            
                                        />
                                        <input 
                                            type="text"
                                            placeholder="-"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                                                    e.currentTarget.value =
                                                    e.currentTarget.value.replace(/[^0-9]/g, "");
                                                }}
                                                onKeyPress={(e) => {
                                                    if (
                                                    (e.target as HTMLInputElement).value.length === 1
                                                    ) {
                                                    e.preventDefault();
                                                    }
                                                }}
                                            className="input-field-code-in inputs"
                                            maxLength={1}
                                            
                                        />
                                        <input
                                            type="text"
                                            placeholder="-"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                             onInput={(e: React.FormEvent<HTMLInputElement>) => {
                                                    e.currentTarget.value =
                                                    e.currentTarget.value.replace(/[^0-9]/g, "");
                                                }}
                                                onKeyPress={(e) => {
                                                    if (
                                                    (e.target as HTMLInputElement).value.length === 1
                                                    ) {
                                                    e.preventDefault();
                                                    }
                                                }}
                                            className="input-field-code-in inputs"
                                            maxLength={1}
                                            
                                        />
                                        <input
                                            type="text"
                                            placeholder="-"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                             onInput={(e: React.FormEvent<HTMLInputElement>) => {
                                                e.currentTarget.value =
                                                e.currentTarget.value.replace(/[^0-9]/g, "");
                                            }}
                                            onKeyPress={(e) => {
                                                if (
                                                (e.target as HTMLInputElement).value.length === 1
                                                ) {
                                                e.preventDefault();
                                                }
                                            }}
                                            className="input-field-code-in inputs"
                                            maxLength={1}
                                            // onkeyPress="if (this.value.length == 1) return false;"
                                        />
                                        <input
                                            type="text"
                                            placeholder="-"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                             onInput={(e: React.FormEvent<HTMLInputElement>) => {
                                                    e.currentTarget.value =
                                                    e.currentTarget.value.replace(/[^0-9]/g, "");
                                                }}
                                                onKeyPress={(e) => {
                                                    if (
                                                    (e.target as HTMLInputElement).value.length === 1
                                                    ) {
                                                    e.preventDefault();
                                                    }
                                                }}
                                            className="input-field-code-in inputs"
                                            maxLength={1}

                                            onkeyPress="if (this.value.length == 1) return false;"
                                        /> */}
                                            {/* // onkeyPress="if (this.value.length == 1) return false;" */}
                                        {/* /> */}
                                    </div>

                                    {
                                        error && (
                                            <p style={{ color: "red", marginTop: "10px" }}>
                                                {error}
                                            </p>
                                        )
                                    }

                                    <button
                                        type="button"
                                        // data-bs-toggle="modal"
                                        // data-bs-target="#welcome-SevaServeModal"

                                        onClick={handleVerify}
                                        className="vry-fy-btn"
                                    >
                                        Verify & Continue
                                    </button>
                                </form>

                                <p className="terms">
                                    Didn’t get it? <span className="one">Resend</span> in
                                    <a href="#">00:30</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtpModal