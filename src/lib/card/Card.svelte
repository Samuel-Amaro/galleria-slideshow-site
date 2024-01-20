<script lang="ts">
	export let titleArtwork: string | undefined;
	export let artistTitle: string | undefined;
	export let srcImageArtwork: string | undefined;
	export let href: string;
</script>

<article>
	<a
		{href}
		target="_self"
		rel="next"
		title="Ir para descrição detalhada da obra de arte {titleArtwork}"
		aria-label="Ir para descrição detalhada da obra de arte {titleArtwork}"
	>
		{#if srcImageArtwork}
			<img src={srcImageArtwork} alt="" />
      {:else}
        <p>Sem imagem para esta obra</p>
		{/if}
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

<style>
	article{
		position: relative;
	}

	a{
		display: block;
		text-decoration: none;
		width: 100%;
		height: 100%;
	}

	img{
		display: block;
		width: 100%;
	}

	.text{
		position: absolute;
		z-index: 1;
		bottom: 32px;
		left: 32px;
	}

	h1, h2{
		margin: 0;
	}

	h1{
		font-size: 24px;
		font-weight: 700;
		color: var(--color05);
		margin: 0 0 7px 0;
	}

	h2{
		font-size: 13px;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.7520);
	}
</style>