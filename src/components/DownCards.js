import Chart from "react-apexcharts";
import React, { useState } from "react";

function DownCards({ dataDowncard }) {
  const sunrise = new Date(dataDowncard.sunrise * 1000);
  const sunset = new Date(dataDowncard.sunset * 1000);
  const sunriseTime = sunrise.toLocaleString("en-us", {
    hour: "numeric",
    minute: "numeric",
  });
  const sunsetTime = sunset.toLocaleString("en-us", {
    hour: "numeric",
    minute: "numeric",
  });

  const [state, setState] = useState({
    options: {
      chart: {
        id: "apexchart-example",
        width: "100%",
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: false,
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 25
        },  
      },
      colors: ["#f48037"],
      xaxis: {
        categories: [ "5am", "2am", "7pm",],
        show: false,
      },
      yaxis: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
    },
    series: [
      {
        name: "series-1",
        data: [ 0, 10,0 ],
      },
    ],
  });




  return (
    <div className="container-fluid ">
      <div className="row g-5">
        <div className="col-6 ">
          <div className="box p-4 rounded">
            <h5> Pressure</h5>

            <h6> {dataDowncard.pressure} hpa</h6>
          </div>
        </div>

        <div className="col-6 ">
          <div className="box p-4 rounded">
            <h5>Humidity </h5>
            <h6> {dataDowncard.humidity} %</h6>
          </div>
        </div>

        <div className="col-6 ">
          <div className="box p-4 rounded">
            <h5> Sunrise</h5>

            <h6> {sunriseTime}</h6>
          </div>
        </div>

        <div className="col-6 ">
          <div className="box p-4 rounded">
            <h5>Sunset </h5>
            <h6> {sunsetTime}</h6>
          </div>
        </div>
      </div>

      <div className="card my-3">
        <Chart
          options={state.options}
          series={state.series}
          type="area"
          height={220}
        />
      </div>
    </div>
  );
}

export default DownCards;
