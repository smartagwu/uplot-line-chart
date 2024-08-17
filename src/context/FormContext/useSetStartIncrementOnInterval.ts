import { useCallback, useContext } from "react";
import { FormContext } from "./FormContext";

const useSetStartIncrementOnInterval = () => {
  const dispatch = useContext(FormContext)[1];
  return useCallback(
    (value: boolean) => {
      dispatch({
        type: "setStartIncrementOnInterval",
        payload: {
          value,
        },
      });
    },
    [dispatch],
  );
};

export default useSetStartIncrementOnInterval;
