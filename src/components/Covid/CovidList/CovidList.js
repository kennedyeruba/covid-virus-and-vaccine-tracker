import React, { useState, useEffect } from 'react';
import CovidListSearch from '../CovidListSearch/CovidListSearch';
import { Tooltip } from '@material-ui/core';
import { 
  Paper, 
  Typography, 
  makeStyles 
} from '@material-ui/core';

const useStyles = makeStyles(theme => (
  {
    root: {
      height: '87vh',
      width: '280px',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '10px',
      padding: '10px',
      overFlowY: 'hidden',
      transition: 'transform 0.3s ease',
      zIndex: '3',
      [theme.breakpoints.down('md')]: {
        position: 'absolute',
        top: '60px',
        right: '20px',
        transform: 'translateX(110%)',
      },
      [theme.breakpoints.down('sm')]: {
        right: '5px',
      }
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
      border: '2px solid transparent',
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
        border: '2px solid rgba(0,0,0,0.3)',
      }
    },
    listImage: {
      marginRight: '20px',
    },
    listText: {
      fontWeight: '600',
      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    },
    
  }
))


const CovidList = ({ handleClick }) => {
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
          return {
            country_name: country.country, 
            country_flag: `https://www.countryflags.io/${country.countryInfo.iso2}/shiny/32.png`, 
            country_iso2: country.countryInfo.iso2,
            country_iso3: country.countryInfo.iso3,
            visible: true
          }
        })
        
        setCountryList(refinedData);
      }catch(err){
        console.log(`[Fetch Country List Error] =>`, err);
      }
    }

    fetchCountryList()
  }, [])

  /* Handle searching country list */
  const handleSearch = text => {

    let newList = [];
    newList = countryList.map(country => {
      if (!country.country_name.toLowerCase().startsWith(text.toLowerCase())) {
        country.visible = false;
      } else {
        country.visible = true;
      }
      return country;
    });

    setCountryList(newList);
  }

  return (
    <Paper className={classes.root} id="country-list" elevation={5}>
      <CovidListSearch handleChange={handleSearch}/>
      <Paper className={classes.list} elevation={0} variant="outlined">
        {
          countryList.map((country, index) => (
            <Paper 
              style={{display: !country.visible && 'none'}} 
              key={index} 
              className={classes.listItem} 
              elevation={3}
              onClick={() => handleClick(country)}
            >
              <img className={classes.listImage} src={country.country_flag} alt={country.country_name}></img>
              <Tooltip title={country.country_name} placement="bottom">
                <Typography className={classes.listText} variant="subtitle2" noWrap>
                  {country.country_name}
                </Typography>
              </Tooltip>
            </Paper>
          ))}
      </Paper>
    </Paper>
  )
}

export default CovidList;
