import uPlot from "uplot";
import UplotReact from "uplot-react";

const options = {
  title: "My Chart",
  id: "chart1",
  width: 800,
  height: 600,
  series: [
    {},
    {
      // initial toggled state (optional)
      show: true,

      spanGaps: false,

      // series style
      stroke: "red",
      width: 1,
      fill: "rgba(255, 0, 0, 0.3)",
      dash: [10, 5],
    },
  ],
};

const data: uPlot.AlignedData = [
  [...new Array(100000)].map((_, i) => i),
  [...new Array(100000)].map((_, i) => i % 1000),
];

const Chart = () => {
  return <UplotReact options={options} data={data} className="uplot-chart" />;
};

export default Chart;
