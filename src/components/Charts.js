import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const Charts = ({data, hourly}) => {
  const [state, setState] = useState({
    options: {
      chart: {
        width: '100%',
        toolbar: {
          show: false
        }
      },
      xaxis: {
        show: false,
        categories: hourly.map(i => {
          var day = new Date(i.dt * 1000);
          var hour = day.toLocaleString("en-us", { hour: "numeric"}); 

          return hour.split(" ")[0];
        })

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
        data: hourly.map(i => i.temp),
      },
    ],
  });

  

 useEffect(()=> {
  setState(prev => {
    return {
      options: {
        chart: {
          width: '100%',
          toolbar: {
            show: false
          }
        },
        xaxis: {
          show: false,
          categories: hourly.map(i => {
            var day = new Date(i.dt * 1000);
            var hour = day.toLocaleString("en-us", { hour: "numeric"}); 
  
            return hour.split(" ")[0];
          })
  
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
          data: hourly.map(i => i.temp),
        },
      ],
    }
    
  })
 },[hourly])





  return (

    <div className="card my-4">

      <div className=" p-3 d-flex align-items-center">
        <h1>{data.temp.max} C </h1>

        <img src = {`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt = "image" />

        </div>


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
