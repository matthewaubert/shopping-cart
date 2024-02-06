import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/HamburgerMenu.css';

function HamburgerMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleModalClick(e) {
    if (e.target.tagName === 'A') setIsOpen(false);
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
          <div className="modal-bg" data-testid="modal-bg" onClick={() => setIsOpen(false)}></div>
          <div className="modal" data-testid="modal" onClick={handleModalClick}>
            {children}
          </div>
        </>
      )}
    </>
  );
}

HamburgerMenu.propTypes = {
  children: PropTypes.element.isRequired,
};

export default HamburgerMenu;
