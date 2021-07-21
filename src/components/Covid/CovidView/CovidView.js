import React, { useEffect, useState } from 'react';
import CovidWorld from '../CovidWorld/CovidWorld';
import CovidUser from '../CovidUser/CovidUser';
import CovidList from '../CovidList/CovidList';
import { MenuOpenRounded } from '@material-ui/icons';

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

  return (
    <div className={classes.root}>
      <Paper 
        className={classes.listBtn} 
        elevation={3}
        onClick={slideList}
      >
        <MenuOpenRounded id="list-btn-icon" className={classes.listBtnIcon} />
      </Paper>
      <CovidUser data={countryData}/>
      <CovidWorld 
        mapCenter={mapCenter}
      />
      <CovidList 
        handleClick={handleClickEvent}
      />
    </div>
  )
}

export default CovidView;
