import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Sanctuary", to: "/dashboard" },
  { label: "Mama Bear", to: "/mama-bear" },
];

export const MainNav: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-gradient-to-b from-purple-900/90 to-transparent shadow-lg flex items-center px-8 py-3 gap-6">
      {navItems.map(item => (
        <Link
          key={item.to}
          to={item.to}
          className={`font-semibold text-lg tracking-wide px-3 py-1 rounded transition-all duration-150 ${location.pathname === item.to ? "bg-purple-700 text-white shadow-lg" : "text-white hover:text-purple-200"}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
