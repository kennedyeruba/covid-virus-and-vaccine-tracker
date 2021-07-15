import React, { useEffect, useState } from 'react';
import CovidWorld from '../CovidWorld/CovidWorld';
import CovidUser from '../CovidUser/CovidUser';
import CovidList from '../CovidList/CovidList'

import { makeStyles } from '@material-ui/core';
import { refineCountry } from '../../../misc/utility';

const useStyle = makeStyles(theme => (
  {
    root: {
      width: '100%',
      minHeight: '100vh',
      height: 'fit-content',
      padding: '20px 10px 10px',
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down('md')]: {
        justifyContent: 'space-around',
        position: 'relative'
      },
      [theme.breakpoints.down('sm')]: {
        padding: '0 10px',
        overflowY: 'scroll',
        display: 'block',
        height: '175vh'
      }
    }
  }
))

const CovidView = () => {
  const classes = useStyle();
  const [countryData, setCountryData] = useState({});
  const [mapCenter, setMapCenter] = useState([8, -2]);

  useEffect(() => {
    const fetchUserCountry = async () => {

      const ipResponse = await fetch("https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572");
      const ip_country_data = await ipResponse.json();
      const {country_name} = ip_country_data;

      const dataResponse = await fetch(`https://disease.sh/v3/covid-19/countries/${country_name}?strict=true`);
      const data = await dataResponse.json();

      let refinedCountry = refineCountry(data);
      
      setCountryData(refinedCountry);
      setMapCenter(refinedCountry.position);
    };

    fetchUserCountry();
  }, [])

  const handleClickEvent = async ({country_name}) => {
    const response = await fetch(`https://disease.sh/v3/covid-19/countries/${country_name}?strict=true`)
    const data = await response.json()

    let refinedCountry = refineCountry(data);
  
    setCountryData(refinedCountry);
    setMapCenter(refinedCountry.position);
  }

  return (
    <div className={classes.root}>
      <CovidUser data={countryData}/>
      <CovidWorld 
        mapCenter={mapCenter}
      />
      <CovidList handleClick={handleClickEvent}/>
    </div>
  )
}

export default CovidView;
