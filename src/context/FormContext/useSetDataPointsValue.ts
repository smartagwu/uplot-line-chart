import { useContext, useCallback } from "react";
import { ContextState, FormContext } from "./FormContext";

const useSetDataPointsValue = () => {
  const dispatch = useContext(FormContext)[1];
  return useCallback(
    ({
      dataPoints,
      downSampleDataPoints,
    }: Pick<ContextState, "dataPoints" | "downSampleDataPoints">) => {
      dispatch({
        type: "setDataPointsValue",
        payload: {
          dataPoints,
          downSampleDataPoints,
        },
      });
    },
    [dispatch],
  );
};

export default useSetDataPointsValue;
