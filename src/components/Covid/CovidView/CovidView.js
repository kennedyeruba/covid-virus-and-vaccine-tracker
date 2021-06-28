import React from 'react';
import PropTypes from 'prop-types';

import CovidTable from '../CovidTable/CovidTable';

import "../../../assets/css/CovidView.css";


const CovidView = () => (
  <div className="covid-view">
    <CovidTable />
  </div>
);

CovidView.propTypes = {};

CovidView.defaultProps = {};

export default CovidView;
