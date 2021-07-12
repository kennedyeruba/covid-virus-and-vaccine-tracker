import React, { useState,useEffect } from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import CovidMap from '../CovidMap/CovidMap';
import CovidTable from '../CovidTable/CovidTable';
import numeral from "numeral";
import { getDate } from '../../../misc/utility';

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
    flexDirection: 'column',
    '&:hover':{
      cursor: 'pointer',
    }
  },
  text: {
    lineHeight: '-10'
  },
  indicator: {
    width: '30px',
    height: '5px',
    bordeRadius: '100px',
    background: '#0078a8',
    margin: '2px 0',
    // opacity: '.3',
    transition: 'all .3s ease',
  }
})

const CovidWorld = ({ mapCenter }) => {
  const classes = useStyles();
  const [worldData, setWorldData] = useState({});
  const [countriesData, setCountriesData] = useState([]);
  const [displayType, setDisplayType] = useState('cases');
  const [mapZoom, setMapZoom] = useState(3);

  /* GET COUNTRIES FOR MAP */
  useEffect(() => {
    const fetchAllCountriesData = async () => {
      try{
        const response = await fetch('https://disease.sh/v3/covid-19/countries')
        let data = await response.json();
        setCountriesData(data);
        setMapZoom(3)
      }catch(err){
        console.log(`[GET MAP DATA ERROR]: ${err}`)
      }
    }
    fetchAllCountriesData();
  }, []);

  /* GET WORLDWIDE DATA */
  useEffect(() => {
    const fetchWorldData = async () => {
      try{
        const response = await fetch('https://disease.sh/v3/covid-19/all')
        const data = await response.json();

        const refinedWorldData = {
          cases: numeral(data.cases).format('0,0'),
          new_cases: numeral(data.todayCases).format('0,0'),
          deaths: numeral(data.deaths).format('0,0'),
          new_deaths: numeral(data.todayDeaths).format('0,0'),
          recoveries: numeral(data.recovered).format('0,0'),
          new_recoveries: numeral(data.todayRecovered).format('0,0')
        }

        setWorldData(refinedWorldData)
      }catch(err){
        console.log('[GET WORLD ERROR]: ', err)
      }
    }

    fetchWorldData();
  },[]);

  const handleTypeChange = type => {
    setDisplayType(type)
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.world_data} elevation={5}>
        <Paper className={classes.info} elevation={3}>
          <Typography variant='h6'>
            WorldWide
          </Typography>
          <Typography variant='subtitle2'>
            {getDate()}
          </Typography>
        </Paper>
        <Paper onClick={() => handleTypeChange('cases')} className={classes.info} elevation={3}>
          <Typography className={classes.text} variant='h6'>
            Cases
          </Typography>
          <Typography className={classes.text} variant='subtitle1'>
            {worldData.cases}
          </Typography>
          <Typography className={classes.text} variant='subtitle2'>
            +{worldData.new_cases}
          </Typography>
          <Paper style = {{background: '#0078a8'}} className={classes.indicator} elevation={2}></Paper>
        </Paper>
        <Paper onClick={() => handleTypeChange('deaths')} className={classes.info} elevation={3}>
          <Typography className={classes.text} variant='h6'>
            Deaths
          </Typography>
          <Typography className={classes.text} variant='subtitle1'>
            {worldData.deaths}
          </Typography>
          <Typography className={classes.text} variant='subtitle2'>
            +{worldData.new_deaths}
          </Typography>
          <Paper style = {{background: '#e6270e'}} className={classes.indicator} elevation={2}></Paper>
        </Paper>
        <Paper onClick={() => handleTypeChange('recovered')} className={classes.info} elevation={3}>
          <Typography className={classes.text} variant='h6'>
            Recoveries
          </Typography>
          <Typography className={classes.text} variant='subtitle1'>
            {worldData.recoveries}
          </Typography>
          <Typography className={classes.text} variant='subtitle2'>
            +{worldData.new_recoveries}
          </Typography>
          <Paper style = {{background: '#249b00'}} className={classes.indicator} elevation={2}></Paper>
        </Paper>
      </Paper>
      <CovidMap 
        center={mapCenter} 
        zoom={mapZoom}
        countries={countriesData}
        displayType={displayType}
      />
      <CovidTable />
    </div>
  );
}

export default CovidWorld;
