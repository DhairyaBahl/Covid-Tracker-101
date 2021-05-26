import './App.css';
import {useState,useEffect} from 'react';
import {MenuItem,FormControl,Select,Card, CardContent} from "@material-ui/core";
import InfoBox from './InfoBox.js';
import Map from './Map';
import Table from './Table';
import {sortData} from './util.js';
import LineGraph from './LineGraph.js';

function App() {
  // countries is for the list of all the countries
  const [countries,setCountries] = useState([]);

  // to keep track of the current country
  const [country,setCountry] = useState('worldwide');

  // new state for country info
  const [countryInfo,setCountryInfo] = useState({});

  // new state for the table and table data
  const [tableData,setTableData] = useState([]);

  const [casesType, setCasesType] = useState("cases");
  

  useEffect(()=>{
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
        const countries = data.map((country)=>(
          {
            name : country.country,
            value: country.countryInfo.iso2
          }
        ));
        const sortedData = sortData(data);
        setCountries(countries);
        setTableData(sortedData);
      })
    }
    getCountriesData();
  },[])

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response=>response.json())
    .then(data=>{
      setCountryInfo(data);
      setCountry("worldwide");
    })
  },[])

  // using async for the API call
  const onCountryChange = async (event) => {
    const countryCode = event.target.value ;  
    
    //  for world wide statistics https://disease.sh/v3/covid-19/all

    // https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]

    const url = countryCode ==="worldwide" ? 
              `https://disease.sh/v3/covid-19/all`:
              `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
        setCountry(countryCode);
        setCountryInfo(data);
    });

    console.log(countryInfo);

  }

  return (
    <div className="App">
    
    <div className="app_left">
      {/*Header */}
      <div className="app_header">
        <h1 style={{color:"red"}}>COVID-19 Tracker ❤🔥</h1>
        {/*Select input drop down field */}
        <FormControl className="app_dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {
              countries.map(country=>(
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>

      <div className="app_stats">
      
      {/*Info Boxes corona virus cases */}
      <InfoBox title="Coronavirus cases" cases={countryInfo.todayCases} total={2000} />

      {/*info Boxes corona virus recovery */}
      <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={3000} />

      {/*info Boxes Deaths  */}
      <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={4000} />

      </div>

      {/*Map */}
      <Map />
      </div>

      <Card className="app_right">
        <CardContent>

          {/*Table */}
          <h3>Live Cases by countries</h3>
          <Table countries={tableData} />
          
          {/*Graph */}
          <br/><br/><br/><br/>
          <h3>Worldwide new cases</h3>
          <LineGraph casesType={casesType} />  

        </CardContent>
      </Card>

    </div>
  );
}

export default App;
