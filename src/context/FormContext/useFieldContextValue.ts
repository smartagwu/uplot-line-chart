import { useContext } from "react";
import { ContextState, FormContext } from "./FormContext";

const useFieldContextValue = <T>(key: keyof ContextState) =>
  useContext(FormContext)[0][key] as T;

export default useFieldContextValue;
