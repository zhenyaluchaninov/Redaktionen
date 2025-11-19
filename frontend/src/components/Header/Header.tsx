/**
 * Sticky top navigation that mirrors the prototype header.
 */
import { NavLink, Link } from "react-router-dom";
import { useDarkMode } from "../../hooks/useDarkMode";

const navItems = [
  { label: "Reports", path: "/reports" },
  { label: "Summaries", path: "/summaries" },
  { label: "Signals", path: "/signals" },
];

export const Header = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header
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

          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6 text-sm">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative pb-1 transition-colors ${
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
                          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                          style={{
                            background:
                              "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)",
                          }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className={`text-sm ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                className="text-white text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                style={{
                  background:
                    "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)",
                }}
              >
                Subscribe
              </button>
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
