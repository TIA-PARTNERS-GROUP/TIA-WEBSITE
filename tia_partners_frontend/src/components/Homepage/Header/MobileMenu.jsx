// src/components/Header/MobileMenu.jsx
const MobileMenu = ({ isOpen }) => (
  <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
  </div>
);

export default MobileMenu;
