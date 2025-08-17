<script lang="ts">
	import ArkToaster from '$lib/ui/ArkToaster.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<ArkToaster />
{@render children()}
