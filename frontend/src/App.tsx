/**
 * Top-level layout wrapper that injects shared chrome around routed pages.
 */
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { useDarkMode } from "./hooks/useDarkMode";

const App = () => {
  const { isDarkMode } = useDarkMode();
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, search]);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
