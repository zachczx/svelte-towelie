<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();

	let status = $state(data.towelDirty ? data.towelDirty : -1);

	$inspect(status);
</script>

<div class="font-logo text-9xl"><a href="/">Towelie</a></div>

<div
	class={status < 2
		? 'text-lime-500'
		: status < 5
			? 'text-orange-400'
			: status < 8
				? 'text-orange-700'
				: status < 365
					? 'text-red-700'
					: 'text-base-content'}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="32"
		height="32"
		class="hugeicons:towels h-96 w-96"
		viewBox="0 0 24 24"
		><path
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="1.5"
			d="M6.5 5H15c1.886 0 2.828 0 3.414.586S19 7.114 19 9v3c0 1.886 0 2.828-.586 3.414S16.886 16 15 16h-3c-1.886 0-2.828 0-3.414-.586S8 13.886 8 12V8M6.5 5A1.5 1.5 0 0 0 5 6.5V8h3M6.5 5A1.5 1.5 0 0 1 8 6.5V8m9 8c0 1.886 0 2.828-.586 3.414S14.886 20 13 20H9c-1.886 0-2.828 0-3.414-.586S5 17.886 5 16v-5m17-7v1c0 .932 0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C20.398 8 19.932 8 19 8M2 4v1c0 .932 0 1.398.152 1.765a2 2 0 0 0 1.083 1.083C3.602 8 4.068 8 5 8"
			color="currentColor"
		/></svg
	>
</div>

<form method="POST" action="?/refresh" use:enhance>
	<button class="btn btn-xl btn-primary">I just washed!</button>
</form>

<div class="card bg-base-100 card-sm mt-16 w-96 shadow-sm">
	<div class="card-body">
		<h2 class="card-title">Last 5 Washes</h2>
		{#if data.towels.length > 0}
			{#each data.towels as towel}
				<li>{towel.createdAtFormatted}</li>
			{/each}
		{:else}
			No washes!
		{/if}
	</div>
</div>
