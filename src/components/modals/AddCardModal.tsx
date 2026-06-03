"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import React from 'react'

const AddCardModal = () => {
    const router=useRouter()
    return (
        <div
            className="modal fade welcome"
            id="add-Your-Card"
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
                        <div className="welcome-seva-ser">
                            <img src="images/modal/add-to-cart.svg" className="check" alt="" />
                            <h4>Add Your Card</h4>
                            <p>
                                To complete your future bookings, please add your payment card.
                            </p>
                            <Link href="/add-new-card" onClick={()=>router.push("/add-new-card")} className="primary-cta" data-bs-dismiss="modal"
                            >Add Card
                                <img
                                    src="images/modal/right-arrow-icon.svg"
                                    className="arrow"
                                    alt=""
                                /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCardModal