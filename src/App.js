import { useEffect, useState } from "react";
import "./App.css";
import InputBox from "./components/InputBox";
import axios from "axios";
import Corsoal from "./components/Corsoal";
import Chart from "./components/Charts";
import DownCards from "./components/DownCards";
import { DominoSpinner   } from "react-spinners-kit";

function App() {
  const [data, setData] = useState([]);
  const [currrent, setCurrent] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [cords, setCords] = useState([17.3753, 78.4744]);
  const [select, setSelect] = useState(0);
  const [loading , setLoading] = useState(true);
  const getCustomersData = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${cords[0]}&lon=${cords[1]}&exclude=minutely&appid=bb5e47c441c052ffa125b44b2f386884&units=metric`
      )
      .then((data) => {
        setData(data.data.daily);
        setCurrent(data.data.current);
        setHourly(data.data.hourly);
        setLoading(false);
      })
      .catch((error) =>
      
      {
        setLoading(false)
        console.log(error) });
  };

  useEffect(() => {
    getCustomersData();
  }, [cords]);

  if(loading){

    return (
      <div className = "vh-100 d-flex align-items-center justify-content-center">
        <DominoSpinner    size={200} color="#686769" />

        </div>
    )
  }

  return (
    <div className="container-sm">

      
      <InputBox setCords={setCords} />
      <Corsoal data={data} select={select} setSelect={setSelect} />
      

      {data[select] && <Chart hourly={hourly} data={data[select]}  /> }

      {data[select] && (
        <DownCards dataDowncard={data[select]} select={select} />
      )}
    </div>
  );
}

export default App;