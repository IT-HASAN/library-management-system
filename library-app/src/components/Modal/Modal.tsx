import type { JSX } from 'react';
import './Modal.css';

interface ModalProps {
  toggleModal():void;
  content: JSX.Element
}

export const Modal:React.FC<ModalProps> = ({toggleModal, content}) => {
  return (
    <div className="modal-bg">
      <div className="modal">
        <span className="modal-exit" onClick={toggleModal}>x</span>
        {content}
      </div>
    </div>
  )
}