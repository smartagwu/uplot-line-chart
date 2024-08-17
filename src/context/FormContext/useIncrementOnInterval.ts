import { useContext } from "react";
import { FormContext } from "./FormContext";

const useIncrementOnInterval = () =>
  useContext(FormContext)[0]["incrementOnInterval"];

export default useIncrementOnInterval;
