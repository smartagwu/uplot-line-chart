import {
  DataPoints,
  DownSampleDataPoints,
} from "../context/FormContext/FormContext";

onmessage = function (
  this: Window,
  ev: MessageEvent<{
    startIndex: number;
    points: DownSampleDataPoints;
    endIndex: number;
  }>,
) {
  const { points, startIndex, endIndex } = ev.data;
  const dataPoints = points.slice(startIndex, endIndex).reduce<DataPoints>(
    (acc, dataPoint) => {
      if (typeof dataPoint[1] === "number" && !Array.isArray(dataPoint[1])) {
        return [
          [...acc[0], dataPoint[0] as number],
          [...acc[1], dataPoint[1] as number],
        ];
      }

      const xAvg = dataPoint[0] as number;
      const [minY, yAvg, maxY] = dataPoint[1] as number[];
      return [
        [...acc[0], xAvg],
        [...acc[1], yAvg],
        [...acc[2], minY],
        [...acc[3], maxY],
      ];
    },
    [[], [], [], []],
  );

  this.postMessage({ dataPoints });
};
