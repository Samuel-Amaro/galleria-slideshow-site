<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	export let titleArtwork: string | undefined;
	export let artistTitle: string | undefined;
	export let srcImageArtwork: string | undefined;
	export let href: string;
</script>

{#if srcImageArtwork}
	<article in:fly={{ delay: 100, y: 0 }} out:fly={{ y: 0 }}>
		<a
			{href}
			target="_self"
			rel="next"
			title="Ir para descrição detalhada da obra de arte {titleArtwork}"
			aria-label="Ir para descrição detalhada da obra de arte {titleArtwork}"
		>
			<img src={srcImageArtwork} alt="" in:fade|local />
			<div class="text">
				{#if titleArtwork}
					<h1>{titleArtwork}</h1>
				{/if}
				{#if artistTitle}
					<h2>{artistTitle}</h2>
				{/if}
			</div>
		</a>
	</article>
{/if}

<style>
	article {
		position: relative;
	}

	a {
		display: block;
		text-decoration: none;
		width: 100%;
		height: 100%;
	}

	img {
		display: block;
		width: 100%;
	}

	.text {
		position: absolute;
		z-index: 1;
		bottom: 32px;
		left: 32px;
		right: 32px;
	}

	h1,
	h2 {
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	h1 {
		font-size: 24px;
		font-weight: 700;
		color: var(--color05);
		margin: 0 0 7px 0;
	}

	h2 {
		font-size: 13px;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.752);
	}
</style>
