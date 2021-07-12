import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import '../../../assets/css/CovidTable.css';

const useStyles = makeStyles({
  root: {
    width: '100%',
    borderTop: '1px solid rgba(255,255,255,0.01)',
    borderRadius: '10px'
  },
  container: {
    maxHeight: 440,
    '&::-webkit-scrollbar': {
      height: '10px'
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(0,0,0,0.5)',
      borderRadius: '5px',
    },
    '&::-webkit-scrollbar-track': {
      width: '5px',
      background: 'rgba(0,0,0,0.3)',
    }
  },
  table_header:{
    textTransform: 'uppercase',
    fontWeight: '800'
  },
  head_text: {
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    fontWeight: '500',
    fontSize: '.8rem'
  },
  text: {
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    fontWeight: '500',
  }
});

const CovidTable = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [covidTable, setCovidTable] = useState([]);

  const columns = [
    { 
      id: 'flag', 
      label: '#', 
      align: 'center', 
      minWidth: 70 
    },
    { 
      id: 'country', 
      label: 'Country', 
      minWidth: 70 
    },
    {
      id: 'active_cases',
      label: 'Active\u00a0Cases',
      minWidth: 70,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'total_cases',
      label: 'Total\u00a0Cases',
      minWidth: 70,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'new_cases',
      label: 'New\u00a0Cases',
      minWidth: 70,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'serious_critical',
      label: 'Serious\u00a0Critical',
      minWidth: 70,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'infection_risk',
      label: 'Infection\u00a0Risk',
      minWidth: 70,
      align: 'right'
    },
    {
      id: 'total_recoveries',
      label: 'Total\u00a0Recoveries',
      minWidth: 70,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'new_recoveries',
      label: 'New\u00a0Recoveries',
      minWidth: 70,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'recovery_proportion',
      label: 'Recovery\u00a0Proportion',
      minWidth: 70,
      align: 'right'
    },
    {
      id: 'total_deaths',
      label: 'Total\u00a0Deaths',
      minWidth: 70,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'new_deaths',
      label: 'New\u00a0Deaths',
      minWidth: 70,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'case_fatality_rate',
      label: 'Fatality\u00a0Rate',
      minWidth: 70,
      align: 'right'
    },
    {
      id: 'total_tests',
      label: 'Total\u00a0Tests',
      minWidth: 70,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'test_percentage',
      label: 'Test\u00a0Percentage',
      minWidth: 70,
      align: 'right'
    },
    {
      id: 'population',
      label: 'Population',
      minWidth: 70,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

  const rows = [...covidTable];

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
        const newData = [];
        data.forEach((item, index) => {
          item["Flag"] = `https://www.countryflags.io/${item.TwoLetterSymbol}/shiny/32.png`;
          item["Infection_Risk"] += "%";
          item["Recovery_Proporation"] += "%";
          item["Case_Fatality_Rate"] += "%";
          item["Test_Percentage"] += "%";

          newData.push({
            id: ++index,
            flag: item["Flag"],
            country: item["Country"],
            active_cases: item["ActiveCases"],
            total_cases: item["TotalCases"],
            new_cases: item["NewCases"],
            serious_critical: item["Serious_Critical"],
            infection_risk: item["Infection_Risk"],
            total_recoveries: item["TotalRecovered"],
            new_recoveries: item["NewRecovered"],
            recovery_proportion: item["Recovery_Proporation"],
            total_deaths: item["TotalDeaths"],
            new_deaths: item["NewDeaths"],
            case_fatality_rate: item["Case_Fatality_Rate"],
            total_tests: item["TotalTests"],
            test_percentage: item["Test_Percentage"],
            population: item["Population"]
          })
        })
        setCovidTable(newData);
      }catch(err){
        console.log(`[GET TABLE ERROR]: ${err}`)
      }
    }

    fetchAllCountriesData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = e => {
    console.log(e.target)
  }

  return (
    <Paper elevation={5} className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className={classes.table_header}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={classes.head_text}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow onClick={handleClick} hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell className={classes.text} key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value.charAt(5) === ":" ? <img src={value} alt={value}/> : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default CovidTable;
