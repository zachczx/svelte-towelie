<script lang="ts">
	import { enhance } from '$app/forms';
	//@ts-ignore
	import Red from '$lib/images/red.webp?enhanced&w=600';
	//@ts-ignore
	import Orange from '$lib/images/orange.webp?enhanced&w=600';
	//@ts-ignore
	import Yellow from '$lib/images/yellow.webp?enhanced&w=600';
	//@ts-ignore
	import Green from '$lib/images/green.webp?enhanced&w=600';

	let { data } = $props();

	let status = $state(data.towelDirty ? data.towelDirty : -1);
	let modal = $state() as HTMLDialogElement;
	let color = $derived.by(() => {
		let color;
		color = getColor(getValue(status));
		return color;
	});

	type description = 'good' | 'hmmm' | 'uhhh' | 'yikes' | '';

	function getValue(val: number): description {
		const day = 24;

		if (val > 0 && val <= 2 * day) return 'good';

		if (val > 2 * day && val <= 4 * day) return 'hmmm';

		if (val > 4 * day && val <= 6 * day) return 'uhhh';

		if (val > 6 * day && val <= 999 * day) return 'yikes';

		return '';
	}

	function getColor(strDes: string): string {
		if (strDes === 'good') return 'text-lime-400';

		if (strDes === 'hmmm') return 'text-yellow-500';

		if (strDes === 'uhhh') return 'text-orange-400';

		if (strDes === 'yikes') return 'text-red-700';

		return 'base-content';
	}

	$inspect(color);
</script>

<div class="grid content-center justify-items-center gap-8 lg:grid-cols-2">
	<div class="grid content-center justify-items-center">
		{#if getValue(status) === 'good'}
			<enhanced:img src={Green} alt="good" class="rounded-3xl" />
		{:else if getValue(status) === 'hmmm'}
			<enhanced:img src={Yellow} alt="hmmm" class="rounded-3xl" />
		{:else if getValue(status) === 'uhhh'}
			<enhanced:img src={Orange} alt="uhhh" class="rounded-3xl" />
		{:else}
			<enhanced:img src={Red} alt="yikes" class="rounded-3xl" />
		{/if}
	</div>
	<div class="grid content-center justify-items-center gap-8">
		<div class="font-logo text-center text-9xl lg:text-[10.5rem]"><a href="/">Towelie</a></div>

		<form method="POST" action="?/refresh" class="w-full" use:enhance>
			<button class="btn btn-xl btn-primary w-full">Washed!</button>
		</form>

		<div class="text-md flex w-full items-center justify-start gap-4">
			Status:

			<div class="flex items-center gap-2">
				{#if getValue(status) === 'good'}
					<div class="h-4 w-4 rounded-full bg-lime-400"></div>
				{:else if getValue(status) === 'hmmm'}
					<div class="h-4 w-4 rounded-full bg-yellow-500"></div>
				{:else if getValue(status) === 'uhhh'}
					<div class="h-4 w-4 rounded-full bg-orange-400"></div>
				{:else}
					<div class="h-4 w-4 rounded-full bg-red-700"></div>
				{/if}

				<button class="cursor-pointer text-sm" onclick={() => modal.showModal()}>(see more)</button>
			</div>
		</div>
	</div>
</div>

<dialog bind:this={modal} class="modal">
	<div class="modal-box grid gap-8">
		<h3 class="text-4xl font-bold">More Details</h3>
		<div class="grid min-h-16 w-full grid-cols-4">
			<div
				class="flex items-center justify-center rounded-l-lg bg-lime-400 {getValue(status) ===
				'good'
					? 'border-base-content border-4 font-bold'
					: undefined}"
			>
				Good
			</div>
			<div
				class="flex items-center justify-center bg-yellow-500 {getValue(status) === 'hmmm'
					? 'border-base-content border-4 font-bold'
					: undefined}"
			>
				Hmmm
			</div>
			<div
				class="flex items-center justify-center bg-orange-400 {getValue(status) === 'uhhh'
					? 'border-base-content border-4 font-bold'
					: undefined}"
			>
				Uhhh
			</div>
			<div
				class="flex items-center justify-center rounded-r-lg bg-red-700 {getValue(status) ===
				'yikes'
					? 'border-base-content border-4 font-bold'
					: undefined}"
			>
				Yikes
			</div>
		</div>

		<div class="w-full text-sm">
			<h2 class="mb-2 text-lg font-semibold">Last 5 Washes</h2>
			{#if data.towels.length > 0}
				{#each data.towels as towel}
					<li class="ms-1">{towel.createdAtFormatted}</li>
				{/each}
			{:else}
				No washes!
			{/if}
		</div>
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
