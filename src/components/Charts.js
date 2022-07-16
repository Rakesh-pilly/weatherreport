import React, { useState } from "react";
import Chart from "react-apexcharts";

const Charts = () => {
  const [state, setState] = useState({
    options: {
      chart: {
        id: "apexchart-example",
        width: '100%',
        toolbar: {
          show: false
        }
      },
      xaxis: {
        categories: [12, 11, 10, 9, 8, 7, 6, 5, 4],
        show: false,

      },
      yaxis: {
        show: false
      },
    
      dataLabels: {
        enabled: false,
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

    <div className="card my-4">
    <Chart
      options={state.options}
      series={state.series}
      type="area"
    
      height={320}
    />

    </div>
  );
};

export default Charts;
