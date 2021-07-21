import React, { useState, useEffect } from 'react';
import { TextField, Paper, makeStyles } from '@material-ui/core';
import { DeleteSweepRounded } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '70px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 15px',
  },
  clearBtn: {
    width: '40px',
    height: '40px',
    marginLeft: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'pointer',
    }
  }
})


const CovidListSearch = ({handleChange}) => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');

  const handleTextChange = e => setSearchText(e.target.value);

  const clearField = () => setSearchText('');

  useEffect(() => {
    handleChange(searchText)
  }, [searchText])

  return (
    <Paper className={classes.root} elevation={3}>
        <TextField 
          size="small" 
          label="search" 
          variant="outlined"
          autoFocus={false}
          value={searchText}
          onChange={handleTextChange}  
        />
        <Paper className={classes.clearBtn} onClick={clearField} elevation={3}>
          <DeleteSweepRounded />
        </Paper>
      </Paper>
  )
}

export default CovidListSearch;
