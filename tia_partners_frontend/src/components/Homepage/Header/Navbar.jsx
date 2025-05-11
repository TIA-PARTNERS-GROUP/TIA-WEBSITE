// src/components/Header/Navbar.jsx
const Navbar = () => {
  const navItems = [
    { name: "Home", href: "#" },
    { name: "Videotools", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Next Books", href: "#" },
    { name: "Our Partners", href: "#" },
    { name: "Membership", href: "#" },
    { name: "News", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  return (
    <nav className="hidden lg:flex items-center space-x-8">
      {navItems.map((item) => (
        <a key={item.name} href={item.href} className="nav-link">
          {item.name}
        </a>
    ))}
  </nav>  
  );
};

export default Navbar;
