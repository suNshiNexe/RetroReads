import React from 'react';
import '../css/Modals/InterestAlert/interestAlert.css';

const InterestErrorAlert = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay-alert">
      <div className="modal-content-alert">

        <h2 className='modal-text-alert'>Você já se interessou por este livro!</h2>
        <h3 className='modal-subText-alert'>
          Acesse a <a href='/my-interests' className='modal-a-alert'>página de interesses</a> para mais detalhes
        </h3>

        <div className="modal-btn-alert">
          <button onClick={onClose} className='modal-btn-ok-alert'>OK</button>
        </div>
      </div>
    </div>
  );
}

export default InterestErrorAlert;
