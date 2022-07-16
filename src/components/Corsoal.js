import React from "react";
import Card from "./Card";

const Corsoal = ({ data, select, setSelect }) => {
  return (
    <div className="d-flex overflow-auto">
      {data.map((item, index) => {
        const selected = select === index;
        return <Card
         key={index} 
         data={item} 
         select={selected} 
         index = {index}
         setSelect = {setSelect}
         />;
      })}
    </div>
  );
};

export default Corsoal;
