'use client';
import React from 'react'

interface DeleteAddressModalProps {
  selectedAddress: any; // Aap apne address object ka specific type bhi de sakte hain
  onDelete: (id: number | string) => void;
  onClose: () => void;
}

// const DeleteAddressModal = ({ selectedAddress, onDelete, onClose }) => {
const DeleteAddressModal: React.FC<DeleteAddressModalProps> = ({ selectedAddress, onDelete, onClose }) => {
  const addressId = selectedAddress?.id;
  
  const confirmDelete = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (addressId) {
      onDelete(addressId);

      // Bootstrap modal ko code se close karne ke liye toggle trigger karna padta hai
      // ya phir simple close button ko click karwa sakte hain:
      const closeBtn = document.querySelector("#delete-address-popup .btn-close") as HTMLButtonElement;
      if (closeBtn) closeBtn.click();

      onClose();
    }
  };

  return (
    <>
      <div className="modal fade welcome" id="delete-address-popup" data-bs-backdrop="static" data-bs-keyboard="false"
        tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="welcome-seva-ser">
                <img src="images/saved-addresses/delete-pop.svg" className="check" alt="" />
                {/* <!-- <h4>Welcome to SevaServe!</h4> --> */}
                <p><b>Are you sure you want to delete this address?</b></p>
                {selectedAddress && (
                  <p className="small text-muted">
                    Deleting: {selectedAddress.type} ({selectedAddress.flat})
                  </p>
                )}
                <a href="#" data-bs-toggle="modal" className="primary-cta" onClick={confirmDelete}>Delete Address</a>
                <button type="button" data-bs-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteAddressModal
