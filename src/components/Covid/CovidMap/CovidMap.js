import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles} from '@material-ui/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    width: '100%',
    minHeight: '400px',
    margin: '20px 0',
    borderRadius: '10px',
    padding: '10px',
  }
})


const CovidMap = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.container} elevation={5}>
      <div className="root"></div>
    </Paper>
  )
};

CovidMap.propTypes = {};

CovidMap.defaultProps = {};

export default CovidMap;
