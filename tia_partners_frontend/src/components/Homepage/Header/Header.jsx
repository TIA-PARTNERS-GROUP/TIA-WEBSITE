// src/components/Header/Header.jsx
import { Navbar, MobileMenu } from "./";

const Header = () => {
  return (
    <header className="fixed w-full header-backdrop z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="logo">TIA</div>
          <Navbar />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
