import { DownSampleDataPoints } from "../context/FormContext/FormContext";
import downSampleDataPoints from "./internal/downSampleDataPoints";

onmessage = function (
  this: Window,
  ev: MessageEvent<{
    dataPoints: DownSampleDataPoints;
  }>,
) {
  const { dataPoints } = ev.data;
  const _dataPoints = downSampleDataPoints(
    dataPoints.map(([x, y]) => [
      x,
      Array.from({ length: 3 }, () => y),
    ]) as DownSampleDataPoints,
  );
  this.postMessage({ dataPoints, downSampleDataPoints: _dataPoints });
};
