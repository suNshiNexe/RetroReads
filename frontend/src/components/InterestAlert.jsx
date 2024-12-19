import React from 'react'
import '../css/Modals/InterestAlert/interestAlert.css'

const InterestAlert = ({isOpen, onClose}) => {
    if (!isOpen) return null;

  return (
    <div className="modal-overlay-alert">
      <div className="modal-content-alert">

        <h2 className='modal-text-alert'>Interesse registrado com sucesso!</h2>
        <h3 className='modal-subText-alert'>Acesse a <a href='/my-interests' className='modal-a-alert'>página de interesses</a> para ver mais detalhes</h3>

        <div className="modal-btn-alert">
          <button onClick={onClose} className='modal-btn-ok-alert'>OK</button>
        </div>
      </div>
    </div>
  );
}

export default InterestAlert