<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import ProgressBar from '$lib/progressbar/ProgressBar.svelte';
	import BackButton from '$lib/icons/BackButton.svelte';
	import NextButton from '$lib/icons/NextButton.svelte';
	import ViewImage from '$lib/icons/ViewImage.svelte';
	import { pushState } from '$app/navigation';
	import Lightbox from '$lib/lightbox/Lightbox.svelte';
	import MatchMedia from "$lib/matchmedia/MatchMedia.svelte"

	export let data: PageData;
	let thisImage: HTMLImageElement;

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
	$: newDatasFiltered = data.artworks.data.filter((artwork) => (artwork.image_id ? true : false));

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

	function handleShowLightbox() {
		pushState('', {
			showLightbox: true
		});
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
			<button
				type="button"
				title="View Image"
				class="btnViewImage"
				class:hiddenBtnViewImage={artwork.image_id ? false : true}
				on:click={handleShowLightbox}
				on:keydown={(e) => {
					if (e.key === '') handleShowLightbox();
				}}
			>
				<span class="btnViewImageIcon">
					<ViewImage />
				</span>
				<span class="text">View Image</span>
			</button>
		</section>
		<section class="sectionAgent">
			<header
				class="sectionAgentHeader"
				class:NoPositionSectionAgentHeader={artwork.image_id ? false : true}
			>
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
		<section
			class="sectionArtwork"
			class:noPaddginSectionArtwork={artwork.description && (artwork.date_start || artwork.date_end)
				? false
				: true}
		>
			{#if artwork.date_start || artwork.date_end}
				<h3
					class="sectionArtworkDate"
					class:noPositionSectionArtworkDate={artwork.description ? false : true}
				>
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
					<MatchMedia mediaQuery="(min-width: 700px)">
						<BackButton slot="mobile" />
						<BackButton slot="desktop" size={25}/>
					</MatchMedia>
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
					<MatchMedia mediaQuery="(min-width: 700px)">
						<NextButton slot="mobile"/>
						<NextButton slot="desktop" size={25}/>
					</MatchMedia>
				</a>
			</div>
		</div>
	{/if}
</footer>
{#if $page.state.showLightbox && artwork && artwork.image_id}
	<MatchMedia mediaQuery="(min-width: 700px)">
		<Lightbox
			srcImage={`${data.artworks.config.iiif_url}/${artwork.image_id}/full/400,/0/default.jpg`}
			close={() => {
				history.back()
			}}
			slot="mobile"
		/>
		<Lightbox
			srcImage={`${data.artworks.config.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`}
			close={() => {
				history.back()
			}}
			slot="desktop"
		/>
	</MatchMedia>
{/if}

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

	.picture img {
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

	.hiddenBtnViewImage {
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
	}

	.sectionAgent {
		margin-bottom: 15px;
	}

	.sectionArtwork {
		position: relative;
		padding-top: 74px;
	}

	.noPaddginSectionArtwork {
		padding: 0;
	}

	.NoPositionSectionAgentHeader {
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

	.noPositionSectionArtworkDate {
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
		gap: 40px;
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

	.textMessage {
		font-weight: 700;
		font-size: 18px;
		color: var(--color01);
		text-align: center;
	}

	@media screen and (min-width: 700px) {
		main {
			padding: 0 40px 100px 40px;
			display: grid;
			grid-template-columns: minmax(min-content, 475px) minmax(min-content, 400px);
			grid-template-areas: 
				"a b"
				"c c";
			column-gap: 30px;
			row-gap: 64px;
			justify-content: center;
		}

		.sectionImage{
			grid-area: a;
			height: min-content;
		}

		.sectionAgent{
			grid-area: b;
			margin-bottom: 0;
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-between;
			gap: 10px;
			height: 100%;
		}

		.sectionArtwork{
			grid-area: c;
		}		

		.btnViewImage {
			bottom: 16px;
			top: auto;
			left: 16px;
		}

		.sectionAgentHeader {
			position: static;
			top: auto;
			max-width: 100%;
			max-height: 100%;
			width: 100%;
			left: auto;
			padding: 0;
			margin-bottom: 0;
			box-shadow: none;
		}

		.sectionAgentTitle {
			font-size: 56px;
			line-height: 64px;
			margin: 0 0 24px 0;
		}

		.sectionArtwork {
			position: relative;
			padding-top: 0;
			padding: 75px 0 0 115px; 
		}

		.sectionArtworkDate {
			line-height: 150px;
			font-size: 200px;
			font-weight: 700;
			top: 0;
			right: auto;
			left: 0;
		}

		.footerContainer {
			padding: 25px 41px 24px 41px;
		}

		.footerTitle {
			font-size: 18px;
			margin-bottom: 8px;
		}

		.footerSubtitle {
			font-size: 13px;
		}
	}

	@media screen and (min-width: 1300px) {
		main {
			padding: 35px 40px 175px 40px;
			grid-template-columns: minmax(min-content, 600px) minmax(min-content, 400px) 475px;
			grid-template-areas: "a b c";
			row-gap: auto;
		}

		.sectionArtwork {
			padding-top: 0;
			padding: 115px 0 0 0; 
		}

		.sectionAgentTitle {
			font-size: 25.5px;
			line-height: 33px;
		}

		.sectionArtworkDate {
			line-height: 150px;
			font-size: 150px;
		}
	}
</style>
