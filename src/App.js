import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Corsoal from "./components/Corsoal";
import Chart from "./components/Charts";
import DownCards from "./components/DownCards";
import { DominoSpinner } from "react-spinners-kit";
import useGeolocation from "./Hooks/useGeolocation";
import SearchBox from "./components/SearchBox";

function App() {
  const [data, setData] = useState([]);
  const [currrent, setCurrent] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [cords, setCords] = useState([17.3753, 78.4744]);
  const [select, setSelect] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [hourlyDate, setHourlyDate] = useState([]);
  const [defaultVal, setDefaultVal] = useState({
    coord: {
      lat: 17.37528,
      lon: 78.474442,
    },
    country: "IN",
    id: 1269843,
    name: "Hyderabad",
    state: "",
  });

  const { dataLoc, loadingLoc, error } = useGeolocation();

  const fitlerHourlyDate = () => {

    if(select > 2) return;

    const hourlyDate = hourly.filter((i) => {
      if (!data[select]) return;

      let date = data[select] && data[select].dt;
      date *= 1000;
      date = new Date(date);
      let selectDate = date.toLocaleString().split(",")[0];

      let mapDate = i.dt && i.dt * 1000;
      mapDate = i.dt && new Date(mapDate).toLocaleString().split(",")[0];

      return selectDate === mapDate;
    });

    setHourlyDate(hourlyDate);
  };

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

    let lat = dataLoc.latitude ? dataLoc.latitude : cords[0];
    let lon = dataLoc.longitude ? dataLoc.longitude : cords[1];

    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=10&appid=bb5e47c441c052ffa125b44b2f386884`
      )
      .then((dataRes) => {
        const city = dataRes.data[0].name.toLowerCase();
        setCords([lat, lon]);
        setLoading(false);
        setDefaultVal({
          coord: {
            lat: lat,
            lon: lon,
          },
          country: "IN",
          id: 1269843,
          name: city ? city : "Hyderabad",
          state: "",
        });
      })
      .catch((err) => console.log(err), setLoading(false));
  };

  useEffect(() => {
    ipLookUp();
  }, [loadingLoc]);

  useEffect(() => {
    getCustomersData();
  }, [cords]);

  useEffect(() => {
    fitlerHourlyDate();
  }, [select, data]);

  if (loading) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <DominoSpinner size={200} color="#87CEFA" />
      </div>
    );
  }

  return (
    <div className="container-sm">
      <SearchBox
        setCords={setCords}
        setSelect={setSelect}
        defaultVal={defaultVal}
        setDefaultVal={setDefaultVal}
        setLoading={setSearchLoading}
        loading={searchLoading}
      />

      <Corsoal data={data} select={select} setSelect={setSelect} />

      {data[select] && <Chart hourly={hourlyDate} data={data[select]} />}

      {data[select] && (
        <DownCards dataDowncard={data[select]} select={select} />
      )}
    </div>
  );
}

export default App;
