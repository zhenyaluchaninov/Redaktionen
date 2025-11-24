/**
 * Sticky top navigation that mirrors the prototype header.
 */
import { Fragment, useLayoutEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useDarkMode } from "../../hooks/useDarkMode";

const primaryNavItems = [
  { label: "Signals", path: "/signals" },
  { label: "Summaries", path: "/summaries" },
  { label: "Reports", path: "/reports" },
];

export const Header = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const headerRef = useRef<HTMLElement | null>(null);
  const separatorColor = isDarkMode ? "bg-gray-600" : "bg-gray-300";
  const arrowColor = isDarkMode ? "text-gray-500" : "text-gray-300";
  const underlineStyle = {
    background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)",
    bottom: "0.35rem",
  };

  useLayoutEffect(() => {
    const updateHeaderHeight = () => {
      if (!headerRef.current) return;
      const { height } = headerRef.current.getBoundingClientRect();
      document.documentElement.style.setProperty(
        "--header-height",
        `${height}px`
      );
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`${
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      } border-b sticky top-0 z-10`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)",
              }}
            >
              <span className="text-white text-sm font-bold">R</span>
            </div>
            <span
              className={`text-xl font-semibold tracking-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Redaktionen
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                isDarkMode
                  ? "bg-gray-800 text-gray-400"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              beta
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-3 text-sm">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative inline-flex h-9 items-center transition-colors ${
                    isActive
                      ? isDarkMode
                        ? "text-white font-medium"
                        : "text-gray-900 font-medium"
                      : isDarkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Home
                    {isActive && (
                      <span
                        className="absolute left-0 right-0 h-0.5 rounded-full"
                        style={underlineStyle}
                      />
                    )}
                  </>
                )}
              </NavLink>
              <span
                aria-hidden="true"
                className={`h-1 w-1 rounded-full ${separatorColor}`}
              />
              {primaryNavItems.map((item, index) => (
                <Fragment key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `relative inline-flex h-9 items-center transition-colors ${
                        isActive
                          ? isDarkMode
                            ? "text-white font-medium"
                            : "text-gray-900 font-medium"
                          : isDarkMode
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-500 hover:text-gray-900"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && (
                          <span
                            className="absolute left-0 right-0 h-0.5 rounded-full"
                            style={underlineStyle}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                  {index < primaryNavItems.length - 1 && (
                    <ChevronRightIcon
                      className={`w-4 h-4 ${arrowColor}`}
                      aria-hidden="true"
                    />
                  )}
                </Fragment>
              ))}
            </nav>
            <span
              aria-hidden="true"
              className={`h-1 w-1 rounded-full ${separatorColor}`}
            />
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {isDarkMode ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
