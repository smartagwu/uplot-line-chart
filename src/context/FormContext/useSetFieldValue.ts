import { useContext } from "react";
import { ContextState, FormContext } from "./FormContext";

const useSetFieldValue = (key: keyof ContextState) => {
  const dispatch = useContext(FormContext)[1];
  return (value: string) => {
    dispatch({
      type: "setFieldValue",
      payload: {
        key,
        value: key !== "dataset" ? parseInt(value) : value,
      },
    });
  };
};

export default useSetFieldValue;
