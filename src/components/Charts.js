import React, { useState } from "react";
import Chart from "react-apexcharts";

const Charts = () => {
  const [state, setState] = useState({
    options: {
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        categories: [12, 11, 10, 9, 8, 1996, 1997, 1998, 1999],
      },
      dataLabels: {
        enabled: false
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
  });

  return (
    <Chart
      options={state.options}
      series={state.series}
      type="area"
      width={500}
      height={320}
    />
  );
};

export default Charts;
