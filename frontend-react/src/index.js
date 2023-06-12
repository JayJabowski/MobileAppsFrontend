//------------------------
// AUTHOR: Jan Wittrowski
//------------------------

import React from "react";
import { createRoot } from "react-dom/client";

//Local
import App from "./App";

//Context
import { AuthProvider } from "./auth/AuthProvider";
import { StateProvider } from "./context/StateProvider";
import { ThemeProvider } from "./context/ThemeProvider";

function Init() {
  return (
        <AuthProvider>
          <ThemeProvider>
            <StateProvider>
              <App />
            </StateProvider>
          </ThemeProvider>
        </AuthProvider>

  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Init />);