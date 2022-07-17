import React, {useState} from "react";
import Select from "react-select";
import { data } from "../data";
import axios from 'axios';


const option = data.map((i) => {
  return {
    value: i.id,
    label: i.name,
  };
});



const InputBox = ({setCords, setSelectedOption, selectedOption, setSelect}) => {



  const  getCords = async  (id)=>{

    axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=bb5e47c441c052ffa125b44b2f386884`).then(
      data => {

        setCords([data.data.coord.lat,data.data.coord.lon]);
        setSelect(0)
      }
    )
  
  
  } 


  const handleChange =  (e) => {

        getCords(e.value);  
        setSelectedOption(e.value);



  };



  return (
    <div className = "py-4">
      <Select
        options={option}
        onChange={handleChange}
        placeholder={"Enter the city"}
        value={option.filter(function(optio) {
          return optio.value === selectedOption;
        })}
      />
    </div>
  );
};

export default InputBox;
