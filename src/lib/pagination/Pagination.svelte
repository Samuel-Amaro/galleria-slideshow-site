<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let totalPages: number;
	export let currentPage: number;

	let limit = $page.url.searchParams.get('limit')
		? isNaN(parseInt($page.url.searchParams.get('limit') as string))
			? 15
			: parseInt($page.url.searchParams.get('limit') as string)
		: 15;

	const maxVisiblePages = 5;
	const pagesToShowOnSides = 4;

	function handleChangeSelect(
		e: Event & {
			currentTarget: EventTarget & HTMLSelectElement;
		}
	) {
		$page.url.searchParams.set('limit', limit.toString());

		goto(`${$page.url.pathname}?${$page.url.searchParams.toString()}`, {
			noScroll: false
		});
	}

	function getVisiblePageNumbers() {
		const start = Math.max(0, currentPage - pagesToShowOnSides);
		const end = Math.min(totalPages - 1, currentPage + pagesToShowOnSides);

		const visiblePages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

		if (visiblePages[0] !== 0) {
			visiblePages.unshift(0);
		}

		if (visiblePages[visiblePages.length - 1] !== totalPages - 1) {
			visiblePages.push(totalPages - 1);
		}

		return visiblePages;
	}
</script>


<nav aria-label="pagination">
	<ul>
		{#each getVisiblePageNumbers() as pageNumber (pageNumber)}
			<li>
				<a
					href="/?page={pageNumber + 1}&limit={limit}"
					aria-label="Página {pageNumber + 1}"
					aria-current={pageNumber + 1 === currentPage ? true : false}
					rel="next"
					target="_self">{pageNumber + 1}</a
				>
			</li>
		{/each}
		<li>
			<select id="limits" bind:value={limit} on:change={(e) => handleChangeSelect(e)} aria-label="Limite de obras por página" title="Limite de obras por página">
				<option value={15}>15</option>
				<option value={30}>30</option>
				<option value={50}>50</option>
				<option value={80}>80</option>
				<option value={100}>100</option>
			</select>
		</li>
	</ul>
</nav>

<style>
	ul {
		list-style: none;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}

	a {
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		font-weight: 700;
		border: 1px solid var(--color01);
		color: var(--color02);
		border-radius: 4px;
		width: max-content;
		min-width: 30px;
		min-height: 30px;
		padding: 7px;
	}

	a:hover,
	a:focus {
		color: var(--color01);
	}

	select {
		display: block;
		font-family: inherit;
		font-size: 14px;
		margin: 0;
		box-sizing: border-box;
		padding: 2px;
		color: var(--color02);
		border-radius: 5px;
		box-shadow: inset 1px 1px 3px #ccc;
	}
</style>
