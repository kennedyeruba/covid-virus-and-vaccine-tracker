import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

// import { DataGrid } from '@material-ui/data-grid';


const CovidTable = () => {
  const [covidTable, setCovidTable] = useState([]);

  useEffect(() => {
    const fetchAllCountriesData = async () => {
      try{
        const response = await fetch("https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries", {
          "method": "GET",
          "headers": {
            "x-rapidapi-key": "2b77998fcemsh394d28feaaeaeebp1e00b0jsn01de2fd7d8dc",
            "x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com"
          }
        })

        const data = await response.json();
        setCovidTable(data);
        console.log(data)
      }catch(err){
        console.log(`[GET TABLE ERROR]: ${err}`)
      }
    }

    fetchAllCountriesData();
  }, []);

  return (
    <div className="covid-table">
      
    </div>
  )
};

CovidTable.propTypes = {};

CovidTable.defaultProps = {};

export default CovidTable;
