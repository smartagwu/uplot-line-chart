import { DATA_POINTS_THRESHOLD, MAX_DATA_POINTS } from "../../constant";
import { DownSampleDataPoints } from "../../context/FormContext/FormContext";

const getAverageSampleSize = (length: number) =>
  length > MAX_DATA_POINTS / 2 ? 4 : length > MAX_DATA_POINTS / 10 ? 3 : 2;

const downSampleDataPoints = (dataPoints: DownSampleDataPoints) => {
  if (dataPoints.length <= DATA_POINTS_THRESHOLD) {
    return dataPoints;
  }

  const _dataPoints = [];
  const averageSampleSize = getAverageSampleSize(dataPoints.length);
  for (let i = 0; i < dataPoints.length; i += averageSampleSize) {
    const set = dataPoints.slice(i, i + averageSampleSize);
    const xAvg = set.reduce((acc, [x]) => acc + (x as number), 0) / set.length;

    const pointY = set.reduce(
      (acc: number[], point) => {
        const [minY, y, maxY] = point[1] as number[];
        return [Math.min(acc[0], minY), acc[1] + y, Math.max(acc[2], maxY)];
      },
      [Number.MAX_SAFE_INTEGER, 0, Number.MIN_SAFE_INTEGER],
    );

    _dataPoints.push([xAvg, [pointY[0], pointY[1] / set.length, pointY[2]]]);
  }
  return downSampleDataPoints(_dataPoints);
};

export default downSampleDataPoints;
