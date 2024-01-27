<script lang="ts">
	import Card from '$lib/card/Card.svelte';
	import Galleria from '$lib/icons/Galleria.svelte';
	import MatchMedia from '$lib/matchmedia/MatchMedia.svelte';
	import Pagination from '$lib/pagination/Pagination.svelte';
	import SkeletonHome from '$lib/skeletonhome/SkeletonHome.svelte';
	import { artworksStore } from '$lib/stores/data-store';
	import type { PageData } from './$types';

	export let data: PageData;

	$: if (data) {
		(async () => {
			try {
				const results = await data.results;
				artworksStore.set(results.data);
			} catch (error) {
				throw new Error('Error ao carregar dados!!');
			}
		})();
	}
</script>

<header>
	<MatchMedia mediaQuery="(min-width: 700px)">
		<Galleria slot="mobile" layout="mobile" />
		<Galleria slot="desktop" layout="desktop" />
	</MatchMedia>
</header>
<hr />
{#await data.results}
	<SkeletonHome />
{:then results}
	<main>
		{#each results.data as artwork}
			<Card
				titleArtwork={artwork.title}
				artistTitle={artwork.artist_title}
				srcImageArtwork={artwork.image_id
					? `${results.config.iiif_url}/${artwork.image_id}/full/400,/0/default.jpg`
					: undefined}
				href={'#'}
			/>
		{/each}
	</main>
	<footer>
		<Pagination
			totalPages={results.pagination.total_pages}
			currentPage={results.pagination.current_page}
		/>
	</footer>
{:catch error}
	<p role="alert">Houve um erro ao carregar obras de arte: {error.message}</p>
{/await}

<style>
	header {
		padding: 24px 24px 23px 24px;
	}

	hr {
		display: block;
		border: 0;
		height: 1px;
		background-color: var(--color03);
		margin: 0 0 23px 0;
	}

	main {
		-webkit-column-width: 324px;
		-moz-column-width: 324px;
		column-width: 324px;
		-webkit-column-gap: 23px;
		-moz-column-gap: 23px;
		column-gap: 23px;
	}

	main,
	footer {
		padding: 0 24px 24px 24px;
	}

	:global(article:not(:last-child)) {
		margin: 0 0 24px 0;
	}
</style>
