import { transformWeatherData } from '$lib/utils/weather';

// Handles server-side data loading
export async function load({ fetch }) {
	const defaultCity = 'Tallinn';
	const API_KEY = import.meta.env.VITE_API_KEY;

	// Fetches initial weather data for Tallinn
	// This runs on the server before the page is sent to the client
	// Provides better SEO and initial page load performance
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
