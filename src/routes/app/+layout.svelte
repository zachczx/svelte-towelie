<script lang="ts">
	let { children, data } = $props();
</script>

<div class="grid min-h-dvh w-full grid-rows-[auto_1fr] p-2">
	<div class="text-end">
		{data.user.email}&nbsp;&nbsp;|&nbsp;&nbsp;<a href="/logout" class="hover:text-primary underline"
			>Logout</a
		>
	</div>
	<div class="grid content-center justify-items-center">{@render children()}</div>
</div>
