import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import CovidListSearch from '../CovidListSearch/CovidListSearch';

import { 
  Paper, 
  TextField, 
  Typography, 
  makeStyles 
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    height: '87vh',
    width: '280px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    padding: '10px',
    overFlowY: 'hidden'
  },
  list: {
    width: '100%',
    height: '80%',
    marginTop: '20px',
    borderRadius: '10px',
    padding: '10px',
    overflowY: 'scroll',
    position: 'relative',
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
  listItem: {
    width: '100%',
    minHeight: '50px',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    marginTop: '10px',
    borderRadius: '10px',
    userSelect: 'none',
    '&:nth-child(1)': {
      marginTop: '0',
    },
    '&:hover': {
      cursor: 'pointer',
    }
  },
  listImage: {
    marginRight: '20px',
  },
  listText: {
    fontWeight: '600',
    textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
  },
  
})


const CovidList = () => {
  const classes = useStyles();
  const [countryList, setCountryList] = useState([]);
  
  useEffect(() => {
    const fetchCountryList = async () => {
      try{
        const response = await fetch('https://disease.sh/v3/covid-19/countries');
        const data = await response.json();

        /* Filter List before Mapping */
        let refinedData = data.filter(country => 
          country.country.toLowerCase() !== "diamond princess" &&
          country.country.toLowerCase() !== "ms zaandam"
        )
        
        /* Map List before saving */
        refinedData = refinedData.map(country => {
          return {country_name: country.country, 
            country_flag: `https://www.countryflags.io/${country.countryInfo.iso2}/shiny/32.png`, 
            country_iso2: country.countryInfo.iso2,
            country_iso3: country.countryInfo.iso3,
            visible: true
          }
        })
        localStorage.setItem('country-list', JSON.stringify(refinedData))
        console.log(refinedData)
        
        setCountryList(refinedData);
      }catch(err){
        console.log(`[Fetch Country List Error] =>`, err);
      }
    }

    fetchCountryList()
  }, [])

  /* Handle searching country list */
  const handleSearch = text => {
    console.log(text)

    let newList = [];
    newList = countryList.map(country => {
      if (!country.country_name.toLowerCase().startsWith(text.toLowerCase())) {
        country.visible = false;
      } else {
        country.visible = true;
      }
      return country;
    });

    console.log(newList)
    setCountryList(newList);
  }

  return (
    <Paper className={classes.root} elevation={5}>
      <CovidListSearch handleChange={handleSearch}/>
      <Paper className={classes.list} elevation={0} variant="outlined">
        {countryList != [] ? 
          countryList.map((country, index) => (
            <Paper 
              style={{display: !country.visible && 'none'}} 
              key={index} 
              className={classes.listItem} 
              elevation={3}
            >
              <img className={classes.listImage} src={country.country_flag}></img>
              <Typography className={classes.listText} noWrap>
                {country.country_name}
              </Typography>
            </Paper>
          )) : 
          <Typography noWrap>
            No Match
          </Typography>}
      </Paper>
    </Paper>
  )
};

CovidList.propTypes = {};

CovidList.defaultProps = {};

export default CovidList;
