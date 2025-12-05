import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const Header: React.FC = () => {
  const { theme, toggle } = useContext(ThemeContext);
  const loc = useLocation();

  const NavLink: React.FC<{ to: string; label: string }> = ({ to, label }) => (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium ${loc.pathname === to ? "bg-primary-500 text-white" : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
    >
      {label}
    </Link>
  );

  return (
    <header className="bg-transparent py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg glass flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6 7L18 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-lg font-semibold">Finance Tracker</div>
          </Link>
          <nav className="hidden md:flex gap-2">
            <NavLink to="/" label="Dashboard" />
            <NavLink to="/transactions" label="Transactions" />
            <NavLink to="/analytics" label="Analytics" />
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button title="Toggle theme" onClick={toggle} className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
            {theme === "dark" ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;