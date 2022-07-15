import React from "react";

const Card = ({ data }) => {
  console.log(data);

  var day = new Date(data.dt * 1000);

  const days = day.toLocaleString("en-us", { weekday: "long" }); // Friday

  return (
    <div class="card bg-white">
      <div class="card-body">
      <h5 class="card-title">{days}</h5>
      <p>Temp  {data.temp.min} C - {data.temp.max} C</p>

        <img src = {`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt = "image"/>
      <p>{data.weather[0].description}</p>

      </div>
    </div>
  );
};

export default Card;
