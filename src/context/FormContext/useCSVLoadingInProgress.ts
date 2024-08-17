import { useContext } from "react";
import { FormContext } from "./FormContext";

const useCSVLoadingInProgress = () =>
  useContext(FormContext)[0]["csvLoadingInProgress"];

export default useCSVLoadingInProgress;
