import { useContext } from "react";
import { ContextState, FormContext } from "./FormContext";

const useSetFieldValue = (key: keyof ContextState) => {
  const dispatch = useContext(FormContext)[1];
  return (value: string | object) => {
    dispatch({
      type: "setFieldValue",
      payload: {
        key,
        value: typeof value === "string" ? parseInt(value) : value,
      },
    });
  };
};

export default useSetFieldValue;
