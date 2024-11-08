<script>
	let { input = $bindable(), loading, onSearch } = $props();

	function handleSubmit(event) {
		event.preventDefault();
		if (!loading && input.trim().length >= 2) {
			onSearch();
		}
	}
</script>

<form onsubmit={handleSubmit} class="w-full text-right max-[1100px]:text-center">
	<div class="mb-4 w-full text-right text-white max-[1100px]:text-center">
		<input
			type="text"
			id="city-search"
			name="city"
			placeholder="City"
			bind:value={input}
			autocomplete="off"
			class="h-16 rounded-lg px-4 text-right text-[1.3rem] text-black outline-none
                   max-[1100px]:pr-0 max-[1100px]:text-center"
		/>
	</div>

	<button
		type="submit"
		disabled={loading || input.trim().length < 2}
		class="mb-4 rounded-lg bg-lime-500 px-3 py-2 text-[1.2rem] font-semibold uppercase text-black
             transition-colors duration-200 hover:bg-lime-400 active:bg-white disabled:cursor-not-allowed
             disabled:opacity-50"
	>
		Search
	</button>
</form>
