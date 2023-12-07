import React from "react";
import axios from "axios";

const Test = () => {
  const handleClick = () => {
    let data = JSON.stringify([
      {
        // ... your data
      },
    ]);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://portalentregas.com/eLogisticsApis/shipments/?token=Entregas23&usuario=CSECUADOR&guiaMasterId=5",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

export default Test;
