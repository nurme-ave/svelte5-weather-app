<script>
  let { input = $bindable(), onInput, onKeydown } = $props();
</script>

<input
  type="text"
  id="city-search"
  name="city"
  placeholder="City"
  bind:value={input}
  oninput={onInput}
  onkeydown={onKeydown}
  autocomplete="off"
  class="h-16 w-full max-w-[320px] rounded-lg px-4 text-right text-[1.3rem] text-black outline-none
transition-all duration-200 focus:ring-2 focus:ring-lime-500
focus:ring-opacity-50 max-[1100px]:text-center"
/>
