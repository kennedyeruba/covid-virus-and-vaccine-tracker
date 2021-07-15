import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TopBar from '../TopBar/TopBar';
import CovidView from '../Covid/CovidView/CovidView';

const useStyles = makeStyles(theme => (
  {
    root: {
      width: '100%',
      minHeight: '100vh',
    },
    content: {
      height: 'calc(100vh - 50px)',
    }
  }
))

const Dashboard = () => {
  const classes = useStyles();
  const [themeMode, setThemeMode] = useState("light");

  const handleThemeToggle = checked => {
    const themeType = checked ? "dark" : "light"
    setThemeMode(themeType)
  }

  const theme = createMuiTheme({
    palette:{
      type: themeMode
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root} style={{background: theme.palette.background.default}}>
        <TopBar themeToggle={handleThemeToggle}/>
        <div className={classes.content}>
         <Switch>
          <Route exact path="/">
            <CovidView />
          </Route>
            {/* <Route path="/vaccine">
                <VaccineView />
            </Route> */}
         </Switch>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Dashboard;
