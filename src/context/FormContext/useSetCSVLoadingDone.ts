import { useCallback, useContext } from "react";
import { FormContext } from "./FormContext";

const useSetCSVLoadingDone = () => {
  const dispatch = useContext(FormContext)[1];
  return useCallback(() => {
    dispatch({
      type: "setCSVLoadingDone",
    });
  }, [dispatch]);
};

export default useSetCSVLoadingDone;
