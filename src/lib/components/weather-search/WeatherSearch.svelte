<!-- WeatherSearch Component -->
<script>
	import { onDestroy } from 'svelte';
	import SearchInput from './SearchInput.svelte';
	import SearchSuggestions from './SearchSuggestions.svelte';
	import SearchButton from './SearchButton.svelte';

	let { input = $bindable(), loading, onSearch } = $props();
	let suggestions = $state([]);
	let showSuggestions = $state(false);
	let selectedIndex = $state(-1); // No suggestion selected
	let loadingSuggestions = $state(false);
	let suggestionsError = $state('');
	let debounceTimer;

	const API_KEY = import.meta.env.VITE_API_KEY;

	async function fetchSuggestions() {
		if (input.trim().length < 2) {
			resetSuggestionState();
			return;
		}

		loadingSuggestions = true;
		suggestionsError = '';

		try {
			const response = await fetch(
				`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${input}`
			);
			if (!response.ok) throw new Error('Failed to fetch suggestions');

			const data = await response.json();
			suggestions = data.slice(0, 5); // Limit to 5 suggestions
			showSuggestions = true;
		} catch (err) {
			console.error('Error fetching suggestions:', err);
			suggestionsError = 'Failed to load suggestions';
			suggestions = [];
		} finally {
			loadingSuggestions = false;
		}
	}

	function resetSuggestionState() {
		suggestions = [];
		showSuggestions = false;
		loadingSuggestions = false;
		suggestionsError = '';
		selectedIndex = -1;
	}

	function handleInput() {
		selectedIndex = -1;
		// Clear any existing timer
		clearTimeout(debounceTimer);
		// Set new timer
		debounceTimer = setTimeout(() => {
			fetchSuggestions();
		}, 300); // 300ms delay
	}

	function handleSelectSuggestion(suggestion) {
		input = `${suggestion.name}, ${suggestion.country}`;
		resetSuggestionState();
		onSearch();
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (!loading && input.trim().length >= 2) {
			resetSuggestionState();
			onSearch();
		}
	}

	function handleKeydown(event) {
		if (!showSuggestions || suggestions.length === 0) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				selectedIndex = (selectedIndex + 1) % suggestions.length;
				break;
			case 'ArrowUp':
				event.preventDefault();
				selectedIndex = selectedIndex <= 0 ? suggestions.length - 1 : selectedIndex - 1;
				break;
			case 'Enter':
				if (selectedIndex >= 0) {
					event.preventDefault();
					handleSelectSuggestion(suggestions[selectedIndex]);
				}
				break;
			case 'Escape':
				event.preventDefault();
				resetSuggestionState();
				break;
		}
	}

	// Close suggestions when clicking outside
	function handleClickOutside(event) {
		if (!event.target.closest('.search-container')) {
			resetSuggestionState();
		}
	}

	// Cleanup debounce timer
	onDestroy(() => {
		clearTimeout(debounceTimer);
	});
</script>

<svelte:window onclick={handleClickOutside} />

<form onsubmit={handleSubmit} class="search-container relative text-right max-[1100px]:text-center">
	<div class="relative mb-4 flex flex-col items-end max-[1100px]:items-center">
		<SearchInput bind:input onInput={handleInput} onKeydown={handleKeydown} />

		{#if showSuggestions && (suggestions.length > 0 || loadingSuggestions || suggestionsError)}
			<SearchSuggestions
				{suggestions}
				{loadingSuggestions}
				{suggestionsError}
				{selectedIndex}
				onSelectSuggestion={handleSelectSuggestion}
			/>
		{/if}
	</div>

	<SearchButton disabled={loading || input.trim().length < 2} />
</form>
