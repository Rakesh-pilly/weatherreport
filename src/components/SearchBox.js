import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import PlaceIcon from '@mui/icons-material/Place';
import {
  get,
  limitToFirst,
  orderByChild,
  query,
  ref,
  startAt,
} from "firebase/database";
import { db } from "../fireBase/firebaseConfig";
import useDebounce from "../Hooks/useDebounce";
import { InputAdornment } from "@mui/material";

export default function SearchBox({ setCords, setSelect , defaultVal, setDefaultVal}) {


  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [text, setText] = React.useState('');

  const recentPostsRef = query(
    ref(db, "cities"),
    orderByChild("name"),
    startAt(text),
    limitToFirst(10)
  );



  const getDAta = () => {

    get(recentPostsRef)
      .then((snapshot) => {

        if (snapshot.exists()) {
          let res = snapshot.val();
          setOptions([...Object.values(res),defaultVal]);

        } 
      })
      .catch((error) => {
        console.error(error);
      });
  };

 const {runing}  = useDebounce(getDAta, 1200, [text]);



  const handleCords = (value,event) => {

    console.log(value)

    if (!value) return;

      setDefaultVal(value)
     setCords([value.coord.lat, value.coord.lon]);
    setSelect(0)
  };

  const handleInput = (e)=>{

    let text = e.target.value.trim(" ");
    text = text? text[0].toUpperCase() + text.slice(1) : "";
    setText(text)
  }

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ marginY: 2 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value = {defaultVal}
      onChange={(event, value) => handleCords(value,event)}
      isOptionEqualToValue={(option, value) => {
        return option.name === value.name
      }}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={runing}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search city"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {runing ? <CircularProgress  size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
          
            ),

            startAdornment: (
              <InputAdornment position="start">
                <PlaceIcon />
              </InputAdornment>
            ),


          }}

          onChange = {(e)=> handleInput(e)}

        />
      )}
    />
  );
}

