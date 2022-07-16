import React from "react";
import Select from "react-select";
import { data } from "../data";
import axios from 'axios';


const option = data.map((i) => {
  return {
    value: i.id,
    label: i.name,
  };
});








const InputBox = ({setCords}) => {

  const  getCords = async  (id)=>{

    axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=bb5e47c441c052ffa125b44b2f386884`).then(
      data => {

        setCords([data.data.coord.lat,data.data.coord.lon])
      }
    )
  
  
  } 


  const handleChange =  (e) => {

        getCords(e.value);  
      


  };



  return (
    <div className = "py-4">
      <Select
        options={option}
        onChange={handleChange}
        placeholder={"Hyderabad"}
      />
    </div>
  );
};

export default InputBox;
