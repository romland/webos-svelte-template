<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { WEBOS } from "./store.js";

	const ttl = 2000;
	let hide = true;

	onMount(async () => {
		setTimeout(() => {
			// If we are on a TV, fade out.
			if(WEBOS) {
				hide = true;
			}
		}, ttl);

		hide = false;
	})

	function close()
	{
		if(WEBOS) {
			// If we are on a TV, close the browser when we exit
			window.close();
		}
	}

	function getTime()
	{
		return new Date().toLocaleTimeString('en-US', { minute: 'numeric', hour: 'numeric', hour12: false });
	}
</script>

	<div class="screen">
		{#if !hide}
			<div class="bottomRight">
				<h1 in:fly="{{ x: 600, duration: 300 }}" out:fade on:outroend={()=>close()}>
					{getTime()}
				</h1>
			</div>
		{/if}
	</div>

<style>
	.screen {
		position: absolute;
		height: 100%;
		width: 100%;
		overflow: hidden;
		color: #ddd;
	}
/*
	.topLeft {
		position: absolute;
		top: 0;
		left: 0;
		vertical-align: top;
		text-align: left;
		padding-left: 20px;
	}

	.topRight {
		position: absolute;
		top: 0;
		right: 0;
		vertical-align: top;
		text-align: right;
		padding-right: 20px;
	}

	.bottomLeft {
		position: absolute;
		bottom: 0;
		left: 0;
		vertical-align: bottom;
		text-align: left;
		padding-left: 20px;
	}
*/
	.bottomRight {
		position: absolute;
		bottom: 0;
		right: 0;
		vertical-align: bottom;
		text-align: right;
		padding-right: 20px;
	}

	h1 {
		font-size: 15vh;
		text-shadow: 5px 5px #333;
		margin: 0;
		padding: 0;
	}
</style>
