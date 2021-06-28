import React, {useState, useEffect} from 'react';
import Switch from '@material-ui/core/Switch';
// import PropTypes from 'prop-types';
import '../../assets/css/TopBar.css';
import { makeStyles, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.type === "light" ? theme.palette.primary.main : theme.palette.secondary.dark,
    color: "#fefefe",
    border: `10px solid theme.palette.divider !important`
  }
}))

const TopBar = ({themeToggle}) => {
  const theme = useTheme();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    themeToggle(checked)
  }, [checked])

  //Toggle state of switch
  const handleToggle = () => {
    setChecked(!checked);
    themeToggle(checked)
  }

  //Using created styles
  const classes = useStyles();

  return (
    <div className={`top-bar ${classes.root}`}>
      <h1>CVVT</h1>
      <div className="theme-switcher">
        <p style={{filter: checked ? "grayscale(1)" : "grayscale(0)"}}>🌞</p>
        <Switch
          checked={checked}
          onChange={handleToggle}
          color="primary"
          name="checkedB"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <p style={{filter: checked ? "grayscale(0)" : "grayscale(1)"}}>🌜</p>
      </div>
    </div>
  )
};

TopBar.propTypes = {};

TopBar.defaultProps = {};

export default TopBar;
