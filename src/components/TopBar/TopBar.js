import React, {useState, useEffect} from 'react';
import Switch from '@material-ui/core/Switch';
// import PropTypes from 'prop-types';
import '../../assets/css/TopBar.css';
import { makeStyles} from '@material-ui/core';
import { Typography, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.type === "light" ? theme.palette.primary.main : theme.palette.secondary.dark,
    color: "#fefefe",
    width: '100%',
    height: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    opacity: '0.9',
    '& > h5': {
      fontWeight: '600',
    }
  },
  theme_switcher: {
    width: '150px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:' 0 20px',
    borderRadius: '10px',
  }
}))

const TopBar = ({themeToggle}) => {
  // const theme = useTheme();
  const classes = useStyles();
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    themeToggle(checked)
  }, [checked])

  //Toggle state of switch
  const handleToggle = () => {
    setChecked(!checked);
    themeToggle(checked)
  }

  return (
    <Paper className={classes.root} square={true} elevation={3}>
      <Typography variant="h5">CVVT</Typography>
      <Paper className={classes.theme_switcher} elevation={3}>
        <p style={{filter: checked ? "grayscale(1)" : "grayscale(0)"}}>🌞</p>
        <Switch
          checked={checked}
          onChange={handleToggle}
          color="primary"
          name="checkedB"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <p style={{filter: checked ? "grayscale(0)" : "grayscale(1)"}}>🌜</p>
      </Paper>
    </Paper>
  )
};

TopBar.propTypes = {};

TopBar.defaultProps = {};

export default TopBar;
