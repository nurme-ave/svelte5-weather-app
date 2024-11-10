<!-- SearchSuggestion Component -->
<script>
	import { fade, slide } from 'svelte/transition';

	let {
		suggestions = [],
		loadingSuggestions = false,
		suggestionsError = '',
		selectedIndex = -1,
		onSelectSuggestion
	} = $props();
</script>

<div
	class="absolute top-[68px] z-10 w-full max-w-[320px] overflow-hidden rounded-lg bg-white shadow-lg"
	transition:slide|local={{ duration: 200 }}
>
	{#if loadingSuggestions}
		<div class="px-4 py-3 text-center text-gray-500" transition:fade|local={{ duration: 200 }}>
			Loading suggestions...
		</div>
	{:else if suggestionsError}
		<div class="px-4 py-3 text-center text-red-500" transition:fade|local={{ duration: 200 }}>
			{suggestionsError}
		</div>
	{:else}
		{#each suggestions as suggestion, i}
			<button
				type="button"
				class="w-full px-4 py-3 text-left text-black transition-colors
duration-150 hover:bg-blue-100
{selectedIndex === i ? 'bg-blue-200' : ''}"
				onclick={() => onSelectSuggestion(suggestion)}
				transition:fade|local={{ duration: 200, delay: i * 50 }}
			>
				<span class="font-medium">{suggestion.name}</span>
				<span class="text-sm text-gray-500">, {suggestion.country}</span>
				{#if suggestion.region}
					<span class="text-sm text-gray-400"> ({suggestion.region})</span>
				{/if}
			</button>
		{/each}
	{/if}
</div>
