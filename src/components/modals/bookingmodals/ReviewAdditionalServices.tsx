import React from 'react'

const ReviewAdditionalServices = () => {
  return (
    <>
     <div className="modal fade welcome" id="reviewAdditional" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="welcome-seva-ser">
                  <img src="images/modal/review-check.svg" className="check" alt=""/>
                  <h4>Review Additional Services</h4>
                  <p>The contractor has requested additional services for this job.</p>
                  <p> Please review the details and quotation carefully before making a decision.</p>
                  <a href="#add-Your-Card" data-bs-toggle="modal" className="primary-cta requ-suc same">Go to My Quotes</a>
                </div>
              </div>
              
            </div>
          </div>
        </div>
    </>
  )
}

export default ReviewAdditionalServices
