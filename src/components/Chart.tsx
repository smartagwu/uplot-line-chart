import useDataPoints from "../hooks/useDataPoints";
import { useEffect, useMemo, useRef } from "react";
import uPlot from "uplot";

const defaultOptions = {
  title: "uPlot Chart",
  id: "uplot-chart",
  width: window.innerWidth - 100,
  height: window.innerHeight / 3,
  scales: {
    x: {
      time: false,
    },
  },
  series: [
    {
      label: "value",
    },
    {
      stroke: "purple",
      label: "average",
    },
  ],
};

const Chart = () => {
  const { dataPoints } = useDataPoints();
  const chartRef = useRef<uPlot | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const options = useMemo(
    () =>
      dataPoints.length === 2
        ? defaultOptions
        : {
            ...defaultOptions,
            series: [
              ...defaultOptions.series,
              { stroke: "#80008033", label: "min" },
              { stroke: "#80008033", label: "max" },
            ],
          },
    [dataPoints.length],
  );
  const variance = useMemo(() => {
    if (dataPoints[0].length === 0) {
      return;
    }
    const yAvg = dataPoints[1] as number[];
    const mean = yAvg.reduce((acc, y) => acc + y, 0) / yAvg.length;
    const simpleVariance =
      yAvg.reduce((acc, y) => acc + Math.pow(y - mean, 2), 0) / yAvg.length - 1;
    return simpleVariance.toFixed(3);
  }, [dataPoints]);

  useEffect(() => {
    if (dataPoints[0].length === 0) {
      return;
    }

    chartRef.current = new uPlot(
      options,
      dataPoints,
      targetRef.current as HTMLDivElement,
    );

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [dataPoints, options]);

  if (dataPoints[0].length === 0) {
    return null;
  }

  return (
    <>
      <div className="uplot-chart" ref={targetRef}></div>
      <ul>
        <li className="uplot u-value u-legend">Variance: {variance}</li>
      </ul>
    </>
  );
};

export default Chart;
