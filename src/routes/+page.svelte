<script>
	import { onMount } from 'svelte';
	import { transformWeatherData } from '$lib/utils/weather';
	import WeatherSearch from '$lib/components/WeatherSearch.svelte';
	import WeatherDisplay from '$lib/components/WeatherDisplay.svelte';

	const API_KEY = import.meta.env.VITE_API_KEY;

	let { data } = $props();

	let input = $state('Tallinn');
	let loading = $state(false);
	let error = $state(data.error || '');
	let weatherData = $state(
		data.initialWeather || {
			city: '',
			country: '',
			tempC: '',
			tempF: '',
			condText: '',
			condIcon: '',
			windMph: '',
			windKph: '',
			humidity: ''
		}
	);

	$effect(() => {
		if (weatherData.city) {
			document.title = `Weather in ${weatherData.city} - Weather App`;
		}
	});

	async function fetchWeatherData() {
		loading = true;
		error = '';

		try {
			const response = await fetch(
				`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${input}&aqi=no`
			);

			if (!response.ok) {
				throw new Error('City not found');
			}

			const data = await response.json();
			weatherData = transformWeatherData(data);
		} catch (err) {
			error = err.message || 'Failed to fetch weather data';
		} finally {
			loading = false;
		}
	}

	// Only fetch new data on mount if we don't have initial data
	onMount(() => {
		if (!data.initialWeather) {
			fetchWeatherData();
		}
	});
</script>

<div
	class="h-screen overflow-hidden bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat text-white"
>
	<div
		class="flex h-screen overflow-hidden flex-col items-center justify-center gap-10 bg-black/70 px-4 py-0
           lg:w-1/2 lg:items-end lg:px-20"
	>
		<WeatherSearch bind:input {loading} onSearch={fetchWeatherData} />

		{#if error}
			<div class="rounded-lg bg-red-500/80 p-4 text-center lg:text-right">
				{error}
			</div>
		{/if}

		{#if loading}
			<div class="text-center lg:text-right">
				<div
					class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
				></div>
			</div>
		{:else}
			<WeatherDisplay {weatherData} />
		{/if}
	</div>
</div>
