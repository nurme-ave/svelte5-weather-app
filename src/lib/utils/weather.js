// Transforms API response into a cleaner format for our components
export function transformWeatherData(data) {
	return {
		city: data.location.name,
		country: data.location.country,
		tempC: data.current.temp_c,
		tempF: data.current.temp_f,
		condText: data.current.condition.text,
		condIcon: data.current.condition.icon,
		windMph: data.current.wind_mph,
		windKph: data.current.wind_kph,
		humidity: data.current.humidity
	};
}
