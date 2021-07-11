import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import CovidMap from '../CovidMap/CovidMap';
import CovidTable from '../CovidTable/CovidTable';

const useStyles = makeStyles({
  root: {
    width: '750px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    position: 'relative',
    padding: '0 10px 100px',
    '&::-webkit-scrollbar': {
      width: '10px'
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(0,0,0,0.5)',
      borderRadius: '5px',
    },
    '&::-webkit-scrollbar-track': {
      width: '5px',
      background: 'rgba(0,0,0,0.3)',
    }
  },
  world_data: {
    width: '100%',
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    borderRadius: '10px',
  },
  info: {
    width: '160px',
    height: '100px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  text: {
    lineHeight: '-10'
  }
})

const CovidWorld = () => {
  const classes = useStyles();
  const [worldData, setWorldData] = useState({});
  const [countriesData, setCountriesData] = useState([]);
  const [searchType, setSearchType] = useState('TotalCases');

  useEffect(() => {
    const fetchAllCountriesData = async () => {
      try{
        // const response = await fetch("https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries", {
        //   "method": "GET",
        //   "headers": {
        //     "x-rapidapi-key": "2b77998fcemsh394d28feaaeaeebp1e00b0jsn01de2fd7d8dc",
        //     "x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com"
        //   }
        // })

        // const data = await response.json();
        const data = JSON.parse(localStorage.getItem('countries'));
        const refinedData = [];
        data.map(item => {
          refinedData.push({
            Country: item['Country'], 
            Population: item['Population'], 
            [searchType]: item[searchType]})
        })
        setCountriesData(refinedData);
        console.log(refinedData);
      }catch(err){
        console.log(`[GET TABLE ERROR]: ${err}`)
      }
    }

    fetchAllCountriesData();
  }, [searchType]);

  useEffect(() => {
    const fetchWorldData = async () => {
      try{
      //   const response = await fetch("https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/world", {
      //     "method": "GET",
      //     "headers": {
      //       "x-rapidapi-key": "2b77998fcemsh394d28feaaeaeebp1e00b0jsn01de2fd7d8dc",
      //       "x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com"
      //     }
      //   })

        // const data = await response.json();
        const data = JSON.parse(localStorage.getItem('world'));
        const refinedWorldData = {
          ...data[0],
          cases: data[0].TotalCases.toLocaleString('en-US'),
          new_cases: data[0].NewCases.toLocaleString('en-US'),
          deaths: data[0].TotalDeaths.toLocaleString('en-US'),
          new_deaths: data[0].NewDeaths.toLocaleString('en-US'),
          recoveries: Number.parseInt(data[0].TotalRecovered).toLocaleString('en-US'),
          new_recoveries: data[0].NewRecovered.toLocaleString('en-US')
        }
        setWorldData(refinedWorldData)
        console.log(refinedWorldData)
      }catch(err){
        console.log(`[GET TABLE ERROR]: ${err}`)
      }
    }

    fetchWorldData();
  },[]);

  const handleRecoveries = () => setSearchType('TotalRecovered');

  const handleCases = () => setSearchType('TotalCases');

  const handleDeaths = () => setSearchType('TotalDeaths');

  return (
    <div className={classes.root}>
      {/* <Paper onClick={handleCases} className={classes.paper} elevation={3} >
        <Typography variant="h6">Total Cases</Typography>
        <h2>{worldData['TotalCases']}</h2>
        <h3>+{worldData['NewCases']}</h3>
      </Paper>
      <Paper onClick={handleDeaths} className={classes.paper} elevation={3} >
        <h1>Total Deaths</h1>
        <h2>{worldData['TotalDeaths']}</h2>
        <h3>+{worldData['NewDeaths']}</h3>
      </Paper>
      <Paper onClick={handleRecoveries} className={classes.paper} elevation={3} >
        <h1>Total Recovered</h1>
        <h2>{worldData['TotalRecovered']}</h2>
        <h3>+{worldData['NewRecovered']}</h3>
      </Paper> */}
      <Paper className={classes.world_data} elevation={5}>
        <Paper className={classes.info} elevation={3}>
          <Typography>
            WorldWide
          </Typography>
        </Paper>
        <Paper className={classes.info} elevation={3}>
          <Typography className={classes.text}>
            Cases
          </Typography>
          <Typography className={classes.text}>
          {worldData.cases}
          </Typography>
          <Typography className={classes.text}>
          {worldData.new_cases}
          </Typography>
        </Paper>
        <Paper className={classes.info} elevation={3}>
          <Typography className={classes.text}>
            Deaths
          </Typography>
          <Typography className={classes.text}>
            {worldData.deaths}
          </Typography>
          <Typography className={classes.text}>
            {worldData.new_deaths}
          </Typography>
        </Paper>
        <Paper className={classes.info} elevation={3}>
        <Typography className={classes.text}>
            Recoveries
          </Typography>
          <Typography className={classes.text}>
            {worldData.recoveries}
          </Typography>
          <Typography className={classes.text}>
            {worldData.new_recoveries}
          </Typography>
        </Paper>
      </Paper>
      <CovidMap />
      <CovidTable />
    </div>
  );
}

CovidWorld.propTypes = {};

CovidWorld.defaultProps = {};

export default CovidWorld;
