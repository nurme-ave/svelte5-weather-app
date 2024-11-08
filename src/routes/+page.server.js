import { transformWeatherData } from '$lib/utils/weather';

export async function load({ fetch }) {
	const defaultCity = 'Tallinn';
	const API_KEY = import.meta.env.VITE_API_KEY;

	try {
		const response = await fetch(
			`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${defaultCity}&aqi=no`
		);

		if (!response.ok) {
			return {
				initialWeather: null,
				error: 'Failed to fetch initial weather data'
			};
		}

		const data = await response.json();
		return {
			initialWeather: transformWeatherData(data),
			error: null
		};
	} catch (err) {
		return {
			initialWeather: null,
			error: err.message || 'Failed to fetch initial weather data'
		};
	}
}
