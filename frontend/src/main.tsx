/**
 * Bootstraps the app with routing, React Query, and global styles.
 */
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { DarkModeProvider } from "./hooks/useDarkMode";
import { queryClient } from "./lib/react-query";
import Home from "./pages/Home/Home";
import Reports from "./pages/Reports/Reports";
import Signals from "./pages/Signals/Signals";
import Summaries from "./pages/Summaries/Summaries";
import "./styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "reports", element: <Reports /> },
      { path: "summaries", element: <Summaries /> },
      { path: "signals", element: <Signals /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <RouterProvider router={router} />
      </DarkModeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
