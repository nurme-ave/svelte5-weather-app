<!-- SearchButton Component -->
<script>
	let { disabled } = $props();
</script>

<button
	type="submit"
	{disabled}
	class="mb-4 rounded-lg bg-lime-500 px-6 py-3 text-[1.2rem] font-semibold uppercase
text-black transition-all duration-200 hover:bg-lime-600
focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50 disabled:opacity-50"
>
	Search
</button>
