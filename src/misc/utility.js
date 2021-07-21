import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import { Typography } from "@material-ui/core";

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

/*  */
export const numberFormatter = num => {
  const formatter = new Intl.NumberFormat('en', {
    notation: 'compact'
  })
  return formatter.format(num)
}

/***----CASE COLORS FOR MAP-----*****/
const displayTypeData = {
  cases: {
    hex: "#0078a8",
    rgb: "rgb(0, 120, 168)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#249b00",
    rgb: "rgb(36, 155, 0)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#e6270e",
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

/*CHANGE COUNTRY OBJECT FORMAT */
export const refineCountry = data => {
  return {
    country: data.country,
    continent: data.continent,
    flag: `https://www.countryflags.io/${data.countryInfo.iso2}/shiny/64.png`,
    population: numeral(data.population).format("0,0"),
    cases: numeral(data.cases).format("0,0"),
    new_cases: numeral(data.todayCases).format("0,0"),
    deaths: numeral(data.deaths).format("0,0"),
    new_deaths: numeral(data.todayDeaths).format("0,0"),
    recoveries: numeral(data.recovered).format("0,0"),
    new_recoveries: numeral(data.todayRecovered).format("0,0"),
    tests: numeral(data.tests).format("0,0"),
    position: [data.countryInfo.lat, data.countryInfo.long],
    iso2: data.countryInfo.iso2
  }
}

/***-----DRAW MAP ON SCREEN------******/
export const showDataOnMap = (data, displayType) =>
  data.map((country, index) => (
    <Circle
      key={index}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={displayTypeData[displayType]["hex"]}
      fillColor={displayTypeData[displayType]["hex"]}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[displayType]) * displayTypeData[displayType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <img
            className="info-flag"
            src={`https://www.countryflags.io/${country.countryInfo.iso2}/shiny/64.png`}
            alt={country.country}
          />
          <Typography variant="h6">{country.country}</Typography>
          <Typography variant="subtitle2">Cases: {numeral(country.cases).format("0,0")}</Typography>
          <Typography variant="subtitle2">Recovered: {numeral(country.recovered).format("0,0")}</Typography>
          <Typography variant="subtitle2">Deaths: {numeral(country.deaths).format("0,0")}</Typography>
        </div>
      </Popup>
    </Circle>
  ));
