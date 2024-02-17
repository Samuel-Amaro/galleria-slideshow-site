<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import ProgressBar from '$lib/progressbar/ProgressBar.svelte';
	import BackButton from '$lib/icons/BackButton.svelte';
	import NextButton from '$lib/icons/NextButton.svelte';
	import ViewImage from '$lib/icons/ViewImage.svelte';

	export let data: PageData;
	let thisImage: HTMLImageElement;

	//TODO: CONSTRUIR LIGHTBOX DE VIEW IMAGE
	//TODO: E ARRUMAR UM BOX PARA CARD QUE NÃO HA IMAGENS COLOCAR UMA MENSAGEM NO IMAGE CUSTOMIZADO

	$: pageParam = $page.url.searchParams.get('page')
		? isNaN(parseInt($page.url.searchParams.get('page') as string))
			? 1
			: parseInt($page.url.searchParams.get('page') as string)
		: 1;
	$: limitParam = $page.url.searchParams.get('limit')
		? isNaN(parseInt($page.url.searchParams.get('limit') as string))
			? 15
			: Math.abs(parseInt($page.url.searchParams.get('limit') as string)) > 0 &&
				  Math.abs(parseInt($page.url.searchParams.get('limit') as string)) < 15
				? 15
				: Math.abs(parseInt($page.url.searchParams.get('limit') as string))
		: 15;

	function getData(id: number) {
		const indexArtwork = data.artworks.data.findIndex((art) => art.id === id);
		return indexArtwork >= 0 ? data.artworks.data[indexArtwork] : null;
	}

	$: artwork = getData(parseInt($page.params.id));
	$: newDatasFiltered = data.artworks.data.filter((artwork) => artwork.image_id ? true : false)

	function nextIdSlide(idxCurrent: number) {
		if (idxCurrent < newDatasFiltered.length - 1) {
			return newDatasFiltered[idxCurrent + 1].id;
		}
		return newDatasFiltered[0].id;
	}

	function previousIdSlide(idxCurrent: number) {
		if (idxCurrent > 0) {
			return newDatasFiltered[idxCurrent - 1].id;
		}
		return newDatasFiltered[newDatasFiltered.length - 1].id;
	}
</script>

