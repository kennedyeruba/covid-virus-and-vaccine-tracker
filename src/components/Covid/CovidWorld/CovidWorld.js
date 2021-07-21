import React, { useState,useEffect } from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import CovidMap from '../CovidMap/CovidMap';
import CovidTable from '../CovidTable/CovidTable';
import numeral from "numeral";
import { getDate } from '../../../misc/utility';

const useStyles = makeStyles(theme => (
  {
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
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: 'fit-content',
        marginTop: '20px',
        padding: '5px',
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
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        padding: '20px 0',
      }
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
      },
      [theme.breakpoints.down('sm')]: {
        width: '60%',
        marginBottom: '20px',
        '&:last-child': {
          marginBottom: '0',
        }
      }
    },
    text: {
      lineHeight: '-10',
      textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
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
  }
))

const CovidWorld = ({ world, center, onTypeChange, displayType, countries, zoom }) => {
  const classes = useStyles();

  const handleTypeChange = type => {
    onTypeChange(type)
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.world_data} elevation={5}>
        <Paper className={classes.info} elevation={3}>
          <Typography className={classes.text} variant='h6'>
            WorldWide
          </Typography>
          <Typography className={classes.text} variant='subtitle2'>
            {getDate()}
          </Typography>
        </Paper>
        <Paper onClick={() => handleTypeChange('cases')} className={classes.info} elevation={3}>
          <Typography className={classes.text} variant='h6'>
            Cases
          </Typography>
          <Typography className={classes.text} variant='subtitle1'>
            {world.cases}
          </Typography>
          <Typography className={classes.text} variant='subtitle2'>
            +{world.new_cases}
          </Typography>
          <Paper style = {{background: '#0078a8'}} className={classes.indicator} elevation={2}></Paper>
        </Paper>
        <Paper onClick={() => handleTypeChange('deaths')} className={classes.info} elevation={3}>
          <Typography className={classes.text} variant='h6'>
            Deaths
          </Typography>
          <Typography className={classes.text} variant='subtitle1'>
            {world.deaths}
          </Typography>
          <Typography className={classes.text} variant='subtitle2'>
            +{world.new_deaths}
          </Typography>
          <Paper style = {{background: '#e6270e'}} className={classes.indicator} elevation={2}></Paper>
        </Paper>
        <Paper onClick={() => handleTypeChange('recovered')} className={classes.info} elevation={3}>
          <Typography className={classes.text} variant='h6'>
            Recoveries
          </Typography>
          <Typography className={classes.text} variant='subtitle1'>
            {world.recoveries}
          </Typography>
          <Typography className={classes.text} variant='subtitle2'>
            +{world.new_recoveries}
          </Typography>
          <Paper style = {{background: '#249b00'}} className={classes.indicator} elevation={2}></Paper>
        </Paper>
      </Paper>
      <CovidMap 
        center={center} 
        zoom={zoom}
        countries={countries}
        displayType={displayType}
      />
      <CovidTable />
    </div>
  );
}

export default CovidWorld;
