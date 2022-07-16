import React from "react";

const Card = ({ data, select, setSelect,index }) => {
  var day = new Date(data.dt * 1000);
  const days = day.toLocaleString("en-us", { weekday: "long" }); // Friday
  const handleClick = ()=> {
    setSelect(index)
  }
  return (
    <div className="mx-3">
      <div  role="button" className= {`card text-center border shadow  mb-5  rounded ${select && "border-danger bg-light"} `}
      onClick = {handleClick}
      >
        <div className="card-body">
          <h5 className="card-title">{days}</h5>
          <p className = "text-truncate">
            {data.temp.min} C - {data.temp.max} C
          </p>

          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="image"
          />
          <p className = "text-truncate">{data.weather[0].description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
