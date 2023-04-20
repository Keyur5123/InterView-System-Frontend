import React from "react";
import {
  Grid
} from "@mui/material";

function HeadTailGrid({ columns, data }) {
  return (
    <div className="text-center ">
      <p className="my-5">Previous Records</p>
      <div >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {data.map((ele, index) => (
            <Grid
              key={index}
              padding="5px"
            >
              {ele.rows.map((e, id) => (
                <div key={id}>{e}</div>
              ))}
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default HeadTailGrid;
