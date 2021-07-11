import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import CovidTable from '../CovidTable/CovidTable';
import CovidWorld from '../CovidWorld/CovidWorld';
import CovidUser from '../CovidUser/CovidUser';
import CovidList from '../CovidList/CovidList'

import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
  root: {
    color: 'red',
    width: '100%',
    minHeight: '100vh',
    padding: '20px 10px 10px',
    display: 'flex',
    justifyContent: 'space-between',
  }
})

const CovidView = () => {
  const classes = useStyle();
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
      let refinedCountry = {
        flag: `https://www.countryflags.io/${data.countryInfo.iso2}/shiny/64.png`,
        population: data.population.toLocaleString('en-US'),
        cases: data.cases.toLocaleString('en-US'),
        deaths: data.deaths.toLocaleString('en-US'),
        recoveries: data.recovered.toLocaleString('en-US'),
        tests: data.tests.toLocaleString('en-US'),
      } 

      setCountryData({...data, ...refinedCountry});
    };

    fetchUserCountry();
  }, [])

  const handleClickEvent = async ({country_name}) => {
    const response = await fetch(`https://disease.sh/v3/covid-19/countries/${country_name}?strict=true`)
    const data = await response.json()
    let refinedCountry = {
      flag: `https://www.countryflags.io/${data.countryInfo.iso2}/shiny/64.png`,
      population: data.population.toLocaleString('en-US'),
      cases: data.cases.toLocaleString('en-US'),
      deaths: data.deaths.toLocaleString('en-US'),
      recoveries: data.recovered.toLocaleString('en-US'),
      tests: data.tests.toLocaleString('en-US'),
    }
  
    setCountryData({...data, ...refinedCountry});
  }
  return (
    <div className={classes.root}>
      <CovidUser data={countryData}/>
      <CovidWorld />
      <CovidList handleClick={handleClickEvent}/>
    </div>
  )
};

CovidView.propTypes = {};

CovidView.defaultProps = {};

export default CovidView;
