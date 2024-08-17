import { useMemo, useEffect, useState } from "react";
import Worker from "../workers/worker?worker";
import useSetCSVLoadingDone from "../context/FormContext/useSetCSVLoadingDone";
import useFieldContextValues from "../context/FormContext/useFieldContextValues";
import { DownSampleDataPoints } from "../context/FormContext/FormContext";

type WorkerMessage = {
  startIndex: number;
  endIndex: number;
  points: DownSampleDataPoints;
};

const useChartServiceWorker = ({
  points,
  startIndex,
  endIndex,
}: WorkerMessage) => {
  const { incrementOnInterval } = useFieldContextValues();
  const [dataPoints, setDataPoints] = useState<uPlot.AlignedData>([[], []]);
  const serviceWorker = useMemo(() => new Worker(), []);
  const setCSVLoadingDone = useSetCSVLoadingDone();
  const { csvLoadingInProgress } = useFieldContextValues();

  useEffect(() => {
    if (points.length > 0) {
      try {
        serviceWorker.postMessage({
          points,
          startIndex,
          endIndex,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [endIndex, points, serviceWorker, startIndex]);

  useEffect(() => {
    serviceWorker.onmessage = (
      ev: MessageEvent<{ dataPoints: uPlot.AlignedData }>,
    ) => {
      if (csvLoadingInProgress || incrementOnInterval) {
        setDataPoints(ev.data.dataPoints);
      }
      if (csvLoadingInProgress) {
        setCSVLoadingDone();
      }
    };
  }, [
    csvLoadingInProgress,
    serviceWorker,
    setCSVLoadingDone,
    incrementOnInterval,
  ]);

  return { dataPoints };
};

export default useChartServiceWorker;
