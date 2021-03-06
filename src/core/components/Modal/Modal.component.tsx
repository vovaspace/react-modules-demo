import React, { FunctionComponent, ReactNode } from 'react';

export interface ModalProps {
  children: () => ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: FunctionComponent<ModalProps> = ({ children, isOpen, onClose }) => (isOpen ? (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      right: 48,
      left: 48,
      padding: 16,
      transform: 'translateY(-50%)',
      backgroundColor: 'white',
      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.2)',
    }}
  >
    {children()}
    <footer
      style={{
        paddingTop: 16,
        marginTop: 16,
        borderTop: '1px solid lightgray',
      }}
    >
      <button type="button" onClick={onClose}>Close</button>
    </footer>
  </div>
) : null);
