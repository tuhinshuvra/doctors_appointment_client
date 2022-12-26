import React from 'react';



const ConfirmatinModal = ({ title, message, closeModal, modalData, successAction, successButtonName }) => {
    return (
        <div>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="py-4 mb-4">{message}</p>
                    <label onClick={() => successAction(modalData)} htmlFor="confirmation-modal" className="btn btn-sm  absolute left-2 bottom-2 btn-warning">{successButtonName}</label>
                    <button onClick={closeModal} htmlFor="confirmation-modal" className="btn btn-sm btn-outline absolute right-2 bottom-2">✕</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmatinModal;