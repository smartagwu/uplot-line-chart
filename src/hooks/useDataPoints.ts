import { useState, useMemo, useEffect, useRef } from "react";
import useFieldContextValues from "../context/FormContext/useFieldContextValues";
import useIncrementOnInterval from "../context/FormContext/useIncrementOnInterval";
import useChartServiceWorker from "./useChartServiceWorker";
import { DATA_POINTS_THRESHOLD } from "../constant";

const useDataPoints = () => {
  const {
    startIndex: _startIndex,
    size,
    increment,
    interval,
    dataPoints: _dataPoints,
    downSampleDataPoints = [],
  } = useFieldContextValues();
  const intervalRef = useRef<number>();
  const incrementOnInterval = useIncrementOnInterval();
  const [incrementCount, setIncrementCount] = useState(0);
  const points =
    Math.min(size, _dataPoints.length) - _startIndex > DATA_POINTS_THRESHOLD
      ? downSampleDataPoints
      : _dataPoints;

  const isAtEndOfRange =
    points.length === 0
      ? false
      : size + incrementCount >= (points[points.length - 1][0] as number);

  const endIndex = useMemo(() => {
    if (isAtEndOfRange) {
      return points.length;
    }
    return points.findIndex((point) => {
      const pointX = point[0] as number;
      return pointX >= size + incrementCount;
    });
  }, [incrementCount, isAtEndOfRange, points, size]);

  const startIndex = useMemo(() => {
    if (isAtEndOfRange) {
      return points.findIndex((point) => {
        const pointX = point[0] as number;
        return pointX >= (points[points.length - 1][0] as number) - size;
      });
    }

    return points.findIndex((point) => {
      const pointX = point[0] as number;
      return pointX >= _startIndex + incrementCount;
    });
  }, [_startIndex, incrementCount, isAtEndOfRange, points, size]);

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
