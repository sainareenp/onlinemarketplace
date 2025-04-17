import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div className="modal-overlay" onClick={onClose}>
			<div
				className="modal-content"
				onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
			>
				<button className="modal-close" onClick={onClose}>
					&times;
				</button>
				{children}
			</div>
			<style jsx>{`
				.modal-overlay {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: rgba(0, 0, 0, 0.5);
					display: flex;
					justify-content: center;
					align-items: center;
					z-index: 1000;
				}
				.modal-content {
					background: background;
					padding: 20px;
					border-radius: 8px;
					max-width: 500px;
					width: 100%;
					position: relative;
				}
				.modal-close {
					position: absolute;
					top: 10px;
					right: 10px;
					background: none;
					border: none;
					font-size: 1.5rem;
					cursor: pointer;
				}
			`}</style>
		</div>,
		document.body
	);
};

export default Modal;