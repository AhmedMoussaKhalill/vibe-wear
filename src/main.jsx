import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import { ModeThemeProvider } from "./components/theme-provider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ModeThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </ModeThemeProvider>
  </BrowserRouter>,
);
