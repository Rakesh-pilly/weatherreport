
import { useEffect, useState } from 'react';
import './App.css';
import InputBox from './components/InputBox';
import axios from 'axios';
import Corsoal from './components/Corsoal';
import Chart from './components/Charts';

function App() {

  const [data, setData] = useState([]);
  const [currrent , setCurrent] = useState([]);
  const getCustomersData = () => {
    axios
    .get("https://api.openweathermap.org/data/2.5/onecall?lat=17.38&lon=78.48&exclude=hourly,minutely&appid=bb5e47c441c052ffa125b44b2f386884&units=metric")
    .then(data => {
      console.log(data)
      setData(data.data.daily);
      setCurrent(data.data.current);
    })
    .catch(error => console.log(error));
    };
  

  useEffect(() => {
    
    getCustomersData();
   
  }, [])
  

  return (
    <div className='container-sm '>
      <InputBox/>
     <Corsoal data = {data} />
     <Chart/>
       
  
    </div>
  );
}

export default App;
