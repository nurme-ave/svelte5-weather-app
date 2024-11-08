<script>
	let { input = $bindable(), loading, onSearch } = $props();

	function handleSubmit(event) {
		event.preventDefault();
		if (!loading && input.trim().length >= 2) {
			onSearch();
		}
	}
</script>

<form onsubmit={handleSubmit} class="flex flex-col gap-4 text-center lg:text-right">
	<input
		type="text"
		id="city-search"
		name="city"
		placeholder="City"
		bind:value={input}
		autocomplete="off"
		class="h-16 rounded-lg px-4 text-center text-lg text-black outline-none lg:text-right"
	/>

	<div class="flex justify-center lg:justify-end">
		<button
			type="submit"
			disabled={loading || input.trim().length < 2}
			class="rounded-lg bg-lime-500 px-6 py-3 text-lg font-semibold uppercase text-black
             transition-colors duration-200 hover:bg-lime-400 disabled:cursor-not-allowed disabled:opacity-50"
		>
			Search
		</button>
	</div>
</form>
