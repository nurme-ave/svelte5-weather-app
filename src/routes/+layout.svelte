<!-- Layout -->
<script>
  import '../app.css';
  let { children, data } = $props();

  let title = $derived(
    data.initialWeather?.city
      ? `Weather in ${data.initialWeather.city} - Weather App`
      : 'Weather App - Real-time Weather Conditions'
  );
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

{@render children?.()}
