import { useEffect, useState } from "react";
import "./App.css";
import InputBox from "./components/InputBox";
import axios from "axios";
import Corsoal from "./components/Corsoal";
import Chart from "./components/Charts";
import DownCards from "./components/DownCards";
import { DominoSpinner } from "react-spinners-kit";
import { data as localData } from "./data";
import useGeolocation from "./Hooks/useGeolocation";

function App() {
  const [data, setData] = useState([]);
  const [currrent, setCurrent] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [cords, setCords] = useState([17.3753, 78.4744]);
  const [select, setSelect] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

 const {dataLoc ,loadingLoc, error} = useGeolocation();



  const getCustomersData = () => {
    setLoading(true);
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
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const ipLookUp = () => {

    setLoading(true);

    axios
      .get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${dataLoc.latitude}&lon=${dataLoc.longitude}&limit=10&appid=bb5e47c441c052ffa125b44b2f386884`)
      .then((dataRes) => {

        const city = dataRes.data[0].name.toLowerCase();

        console.log(city)
        let result = false;
        localData.forEach((i) => {
          const cityname = i.name.toLowerCase();

          if (cityname.includes(city)) {
            result = true;
            console.log("yes found", cityname);
            setCords([i.coord.lat, i.coord.lon]);
            setSelectedOption(i.id);
            setLoading(false);

          }
        });
      })
      .catch((err) => console.log(err),setLoading(false) );
  };



  useEffect(() => {
    ipLookUp();
  }, [loadingLoc]);


  useEffect(() => {
    getCustomersData();
  }, [cords]);

  if (loading) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <DominoSpinner size={200} color="#87CEFA" />
      </div>
    );
  }

  return (
    <div className="container-sm">
      <InputBox
        setCords={setCords}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        setSelect={setSelect}
      />
      <Corsoal data={data} select={select} setSelect={setSelect} />

      {data[select] && <Chart hourly={hourly} data={data[select]} />}

      {data[select] && (
        <DownCards dataDowncard={data[select]} select={select} />
      )}
    </div>
  );
}

export default App;
