import { ContextState } from "./FormContext";
import useFieldContextValues from "./useFieldContextValues";

const useFieldContextValue = <T>(key: keyof ContextState) =>
  useFieldContextValues()[key] as T;

export default useFieldContextValue;
