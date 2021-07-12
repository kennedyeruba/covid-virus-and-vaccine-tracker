import React from 'react';
import { makeStyles} from '@material-ui/styles';
import { Paper } from '@material-ui/core';
import { MapContainer, TileLayer } from "react-leaflet";
import { showDataOnMap } from '../../../misc/utility';

const useStyles = makeStyles({
  root: {
    width: '100%',
    minHeight: '400px',
    margin: '20px 0',
    borderRadius: '10px',
    padding: '10px',
  },
  container: {
    width: '700px',
    height: '380px',
    borderRadius: '10px',
    '& > .leaflet-container': {
      width: '700px',
      height: '100%',
      borderRadius: '10px'
  }
  },
})


const CovidMap = ({ center, zoom, countries, displayType}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={5}>
      <Paper className={classes.container} variant='outlined'>
          <MapContainer center={center} zoom={zoom}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {showDataOnMap(countries, displayType)}
          </MapContainer>
      </Paper>
    </Paper>
  )
}

export default CovidMap;
