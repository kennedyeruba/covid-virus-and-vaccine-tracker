import React from 'react';
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
  return (
    <div className={classes.root}>
      <CovidUser />
      <CovidWorld />
      <CovidList />
    </div>
  )
};

CovidView.propTypes = {};

CovidView.defaultProps = {};

export default CovidView;
