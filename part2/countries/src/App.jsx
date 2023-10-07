import './index.css'

import { useState, useEffect } from 'react';

import countriesApi from './services/countries';
import weatherApi from './services/weather';



// --------------------------------------
// AUX COMPONENTS


const Search = (props) => {
  
  const { onSearchInput } = props;

  const [ searchTerm, setSearchTerm ] = useState('');

  const handleInput = (event) => {

    setSearchTerm( event.target.value );
    onSearchInput(event.target.value);
  }

  return (

    <div>
      
      Find Countries <input value={searchTerm} onChange={handleInput} />

    </div>
  )

};


const ListItem = (props) => {

  const { name, onShow } = props;

  const handleClick = (event) => {

    onShow(event.target.value);
  }

  return (

    <li>
      
      {name}&nbsp;<button value={name} onClick={handleClick}>show</button>

    </li>
  )
};


const DisplayList = (props) => {

  const { items, onShow } = props;

  return (

    <ul>

      { items.map( (n) => <ListItem key={n.cca2} name={n.name.common} onShow={onShow}/> ) }

    </ul>
  )

};


const CountryInfo = (props) => {

  const { data } = props;

  return (

    <div>
      <h3>{data.name.common}</h3>
      <div style={{display: 'flex'}} ><div>Capital:&nbsp;</div><div>{data.capital[0]}</div></div>
      <div style={{display: 'flex'}} ><div>Area:&nbsp;</div><div>{data.area}</div></div>
      <h4>Languages</h4>
      <ul>
        { Object.keys(data.languages).map( code => <li key={code}>{data.languages[code]}</li> ) }
      </ul>
      <img src={data.flags.png} alt={data.flags.alt}/>
    </div>
  )
};


const WeatherReport = (props) => {

  const { data } = props;

  console.log('Weather data: ', data);

  return (

    <div>
      <img src={data.current.condition.icon} alt={data.current.condition.text}/>
      <h4>Temperature:</h4>
      <p>{data.current.temp_c}&nbsp;c</p>
      <h4>Wind:</h4>
      <p>{data.current.wind_kph}&nbsp;km/h</p>

    </div>

  )
}



// --------------------------------------
// MAIN COMPONENT

const App = () => {

  // ------------------------------------
  // STATES

  const [ countryList, setCountryList ] = useState([]);
  const [ countryDisplayList, setCountryDisplayList ] = useState([]);
  const [ countryInfo, setCountryInfo ] = useState(null);
  const [ weatherInfo, setWeatherInfo ] = useState(null);


  // ------------------------------------
  // HOOKS

  useEffect( () => {

    countriesApi.getAll()
    .then( data => {

      console.log('Country Request fulfilled: ', data);

      setCountryList(data);

    });

  }, []);


  useEffect( () => {

    if ( countryInfo ) {

      weatherApi.getWeatherDataFor(countryInfo.capital[0])
      .then( data => {

        console.log('Weather Request fulfilled: ', data);

        setWeatherInfo(data);

      });    
    }

  }, [countryInfo]);


  // ------------------------------------
  // HANDLERS


  const handleSearchInput = (searchTerm) => {

    console.log('Search Term: ', searchTerm );

    setCountryInfo(null);

    if ( searchTerm ) {

      const matchingCountries = countryList.filter( n => n.name.common.includes(searchTerm) );

      if ( matchingCountries.length > 1 ) {

        setCountryDisplayList( matchingCountries );

      } else if ( matchingCountries.length === 1 ) {

        setCountryInfo(matchingCountries[0]);

      } else {

        console.log('No countries found with: ', searchTerm);
      }

    } else {

      setCountryDisplayList([]);
    }
  }

  const showCountryInfo = (name) => {

    console.log('! Show info for: ', name);

    let countryData = '';

    countriesApi.getCountry(name)
    .then( data => {

      console.log('Request fulfilled: ', data );

      countryData = data;

      setCountryInfo( countryData );

    })
    .catch( error => {

      console.log('! Unable to retrieve data for ', name, error);

    });
  }


  return (
    
    <div>

      <Search onSearchInput={handleSearchInput} />
      <div>

        {
          countryInfo ? 
          (<CountryInfo data={countryInfo} />) :
          (<DisplayList items={countryDisplayList} onShow={showCountryInfo}/>)
        }

      </div>

      <div>

        {
          countryInfo && weatherInfo && ( 
            <> 
              <h3>Weather for {countryInfo.capital[0]}</h3> 
              <WeatherReport data={weatherInfo} /> 
            </> 
          )
        }

      </div>

    </div>
  )
}

export default App
