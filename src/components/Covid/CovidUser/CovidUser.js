import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Paper, Typography } from '@material-ui/core';

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
    height: '70px',
    borderRadius: '10px',
    marginBottom: '10px',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  info_left: {
    fontSize: '1rem',
  },
  population: {
    width: '100%',
    height: '50px',
    borderRadius: '10px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
  },
  cases: {
    width: '100%',
    height: '50px',
    borderRadius: '10px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
  },
  deaths: {
    width: '100%',
    height: '50px',
    borderRadius: '10px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
  },
  recoveries: {
    width: '100%',
    height: '50px',
    borderRadius: '10px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
  },
  tests: {
    width: '100%',
    height: '50px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
  },
  chart: {
    width: '100%',
    height: '28%',
    borderRadius: '10px',
    marginTop: '10px',
  }
})

const CovidUser = ({ data }) => {
  const classes = usestyles();

  useEffect(() => {
    console.log(data)
  }, []);

  return (
    <div className={classes.root}>
      <Paper className={classes.country} elevation={5}>
        <Paper className={classes.info} elevation={3}>
          <div className={classes.info_left}>
            <Typography>
              {data.country}
            </Typography>
            <Typography>
              {data.continent}
            </Typography>
          </div>
          <img src={data.flag} alt="" />
        </Paper>
        <Paper className={classes.population} elevation={3}>
          <div>
            <Typography>Population</Typography>
          </div>
          <div>
          <Typography>{data.population}</Typography>
          </div>
        </Paper>
        <Paper className={classes.cases} elevation={3}>
        <div>
            <Typography>Cases</Typography>
          </div>
          <div>
          <Typography>{data.cases}</Typography>
          </div>
        </Paper>
        <Paper className={classes.deaths} elevation={3}>
        <div>
            <Typography>Deaths</Typography>
          </div>
          <div>
          <Typography>{data.deaths}</Typography>
          </div>
        </Paper>
        <Paper className={classes.recoveries} elevation={3}>
        <div>
            <Typography>Recoveries</Typography>
          </div>
          <div>
          <Typography>{data.recoveries}</Typography>
          </div>
        </Paper>
        <Paper className={classes.tests} elevation={3}>
        <div>
            <Typography>Tests</Typography>
          </div>
          <div>
          <Typography>{data.tests}</Typography>
          </div>
        </Paper>
      </Paper>
      <Paper className={classes.chart} elevation={5}></Paper>
    </div>
  )
};

CovidUser.propTypes = {};

CovidUser.defaultProps = {};

export default CovidUser;
