<script lang="ts">
	import { enhance } from '$app/forms';
	import Red from '$lib/images/red.webp?w=600&enhanced';
	import Orange from '$lib/images/orange.webp?w=600&enhanced';
	import Yellow from '$lib/images/yellow.webp?w=600&enhanced';
	import Green from '$lib/images/green.webp?w=600&enhanced';

	let { data } = $props();

	let status = $derived.by(() => {
		if (!data.towelDirty) {
			return '';
		}
		return getValue(data.towelDirty);
	});
	let modal = $state() as HTMLDialogElement;

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
</script>

<div class="grid content-center justify-items-center gap-8 p-2 lg:grid-cols-2">
	<div class="grid content-center justify-items-center">
		{#if status === 'good'}
			<enhanced:img src={Green} alt="good" class="rounded-3xl" />
		{:else if status === 'hmmm'}
			<enhanced:img src={Yellow} alt="hmmm" class="rounded-3xl" />
		{:else if status === 'uhhh'}
			<enhanced:img src={Orange} alt="uhhh" class="rounded-3xl" />
		{:else}
			<enhanced:img src={Red} alt="yikes" class="rounded-3xl" />
		{/if}
	</div>
	<div class="grid content-center justify-items-center gap-8">
		<div class="font-logo text-center text-9xl lg:text-[10.5rem]"><a href="/">Towelie</a></div>

		<form method="POST" action="?/refresh" class="w-full" use:enhance>
			<button class="btn btn-xl btn-primary flex w-full items-center gap-2"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="1.3em"
					height="1.3em"
					class="material-symbols:refresh-rounded"
					viewBox="0 0 24 24"
					><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path
						fill="currentColor"
						d="M12 20q-3.35 0-5.675-2.325T4 12t2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V5q0-.425.288-.712T19 4t.713.288T20 5v5q0 .425-.288.713T19 11h-5q-.425 0-.712-.288T13 10t.288-.712T14 9h3.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12t1.75 4.25T12 18q1.7 0 3.113-.862t2.187-2.313q.2-.35.563-.487t.737-.013q.4.125.575.525t-.025.75q-1.025 2-2.925 3.2T12 20"
					/></svg
				>Washed!</button
			>
		</form>

		<div class="w-full">
			<div
				class="text-md border-base-content/5 bg-base-200/50 grid grid-cols-2 content-center gap-4 rounded-lg border shadow"
			>
				<div class="border-r-base-content/15 grid justify-items-center border-r p-4">
					<div>Status</div>
					<button
						class="flex min-h-20 cursor-pointer items-center gap-4 py-8 text-4xl font-semibold"
						onclick={() => modal.showModal()}
						>{#if status === 'good'}
							<div class="h-6 w-6 rounded-full bg-lime-400"></div>
							Good
						{:else if status === 'hmmm'}
							<div class="h-6 w-6 rounded-full bg-yellow-500"></div>
							Hmmm
						{:else if status === 'uhhh'}
							<div class="h-6 w-6 rounded-full bg-orange-400"></div>
							Uhhh
						{:else}
							<div class="h-6 w-6 rounded-full bg-red-700"></div>
							Yikes
						{/if}
					</button>
				</div>
				<div class="grid justify-items-center p-4">
					<div>Last Washed</div>
					<div class="text-center text-4xl font-semibold">
						{#if data.towels && data.towels.length > 0}
							{data.towels[0].createdAtSemantic}
						{:else}
							Nil
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<dialog bind:this={modal} class="modal">
	<div class="modal-box grid gap-8">
		<h3 class="text-4xl font-bold">More Details</h3>
		<div class="grid min-h-16 w-full grid-cols-4">
			<div
				class="flex items-center justify-center rounded-l-lg bg-lime-400 {status === 'good'
					? 'border-base-content border-4 font-bold'
					: undefined}"
			>
				Good
			</div>
			<div
				class="flex items-center justify-center bg-yellow-500 {status === 'hmmm'
					? 'border-base-content border-4 font-bold'
					: undefined}"
			>
				Hmmm
			</div>
			<div
				class="flex items-center justify-center bg-orange-400 {status === 'uhhh'
					? 'border-base-content border-4 font-bold'
					: undefined}"
			>
				Uhhh
			</div>
			<div
				class="flex items-center justify-center rounded-r-lg bg-red-700 {status === 'yikes'
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
					<li class="ms-1">{towel.createdAtSemantic} ({towel.createdAtFormatted})</li>
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
