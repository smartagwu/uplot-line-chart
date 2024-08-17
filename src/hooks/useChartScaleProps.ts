import { useMemo } from "react";
import { DATA_POINTS_THRESHOLD } from "../constant";
import useFieldContextValues from "../context/FormContext/useFieldContextValues";
import useFormValues from "../context/FormContext/useFormValues";

const useChartScaleProps = (incrementCount: number) => {
  const { start, size } = useFormValues();
  const { dataPoints, downSampleDataPoints = [] } = useFieldContextValues();
  const points =
    Math.min(size, dataPoints.length) - start > DATA_POINTS_THRESHOLD
      ? downSampleDataPoints
      : dataPoints;

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
      return pointX >= start + incrementCount;
    });
  }, [start, incrementCount, isAtEndOfRange, points, size]);

  return { points, startIndex, endIndex, isAtEndOfRange };
};

export default useChartScaleProps;
