import React, { useEffect, useState } from 'react';
import CovidWorld from '../CovidWorld/CovidWorld';
import CovidUser from '../CovidUser/CovidUser';
import CovidList from '../CovidList/CovidList';
import { MenuOpenRounded } from '@material-ui/icons';
import numeral from "numeral";

import { makeStyles, Paper } from '@material-ui/core';
import { refineCountry } from '../../../misc/utility';

const useStyle = makeStyles(theme => (
  {
    root: {
      width: '100%',
      height: 'fit-content',
      padding: '20px 10px 10px',
      display: 'flex',
      justifyContent: 'space-between',
      position: 'relative',
      [theme.breakpoints.down('md')]: {
        justifyContent: 'space-around',
        paddingTop: '70px',
        overflowX: 'hidden',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '40px 10px 0',
        overflowY: 'scroll',
        display: 'block',
        height: '90vh'
      }
    },
    listBtn: {
      position: 'absolute',
      top: '10px',
      right: '20px',
      display: 'none',
      width: '40px',
      height: '40px',
      borderRadius: '10px',
      '&:hover': {
        cursor: 'pointer',
      },
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }
    },
    listBtnIcon: {
      fontSize: '1.5rem',
      transition: 'all 0.3s ease',
    }
  }
))

const CovidView = () => {
  const classes = useStyle();
  const [countryData, setCountryData] = useState({});
  const [mapCenter, setMapCenter] = useState(() => [8, -2]);
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

  //GET USER COUNTRY DATA
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

    let refinedCountry = await refineCountry(data);
  
    setMapCenter(refinedCountry.position);
    setCountryData(refinedCountry);

    if(window.screen.availWidth < 1280){
      const list = document.querySelector('#country-list');
      const listIcon = document.querySelector('#list-btn-icon');
      list.style.transform = "translateX(110%)";
      listIcon.style.transform = "rotate(0)";
      list.classList.remove('out');
    }
  }

  const slideList = () => {
    const list = document.querySelector('#country-list');
    const listIcon = document.querySelector('#list-btn-icon');

    if(!list.classList.contains('out')){
      list.classList.add('out');
      list.style.transform = "translateX(0%)";
      listIcon.style.transform = "rotate(180deg)";
    }else{
      list.style.transform = "translateX(110%)";
      listIcon.style.transform = "rotate(0)";
      list.classList.remove('out');
    }
  }

  const handleTypeChangeEvent = type => {
    setDisplayType(type);
  }

  return (
    <div className={classes.root}>
      <Paper 
        className={classes.listBtn} 
        elevation={3}
        onClick={slideList}
      >
        <MenuOpenRounded 
          id="list-btn-icon" 
          className={classes.listBtnIcon} 
        />
      </Paper>
      <CovidUser 
        data={countryData}
      />
      <CovidWorld
        onTypeChange={handleTypeChangeEvent}
        center={mapCenter}
        world={worldData}
        displayType={displayType}
        countries={countriesData}
        zoom={mapZoom}
      />
      <CovidList 
        handleClick={handleClickEvent}
      />
    </div>
  )
}

export default CovidView;
