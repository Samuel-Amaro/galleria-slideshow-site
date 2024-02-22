<script lang="ts">
	import Card from '$lib/card/Card.svelte';
	import Pagination from '$lib/pagination/Pagination.svelte';
	import { page } from '$app/stores';
	import SkeletonHome from '$lib/skeletonhome/SkeletonHome.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	async function getDatas() {
		return data;
	}

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
</script>

{#await getDatas()}
	<SkeletonHome />
{:then result}
	{@const datasFiltered = result.artworks.data.filter((artwork) =>
		artwork.image_id ? true : false
	)}
	<main>
		{#if datasFiltered.length > 0}
			{#each datasFiltered as artwork}
				<Card
					titleArtwork={artwork.title}
					artistTitle={artwork.artist_title}
					srcImageArtwork={artwork.image_id
						? `${result.artworks.config.iiif_url}/${artwork.image_id}/full/400,/0/default.jpg`
						: undefined}
					href={`/detail/${artwork.id}?page=${pageParam}&limit=${limitParam}`}
				/>
			{/each}
		{:else}
			<h4 role="alert">No artworks to view in page</h4>
		{/if}
	</main>
	<footer>
		<Pagination
			totalPages={result.artworks.pagination.total_pages}
			currentPage={result.artworks.pagination.current_page}
		/>
	</footer>
{:catch error}
	<h4 role="alert">Error ao carregar na home {error}</h4>
{/await}

<style>
	main {
		-webkit-column-width: 324px;
		-moz-column-width: 324px;
		column-width: 324px;
		-webkit-column-gap: 23px;
		-moz-column-gap: 23px;
		column-gap: 23px;
		padding: 0 24px 128px 24px;
	}

	:global(article:not(:last-child)) {
		margin: 0 0 24px 0;
	}

	h4 {
		color: var(--color01);
		font-size: 28px;
		text-align: center;
		margin: 20px 0;
	}

	footer {
		background-color: var(--color05);
		position: fixed;
		bottom: 0;
		z-index: 2;
		width: 100%;
		padding: 12px;
		box-shadow: inset 1px 1px 3px #ccc;
	}


	@media screen and (min-width: 650px) {
		main {
			padding: 0 40px 128px 40px;
			column-gap: 40px;
			row-gap: 40px;
		}
	}

	@media screen and (min-width: 1300px) {
		main {
			-webkit-column-width: 310px;
			-moz-column-width: 310px;
			column-width: 310px;
			-webkit-column-gap: 40px;
			-moz-column-gap: 40px;
			column-gap: 40px;
			padding: 0 40px 128px 40px;
		}

		:global(article:not(:last-child)) {
			margin: 0 0 40px 0;
		}
	}
</style>
