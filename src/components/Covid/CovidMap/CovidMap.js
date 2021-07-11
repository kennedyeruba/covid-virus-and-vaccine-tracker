import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles} from '@material-ui/styles';
import { Paper } from '@material-ui/core';

import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";

const useStyles = makeStyles({
  container: {
    width: '100%',
    minHeight: '400px',
    margin: '20px 0',
    borderRadius: '10px',
    padding: '10px',
  },
  'root': {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
  }
})


const CovidMap = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.container} elevation={5}>
      <Paper className={classes.root} variant='outlined'>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </Paper>
    </Paper>
  )
};

CovidMap.propTypes = {};

CovidMap.defaultProps = {};

export default CovidMap;
