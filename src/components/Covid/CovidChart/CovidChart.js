import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { Paper } from "@material-ui/core";
import { numberFormatter } from "../../../misc/utility";

const CovidChart = ({ countryIso }) => {
  const [casesData, setCasesData] = useState({});
  // const [deathsData, setDeathsData] = useState({});
  // const [recoveriesData, setRecoveriesData] = useState({});
  const [iso, setIso] = useState('');
  const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numberFormatter(value)
            },
          },
        },
      ],
    },
  };
  
  /* SET UP DATA FOR CHART */
  const buildChartData = (data, displayType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data[displayType]) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[displayType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[displayType][date];
    }
    
    return chartData;
  }

  let bg_colors = {
    cases: "rgba(0, 120, 168, 0.5)",
    deaths: "rgba(230, 39, 14, 0.5)",
    recovered: "rgba(36, 155, 0, 0.5)"
  }
  let border_colors = {
    cases: "rgb(0, 120, 168)",
    deaths: "rgb(230, 39, 14)",
    recovered: "rgb(36, 155, 0)"
  }

  useEffect(() => {
    const fetchData = async () => {
      try{
        if(countryIso && countryIso != iso){
          const response = await fetch(`https://disease.sh/v3/covid-19/historical/${countryIso}?lastdays=90`)
          const data = await response.json();

          let casesChartData = buildChartData(data.timeline, 'cases');
          // let deathsChartData = buildChartData(data, 'deaths');
          // let recoveriesChartData = buildChartData(data, 'recovered');

          setCasesData(casesChartData);
          // setDeathsData(deathsChartData);
          // setRecoveriesData(recoveriesChartData);
          // console.log('Case Chart: ', casesChartData);
          // console.log('Death Chart: ', deathsChartData);
          // console.log('Recovery Chart: ', recoveriesChartData);
          setIso(countryIso);
        }
      }catch(err){
        console.log('[Fetching Chart Data Error]: ', err);
      }
    }
    fetchData();
  }, [countryIso]);

  return (
    <Paper className="graph" elevation={0}>
      {casesData.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                label: 'cases',
                backgroundColor: bg_colors['cases'],
                borderColor: border_colors['cases'],
                data: casesData,
              },
            ],
          }}
          options={options}
        />
      )}
    </Paper>
  );
}

export default CovidChart;

