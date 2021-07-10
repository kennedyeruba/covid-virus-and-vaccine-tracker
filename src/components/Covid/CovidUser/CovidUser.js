import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Paper } from '@material-ui/core';

const usestyles = makeStyles({
  root: {
    height: '90vh',
    width: '280px',
    display: 'flex',
    flexDirection: 'column',
  },
  country: {
    height: 'fit-content',
    width: '100%',
    borderRadius: '10px',
    padding: '10px',
  },
  info: {
    width: '100%',
    height: '80px',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  population: {
    width: '100%',
    height: '50px',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  cases: {
    width: '100%',
    height: '50px',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  deaths: {
    width: '100%',
    height: '50px',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  recoveries: {
    width: '100%',
    height: '50px',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  tests: {
    width: '100%',
    height: '50px',
    borderRadius: '10px',
  },
  chart: {
    width: '100%',
    height: '28%',
    borderRadius: '10px',
    marginTop: '10px',
  }
})

const CovidUser = () => {
  const classes = usestyles();
  const [countryData, setCountryData] = useState({});

  useEffect(() => {
    const fetchUserCountry = async () => {

      // const ipResponse = await fetch("https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572");
      // const ip_country_data = await ipResponse.json();
      // const {country_name} = ip_country_data;
      // console.log(ip_country_data);

      // const dataResponse = await fetch(`https://disease.sh/v3/covid-19/countries/${country_name}?strict=true`);
      // const data = await dataResponse.json();
      const data = JSON.parse(localStorage.getItem('country-data'));
      console.log('local: ', data);

      setCountryData(data);
    };

    fetchUserCountry();
  }, []);

  return (
    <div className={classes.root}>
      <Paper className={classes.country} elevation={5}>
        <Paper className={classes.info} elevation={3}></Paper>
        <Paper className={classes.population} elevation={3}></Paper>
        <Paper className={classes.cases} elevation={3}></Paper>
        <Paper className={classes.deaths} elevation={3}></Paper>
        <Paper className={classes.recoveries} elevation={3}></Paper>
        <Paper className={classes.tests} elevation={3}></Paper>
      </Paper>
      <Paper className={classes.chart} elevation={5}></Paper>
    </div>
  )
};

CovidUser.propTypes = {};

CovidUser.defaultProps = {};

export default CovidUser;
