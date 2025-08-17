<script lang="ts">
	import Red from '$lib/images/red.webp?w=600&enhanced';
	import Orange from '$lib/images/orange.webp?w=600&enhanced';
	import Yellow from '$lib/images/yellow.webp?w=600&enhanced';
	import Green from '$lib/images/green.webp?w=600&enhanced';
	import { onMount } from 'svelte';
	import { pb } from '$lib/pb';
	import { goto } from '$app/navigation';
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import timezone from 'dayjs/plugin/timezone';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import { addToast } from '$lib/ui/ArkToaster.svelte';
	import PageWrapper from '$lib/PageWrapper.svelte';

	dayjs.extend(relativeTime);
	dayjs.extend(utc);
	dayjs.extend(timezone);

	let results: TowelDB[] | undefined = $state([]);
	let towelDirty: number | undefined = $derived.by(() => {
		let towelDirty;
		if (results && results.length > 0) {
			const lastWashDate = dayjs(results[0].time);
			const today = dayjs();
			/**
			 * https://stackoverflow.com/questions/36560806/the-left-hand-side-of-an-arithmetic-operation-must-be-of-type-any-number-or
			 */
			towelDirty = today.diff(lastWashDate, 'hours', true);
			return towelDirty;
		}
	});
	let spinner = $state(false);

	onMount(async () => {
		if (!pb.authStore.isValid) {
			goto('/login');
		}

		if (pb.authStore.isValid) {
			results = await pb.collection('towel').getFullList({
				sort: '-time'
			});
		}
	});

	let status = $derived.by(() => {
		if (!towelDirty) {
			return '';
		}
		return getValue(towelDirty);
	});

	let modal = $state() as HTMLDialogElement;

	type description = 'clean' | 'hmmm' | 'uhhh' | 'yikes' | '';

	function getValue(val: number): description {
		const day = 24;

		if (val > 0 && val <= 2 * day) return 'clean';

		if (val > 2 * day && val <= 4 * day) return 'hmmm';

		if (val > 4 * day && val <= 6 * day) return 'uhhh';

		if (val > 6 * day && val <= 999 * day) return 'yikes';

		return '';
	}

	function getColor(strDes: string): string {
		if (strDes === 'clean') return 'text-lime-400';

		if (strDes === 'hmmm') return 'text-yellow-500';

		if (strDes === 'uhhh') return 'text-orange-400';

		if (strDes === 'yikes') return 'text-red-700';

		return 'base-content';
	}

	async function addHandler() {
		const result = await pb.collection('towel').create({
			user: pb.authStore.record?.id,
			time: dayjs.tz(new Date(), 'Asia/Singapore')
		});

		if (result.id) {
			addToast('success', 'Added successfully!');
			spinner = false;
		}

		results = await pb.collection('towel').getFullList({
			sort: '-time'
		});
	}
</script>

<PageWrapper title="Towel Logs" {pb}>
	<div class="grid max-w-[1200px] content-center justify-items-center gap-8 p-2 lg:grid-cols-2">
		<div class="grid content-center justify-items-center">
			{#key results}
				{#if status === 'clean'}
					<enhanced:img src={Green} alt="clean" class="rounded-3xl" />
				{:else if status === 'hmmm'}
					<enhanced:img src={Yellow} alt="hmmm" class="rounded-3xl" />
				{:else if status === 'uhhh'}
					<enhanced:img src={Orange} alt="uhhh" class="rounded-3xl" />
				{:else}
					<enhanced:img src={Red} alt="yikes" class="rounded-3xl" />
				{/if}
			{/key}
		</div>
		<div class="grid w-full content-center justify-items-center gap-8">
			<div class="font-logo text-center text-9xl lg:text-[10.5rem]">Towelie</div>

			<form class="w-full">
				<button class="btn btn-xl btn-primary flex w-full items-center gap-2" onclick={addHandler}
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
					>Reset Wash Timer</button
				>
			</form>

			<div class="w-full">
				<div
					class="text-md border-base-content/5 bg-base-200/50 grid grid-cols-2 content-center gap-4 rounded-lg border shadow"
				>
					<div class="border-r-base-content/15 grid justify-items-center border-r p-4">
						<div>Status</div>
						{#key results}
							<button
								class="flex min-h-20 cursor-pointer items-center gap-4 py-8 text-2xl font-bold"
								onclick={() => modal.showModal()}
								>{#if status === 'clean'}
									<div class="h-6 w-6 rounded-full bg-lime-400"></div>
									Clean
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
						{/key}
					</div>
					<div class="grid justify-items-center p-4">
						<div>Last Washed</div>
						<div class="text-center text-2xl font-bold">
							{#key results}
								{#if results && results.length > 0}
									{@const formatted = dayjs(results[0].time).fromNow()}
									{formatted}
								{:else}
									Nil
								{/if}
							{/key}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</PageWrapper>

<dialog bind:this={modal} class="modal">
	<div class="modal-box grid gap-8">
		<h3 class="text-4xl font-bold">More Details</h3>
		<div class="grid min-h-16 w-full grid-cols-4">
			<div
				class="flex items-center justify-center rounded-l-lg bg-lime-400 {status === 'clean'
					? 'border-base-content border-4 font-bold'
					: undefined}"
			>
				Clean
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
			{#if results && results.length > 0}
				{#each results as towel}
					{@const formatted = dayjs(towel.time).format('DD MMM, h:mma')}
					{@const semantic = dayjs(towel.time).fromNow()}
					<li class="ms-1">{semantic} ({formatted})</li>
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
