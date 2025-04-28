import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // This toggles the hamburger menu open/close
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getLinkClass = (path) =>
    router.pathname === path ? "active-link" : "";

  return (
    <nav>
      <div className="left-container">
        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>

        {/* Logo */}
        <Link href="/">
          <Image src="/Logo.webp" alt="ZapZapGo Logo" width={90} height={75} />
        </Link>
      </div>

      {/* Main Nav Links */}
      <ul className="main-nav">
        <li>
          <Link href="/" className={getLinkClass("/")}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className={getLinkClass("/about")}>
            About
          </Link>
        </li>
        <li>
          <Link href="/dashboard" className={getLinkClass("/dashboard")}>
            Dashboard
          </Link>
        </li>
      </ul>

      {/* Hamburger Dropdown */}
      {isOpen && (
        <div className="hamburger-menu">
          <Link href="/" className={getLinkClass("/")} onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/login" className={getLinkClass("/login")} onClick={() => setIsOpen(false)}>
            Login / Signup
          </Link>
          <Link href="/about" className={getLinkClass("/about")} onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link href="/dashboard" className={getLinkClass("/dashboard")} onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
          <Link href="/pricing" className={getLinkClass("pricing")} onClick={() => setIsOpen(false)}>
            Pricing
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
