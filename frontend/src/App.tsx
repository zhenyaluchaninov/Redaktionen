/**
 * Top-level layout wrapper that injects shared chrome around routed pages.
 */
import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { useDarkMode } from "./hooks/useDarkMode";

const App = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
