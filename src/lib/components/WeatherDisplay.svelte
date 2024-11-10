<script>
	let { weatherData, loading } = $props();
</script>

<div class="text-right font-medium max-[1100px]:text-center">
	<h2 class="mb-4 text-[2rem] max-[768px]:text-[1.5rem]">
		Current weather for
		<span class="-mt-1 block text-lime-500 md:-mt-2">
			{weatherData.city}, {weatherData.country}
		</span>
	</h2>

	<div class="opacity-90">
		<div
			class="mb-2 flex items-center justify-end gap-2 text-[1.8rem]
    max-[1100px]:justify-center max-[768px]:text-[1.3rem]"
		>
			<p>{weatherData.condText}</p>
			<img src={weatherData.condIcon} alt="weather-icon" class="h-16 w-16" />
		</div>

		<p class="mb-2 text-lime-500">
			<span class="text-[3rem] max-[768px]:text-[2.5rem]">{weatherData.tempC}</span>
			<span class="ml-1 font-sans text-[1.6rem] max-[768px]:text-[1.1rem]">℃</span>
			<span class="mx-2 text-[1.4rem] max-[768px]:text-base">/</span>
			<span class="text-[3rem] max-[768px]:text-[2.5rem]">{weatherData.tempF}</span>
			<span class="ml-1 font-sans text-[1.6rem] max-[768px]:text-[1.1rem]">℉</span>
		</p>

		<p class="text-[1.6rem] max-[768px]:text-[1.1rem]">
			<span class="text-[1.3rem] max-[768px]:text-base">Wind speed: </span>
			{weatherData.windKph} kmh
			<span class="mx-2 text-base max-[768px]:text-[0.8rem]">/</span>
			{weatherData.windMph} mph
		</p>

		<p class="text-[1.6rem] max-[768px]:text-[1.1rem]">
			<span class="text-[1.3rem] max-[768px]:text-base">Humidity: </span>
			{weatherData.humidity}%
		</p>

		<p class="mt-12 opacity-80">
			Powered by{' '}
			<a
				href="https://www.weatherapi.com/"
				title="Free Weather API"
				class="text-white transition-colors duration-200 hover:text-lime-500"
			>
				WeatherAPI.com
			</a>
		</p>
	</div>
</div>
