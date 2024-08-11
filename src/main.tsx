import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import FormContextProvider from "./context/FormContext/FormContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FormContextProvider>
      <App />
    </FormContextProvider>
  </StrictMode>,
);
