import { useCallback, useContext } from "react";
import { ContextState, FormContext } from "./FormContext";

const useSetFieldValue = (key: keyof ContextState["formValues"]) => {
  const dispatch = useContext(FormContext)[1];
  return useCallback(
    (value: number) => {
      dispatch({
        type: "setFieldValue",
        payload: { key, value },
      });
    },
    [dispatch, key],
  );
};

export default useSetFieldValue;
