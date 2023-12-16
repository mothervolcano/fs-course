import axios from 'axios';

const api_key = import.meta.env.VITE_WEATHERAPI_KEY;
const baseUrl = 'http://api.weatherapi.com/v1';

const getWeatherDataFor = (location) => {

	console.log('API KEY: ', api_key);
	console.log('Weather in: ', location);
	const request = axios.get(`${baseUrl}/current.json?key=${api_key}&q=${location}`);
	return request.then( request => request.data );
}


export default { getWeatherDataFor }