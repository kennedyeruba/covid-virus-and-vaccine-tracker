import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import CovidChart from '../CovidChart/CovidChart';

const usestyles = makeStyles(theme => (
  {
    root: {
      height: '90vh',
      width: '280px',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: 'fit-content',
        marginTop: '20px',
        padding: '5px',
      }
    },
    country: {
      height: 'fit-content',
      width: '100%',
      borderRadius: '10px',
      padding: '10px',
      [theme.breakpoints.down('sm')]: {
        padding: '10px',
      }
    },
    info: {
      width: '100%',
      height: '70px',
      borderRadius: '10px',
      marginBottom: '10px',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
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
      padding: '20px 10px',
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
      borderRadius: '10px',
      marginTop: '10px',
      padding: '10px',
      '& > .graph': {
        height: '150px',
        width: '100%',
        borderRadius: '10px'
      }
    },
    text: {
      textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
    }
  }
))

const CovidUser = ({ data }) => {
  const classes = usestyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.country} elevation={5}>
        <Paper className={classes.info} elevation={3}>
          <div className={classes.info_left}>
            <Typography className={classes.text} variant="subtitle1" noWrap>
              {data.country}
            </Typography>
            <Typography className={classes.text} variant="subtitle2">
              {data.continent}
            </Typography>
          </div>
          <img src={data.flag} alt="" />
        </Paper>
        <Paper className={classes.population} elevation={3}>
          <div>
            <Typography className={classes.text}  variant="subtitle2">Population</Typography>
          </div>
          <div>
          <Typography className={classes.text}  variant="subtitle2">{data.population}</Typography>
          </div>
        </Paper>
        <Paper className={classes.cases} elevation={3}>
        <div>
            <Typography className={classes.text} variant="subtitle2">Cases</Typography>
          </div>
          <div>
            <Typography className={classes.text} variant="subtitle2">{data.cases}</Typography>
            <Typography className={classes.text} variant="caption" align="right">+{data.new_cases} new</Typography>
          </div>
        </Paper>
        <Paper className={classes.deaths} elevation={3}>
        <div>
            <Typography className={classes.text} variant="subtitle2">Deaths</Typography>
          </div>
          <div>
            <Typography className={classes.text} variant="subtitle2">{data.deaths}</Typography>
            <Typography className={classes.text} variant="caption">+{data.new_deaths} new</Typography>
          </div>
        </Paper>
        <Paper className={classes.recoveries} elevation={3}>
        <div>
            <Typography className={classes.text} variant="subtitle2">Recoveries</Typography>
          </div>
          <div>
            <Typography className={classes.text} variant="subtitle2">{data.recoveries}</Typography>
            <Typography className={classes.text} variant="caption" align="right">+{data.new_recoveries} new</Typography>
          </div>
        </Paper>
        <Paper className={classes.tests} elevation={3}>
          <div>
            <Typography className={classes.text} variant="subtitle2">Tests</Typography>
          </div>
          <div>
            <Typography className={classes.text} variant="subtitle2">{data.tests}</Typography>
          </div>
        </Paper>
        <Paper className={classes.chart} elevation={5}>
          <CovidChart countryIso={data.iso2}/>
        </Paper>
      </Paper>
    </div>
  )
};

export default CovidUser;
