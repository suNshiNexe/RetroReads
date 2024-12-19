import React from 'react'
import '../css/Modals/DeleteAlert/deleteAlert.css'

const DeleteAlert = ({isOpen, onClose, onDelete, bookTitle}) => {
    if (!isOpen) return null;

  return (
    <div className="modal-overlay-alert">
      <div className="modal-content-alert">
        
        <h2 className='modal-question-alert'>Você tem certeza que deseja excluir o livro: </h2>
        <h3 className='modal-title-alert'>"{bookTitle}"?</h3>

        <div className="modal-btn-alert">
          <button onClick={onDelete} className='modal-btn-delete-alert'>Sim, excluir</button>
          <button onClick={onClose} className='modal-btn-cancel-alert'>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAlert