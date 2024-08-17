import { useContext } from "react";
import { FormContext } from "./FormContext";

const useFieldContextValues = () => useContext(FormContext)[0];

export default useFieldContextValues;
