import React, {useState, useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import '../../assets/css/Dashboard.css';

import Navigation from '../Navigation/Navigation';
import TopBar from '../TopBar/TopBar';
import CovidView from '../Covid/CovidView/CovidView';
import VaccineView from '../Vaccine/VaccineView/VaccineView';

const Dashboard = () => {
  const [themeMode, setThemeMode] = useState("light");

  const handleThemeToggle = checked => {
    const themeType = checked ? "dark" : "light"
    setThemeMode(themeType)
    console.log(themeType)
  }

  const theme = createMuiTheme({
    palette:{
      type: themeMode
    }
  })

  useEffect(() => {
    console.log(themeMode)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className="dashboard" style={{background: theme.palette.background.default}}>
        <TopBar themeToggle={handleThemeToggle}/>
        <div className="content">
        <Navigation />
         <Switch>
           <Route exact path="/">
             <Redirect to="/covid"/>
           </Route>
          <Route path="/covid">
                <CovidView />
            </Route>
            <Route path="/vaccine">
                <VaccineView />
            </Route>
         </Switch>
        </div>
      </div>
    </ThemeProvider>
  )
};

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
