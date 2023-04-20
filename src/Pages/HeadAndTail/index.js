import React, { useMemo, useState, useEffect } from "react";

import HeadTailGrid from "../../Components/HeadTailGrid";

import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  FormHelperText
} from "@mui/material";

function Index() {
  const [data, setData] = useState([]);
  const [tossVal, setTossVal] = React.useState("");
  const [tossError, setTossError] = useState(false)

  const handleChange = (event) => {
    setTossVal(event.target.value);
  };

  const handleHeadAndTail = () => {
    if (tossVal != "") {
      let currEle = data.slice(-1);
      if (currEle && currEle[0]?.rows?.slice(-1) != tossVal) {
        setData((data) => [...data, { rows: [tossVal] }]);
      } else {
        currEle[0].rows.push(tossVal);
      }
    }
    setTossError(true);
    setTossVal("");
  };

  return (
    <div className="App">
      <p className="text-center text-2xl font-bold mb-5">H And T Game</p>
      <div className="flex justify-end">
        <div>
          <FormControl sx={{ mx: 1, minWidth: 160 }} size="small" error={tossError ? true : false}>
            <InputLabel id="demo-simple-select-label">tossVal</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={tossVal}
              label="tossVal"
              onChange={handleChange}
            >
              <MenuItem value={"H"}>H</MenuItem>
              <MenuItem value={"T"}>T</MenuItem>
            </Select>
            {tossError && <FormHelperText>Please choose any one value</FormHelperText>}
          </FormControl>
        </div>
        <div>
          <Button onClick={handleHeadAndTail} variant="contained" size="medium">
            Add
          </Button>
        </div>
      </div>

      <HeadTailGrid
        data={data}
      />
    </div>
  );
}

export default Index