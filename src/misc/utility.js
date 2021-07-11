import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

/****---GET AND FORMAT CURRENT DATE----****/
export const getDate = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export const getTime = () => {
  setInterval(getTime, 1000);
  const date = new Date();
  return `${date.getHours() + 1} : ${date.getMinutes() + 1} : ${
    date.getSeconds() + 1
  }`;
};

/***----CASE COLORS FOR MAP-----*****/
const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(0, 120, 168)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(36, 155, 0)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(230, 39, 14)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};

/****------SORT DATA BY CASES-----****/
export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

/****------FORMAT STRING-----****/
export const prettyPrintStat = (stat) =>
  stat ? `${numeral(stat).format("0,0")}` : "0";

/***-----DRAW MAP ON SCREEN------******/
export const showDataOnMap = (data, casesType) =>
  data.map((country, index) => (
    <Circle
      key={index}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].rgb}
      fillColor={casesTypeColors[casesType].rgb}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <img
            className="info-flag"
            src={`https://www.countryflags.io/${country.countryInfo.iso2}/shiny/64.png`}
            alt={country.country}
          />
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
