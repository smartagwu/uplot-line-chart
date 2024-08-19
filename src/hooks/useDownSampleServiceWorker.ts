import { useMemo, useCallback, useEffect } from "react";
import { DATA_POINTS_THRESHOLD, MAX_DATA_POINTS } from "../constant";
import useSetDataPointsValue from "../context/FormContext/useSetDataPointsValue";
import Worker from "../workers/downSampleWorker?worker";
import {
  DataPoints,
  DownSampleDataPoints,
} from "../context/FormContext/FormContext";

const useDownSampleServiceWorker = () => {
  const setDataPointsValue = useSetDataPointsValue();
  const serviceWorker = useMemo(() => new Worker(), []);

  const processCSVData = useCallback(
    (data: string) => {
      const dataSeries = data.length > 0 ? data.trim().split("\n") : [];
      if (dataSeries.length > MAX_DATA_POINTS) {
        console.log("Maximum data points reached");
        return;
      }

      const dataPoints = dataSeries.map((series) =>
        series.split(",").map((point) => parseFloat(point)),
      );
      if (dataPoints.length <= DATA_POINTS_THRESHOLD) {
        setDataPointsValue({ dataPoints });
      } else {
        try {
          serviceWorker.postMessage({ dataPoints });
        } catch (error) {
          console.error(error);
        }
      }
    },
    [serviceWorker, setDataPointsValue],
  );

  useEffect(() => {
    serviceWorker.onmessage = (
      ev: MessageEvent<{
        dataPoints: DataPoints;
        downSampleDataPoints: DownSampleDataPoints;
      }>,
    ) => {
      const { dataPoints, downSampleDataPoints } = ev.data;
      setDataPointsValue({ dataPoints, downSampleDataPoints });
    };
  }, [serviceWorker, setDataPointsValue]);

  return { processCSVData };
};

export default useDownSampleServiceWorker;
