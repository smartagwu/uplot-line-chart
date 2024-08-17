import { useMemo, useEffect, useState } from "react";
import Worker from "../workers/worker?worker";
import useIncrementOnInterval from "../context/FormContext/useIncrementOnInterval";
import useSetCSVLoadingDone from "../context/FormContext/useSetCSVLoadingDone";
import useCSVLoadingInProgress from "../context/FormContext/useCSVLoadingInProgress";

type WorkerMessage = {
  startIndex: number;
  endIndex: number;
  points: (number | number[])[][];
};

const useChartServiceWorker = ({
  points,
  startIndex,
  endIndex,
}: WorkerMessage) => {
  const incrementOnInterval = useIncrementOnInterval();
  const [dataPoints, setDataPoints] = useState<uPlot.AlignedData>([[], []]);
  const serviceWorker = useMemo(() => new Worker(), []);
  const setCSVLoadingDone = useSetCSVLoadingDone();
  const csvLoadingInProgress = useCSVLoadingInProgress();

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
