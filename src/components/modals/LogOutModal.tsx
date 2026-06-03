import React from 'react'

const LogOutModal = () => {
  return (
    <div
    className="modal fade welcome"
    id="logout-popup"
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
            <img src="images/modal/logout.svg" className="check" alt="" />
            <p><b>Are you sure you want to log out of your account?</b></p>
            <a href="#" data-bs-toggle="modal" className="primary-cta"
              >Yes, Logout</a
            >
            <button type="button" data-bs-toggle="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default LogOutModal