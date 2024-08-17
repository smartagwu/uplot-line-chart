import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import FormContextProvider from "./context/FormContext/FormContext.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import Chart from "./components/Chart.tsx";
import Form from "./components/Form.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <FormContextProvider>
        <Form />
        <Chart />
      </FormContextProvider>
    </ErrorBoundary>
  </StrictMode>,
);
