import { useCallback, useContext } from "react";
import { ContextState, FormContext } from "./FormContext";

const useSetFieldValue = (key: keyof ContextState) => {
  const dispatch = useContext(FormContext)[1];
  return useCallback(
    (value: string) => {
      dispatch({
        type: "setFieldValue",
        payload: {
          key,
          value: parseFloat(value),
        },
      });
    },
    [dispatch, key],
  );
};

export default useSetFieldValue;
