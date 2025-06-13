<script lang="ts">
	let { children, data } = $props();
</script>

<div class="grid w-full grid-rows-[auto_1fr]">
	<div class="p-2 text-end">
		{data.user.email}&nbsp;&nbsp;|&nbsp;&nbsp;<a href="/logout" class="hover:text-primary underline"
			>Logout</a
		>
	</div>
	<div class="screen-less-topbar grid content-center justify-items-center">
		{@render children()}
	</div>
</div>

<style>
	.screen-less-topbar {
		min-height: calc(100vh - 2.5rem);
	}
</style>
