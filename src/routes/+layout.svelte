<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<main class="grid min-h-dvh content-center justify-items-center gap-8">
	{@render children()}
</main>