<main>
	{#if artwork}
		<section class="sectionImage">
			<picture class="picture">
				{#if artwork.image_id}
						<source
							srcset={`${data.artworks.config.iiif_url}/${artwork.image_id}/full/400,/0/default.jpg`}
							media="(max-width: 400px)"
							type="image/jpeg"
						/>
						<source
							srcset={`${data.artworks.config.iiif_url}/${artwork.image_id}/full/600,/0/default.jpg`}
							media="(min-width: 400px)"
							type="image/jpeg"
						/>
						<img
							src={`${data.artworks.config.iiif_url}/${artwork.image_id}/full/400,/0/default.jpg`}
							alt=""
							loading="eager"
							bind:this={thisImage}
						/>
				{/if}
			</picture>
			<button type="button" title="View Image" class="btnViewImage" class:hiddenBtnViewImage={artwork.image_id ? false : true}>
				<span class="btnViewImageIcon">
					<ViewImage />
				</span>
				<span class="text">View Image</span>
			</button>
		</section>
		<section class="sectionAgent">
			<header class="sectionAgentHeader" class:NoPositionSectionAgentHeader={artwork.image_id ? false : true}>
				{#if artwork.title}
					<h1 class="sectionAgentTitle">{artwork.title}</h1>
				{/if}
				{#if artwork.artist_title}
					<h2 class="sectionAgentSubtitle">{artwork.artist_title}</h2>
				{/if}
			</header>
			{#if artwork.term_titles}
				<ul class="sectionAgentListTerms">
					{#each artwork.term_titles as titleItem}
						<li class="sectionAgentListItem">{titleItem}</li>
					{/each}
				</ul>
			{/if}
		</section>
		<section class="sectionArtwork" class:noPaddginSectionArtwork={artwork.description && (artwork.date_start || artwork.date_end) ? false : true}>
			{#if artwork.date_start || artwork.date_end}
				<h3 class="sectionArtworkDate" class:noPositionSectionArtworkDate={artwork.description ? false : true}>
					{artwork.date_start || artwork.date_end}
				</h3>
			{/if}
			{#if artwork.description}
				<article class="sectionArtworkDescription">
					{@html artwork.description}
				</article>
			{/if}
		</section>
	{:else}
		<p class="textMessage">Não encontramos nenhuma obra de arte...</p>
	{/if}
</main>
<footer class="footer">
	{#if artwork}
		<ProgressBar
			min={1}
			max={data.artworks.data.length}
			value={data.artworks.data.indexOf(artwork) + 1}
		/>
		<div class="footerContainer">
			<div class="footerText">
				{#if artwork.title}
					<h4 class="footerTitle">{artwork.title}</h4>
				{/if}
				{#if artwork.artist_title}
					<h5 class="footerSubtitle">{artwork.artist_title}</h5>
				{/if}
			</div>
			<div class="footerButtons">
				<a
					href={`/detail/${previousIdSlide(
						newDatasFiltered.indexOf(artwork)
					)}?page=${pageParam}&limit=${limitParam}`}
					target="_self"
					rel="next"
					title="Back Slide"
					aria-label="Back Slide"
					class="footerButton"
				>
					<BackButton />
				</a>
				<a
					href={`/detail/${nextIdSlide(
						newDatasFiltered.indexOf(artwork)
					)}?page=${pageParam}&limit=${limitParam}`}
					target="_self"
					rel="next"
					title="Next Slide"
					aria-label="Next Slide"
					class="footerButton"
				>
					<NextButton />
				</a>
			</div>
		</div>
	{/if}
</footer>
<style>
	main {
		padding: 24px 24px 100px 23px;
		background-color: var(--color05);
	}

	.picture {
		display: block;
	}

	.picture img,
	.picture source {
		display: block;
		max-width: 100%;
		box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
	}

	.picture img{
		min-width: 327px;
		min-height: 280px;
	}

	.sectionImage {
		position: relative;
	}

	.btnViewImageIcon {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.btnViewImage {
		position: absolute;
		box-sizing: border-box;
		font-family: inherit;
		appearance: none;
		border: none;
		top: 16px;
		left: 16px;
		background-color: rgba(0, 0, 0, 0.75);
		padding: 14px 16px 13px 16px;
		display: flex;
		align-items: center;
		gap: 14px;
		cursor: pointer;
		box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
	}

	.btnViewImage .text {
		color: var(--color05);
		font-size: 10px;
		letter-spacing: 2.14px;
		font-weight: 700;
		text-transform: uppercase;
	}

	.btnViewImage:is(:hover, :focus) {
		background-color: rgba(256, 256, 256, 0.25);
	}

	.hiddenBtnViewImage{
		display: none;
	}

	.sectionAgentHeader {
		padding: 24px;
		max-width: 280px;
		background-color: var(--color05);
		box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
		position: relative;
		top: -50px;
	}

	.sectionAgentTitle {
		font-size: 24px;
		line-height: 29px;
		font-weight: 700;
		color: var(--color01);
		margin: 0 0 8px 0;
	}

	.sectionAgentSubtitle {
		font-size: 15px;
		font-weight: 400;
		color: var(--color02);
	}

	.sectionAgentListTerms {
		list-style: none;
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		gap: 10px;
	}

	.sectionAgentListItem {
		font-size: 14px;
		font-weight: 700;
		color: var(--color05);
		background-color: var(--color01);
		padding: 5px 10px;
		border-radius: 4px;
		white-space: nowrap;
	}

	.sectionAgent {
		margin-bottom: 15px;
	}

	.sectionArtwork {
		position: relative;
		padding-top: 74px;
	}

	.noPaddginSectionArtwork{
		padding: 0;
	}

	.NoPositionSectionAgentHeader{
		position: static;
		margin-bottom: 15px;
	}

	.sectionArtworkDate {
		line-height: 100px;
		font-size: 100px;
		font-weight: 700;
		color: var(--color04);
		position: absolute;
		top: 0;
		right: 0;
		z-index: 0;
	}

	.noPositionSectionArtworkDate{
		position: static;
	}

	.sectionArtworkDescription {
		line-height: 28px;
		font-size: 14px;
		font-weight: 700;
		color: var(--color02);
		position: relative;
		z-index: 1;
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: var(--color05);
		z-index: 2;
	}

	.footerContainer {
		padding: 17px 24px 16px 24px;
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
	}

	.footerTitle {
		font-size: 14px;
		font-weight: 700;
		color: var(--color01);
		margin-bottom: 9px;
	}

	.footerSubtitle {
		font-size: 10px;
		font-weight: 400;
		color: rgba(0, 0, 0, 0.75);
	}

	.footerButtons {
		display: flex;
		gap: 23px;
	}

	.footerButton {
		text-decoration: none;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color01);
		fill: var(--color01);
	}

	.footerButton:hover,
	.footerButton:focus {
		color: #ababab;
		fill: #ababab;
		stroke: #ababab;
	}

	.textMessage{
		font-weight: 700;
		font-size: 18px;
		color: var(--color01);
		text-align: center;
	}
</style>
