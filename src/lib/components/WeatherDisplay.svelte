<script>
	let { weatherData } = $props();
</script>

<div class="font-medium">
	<div class="w-full text-center lg:text-right">
		<h2 class="mb-4 text-3xl">
			Current weather for
			<span class="block text-lime-500">
				{weatherData.city}, {weatherData.country}
			</span>
		</h2>

		<div class="opacity-90">
			<div class="mb-2 flex items-center justify-center gap-2 text-3xl lg:justify-end lg:text-xl">
				<p>{weatherData.condText}</p>
				<img src={weatherData.condIcon} alt="weather-icon" />
			</div>

			<p class="mb-2">
				<span class="text-3xl lg:text-4xl">{weatherData.tempC}</span>
				<span class="ml-1 font-sans text-base lg:text-lg">℃</span>
				<span class="mx-0.5 text-xl lg:text-base">/</span>
				<span class="text-3xl lg:text-4xl">{weatherData.tempF}</span>
				<span class="ml-1 font-sans text-base lg:text-lg">℉</span>
			</p>

			<p class="text-lg lg:text-xl">
				<span class="text-base lg:text-lg">Wind speed: </span>
				{weatherData.windKph} kmh
				<span class="mx-0.5">/</span>
				{weatherData.windMph} mph
			</p>

			<p class="text-lg lg:text-xl">
				<span class="text-base lg:text-lg">Humidity: </span>
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
</div>
