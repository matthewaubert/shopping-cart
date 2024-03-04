import { useState } from 'react';
import '../styles/HamburgerMenu.css';

export default function HamburgerMenu({ children }: { children: JSX.Element }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleModalClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    // if user clicks a link, close modal
    if (e.target instanceof HTMLElement && e.target.tagName === 'A')
      setIsOpen(false);
  }

  return (
    <>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>menu</title>
          <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
        </svg>
      </button>
      {isOpen && (
        <>
          <div
            className="modal-bg"
            data-testid="modal-bg"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="modal" data-testid="modal" onClick={handleModalClick}>
            {children}
          </div>
        </>
      )}
    </>
  );
}
