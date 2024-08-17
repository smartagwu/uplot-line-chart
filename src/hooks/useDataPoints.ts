import { useState, useEffect, useRef } from "react";
import useFieldContextValues from "../context/FormContext/useFieldContextValues";
import useChartServiceWorker from "./useChartServiceWorker";
import useFormValues from "../context/FormContext/useFormValues";
import useChartScaleProps from "./useChartScaleProps";

const useDataPoints = () => {
  const intervalRef = useRef<number>();
  const { increment, interval } = useFormValues();
  const { incrementOnInterval } = useFieldContextValues();
  const [incrementCount, setIncrementCount] = useState(0);
  const { points, startIndex, endIndex, isAtEndOfRange } =
    useChartScaleProps(incrementCount);

  const { dataPoints } = useChartServiceWorker({
    points,
    startIndex,
    endIndex,
  });

  useEffect(() => {
    clearInterval(intervalRef.current);
    if (incrementOnInterval) {
      intervalRef.current = setInterval(() => {
        setIncrementCount((count) => count + increment);
      }, interval);
    }
  }, [increment, interval, isAtEndOfRange, incrementOnInterval]);

  return { dataPoints };
};

export default useDataPoints;
