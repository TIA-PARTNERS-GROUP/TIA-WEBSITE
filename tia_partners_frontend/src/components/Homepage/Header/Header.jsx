// src/components/Header/Header.jsx
import { Navbar, MobileMenu } from "./";

const Header = () => {
  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Navbar />
        </div>
        <MobileMenu />
      </div>
    </header>
  );
};

export default Header;
