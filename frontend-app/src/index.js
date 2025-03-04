import React from "react";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./userContext";
import { createRoot } from "react-dom/client";

// Get the root element
const container = document.getElementById("root");

// Create a root
const root = createRoot(container);

// Render the app
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
