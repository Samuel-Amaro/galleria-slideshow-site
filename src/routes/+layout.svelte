<script lang="ts">
	import '../styles/index.css';
	import type { LayoutData } from './$types';
	import MatchMedia from '$lib/matchmedia/MatchMedia.svelte';
	import Galleria from '$lib/icons/Galleria.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	export let data: LayoutData;
</script>

<header>
	<a
		href={`/${browser ? window.location.search : '?page=1&limit=15'}`}
		title="Home"
		target="_self"
		rel="next"
		aria-current={$page.url.pathname === '/'}
		class="logo"
	>
		<MatchMedia mediaQuery="(min-width: 1300px)">
			<Galleria slot="mobile" layout="mobile" />
			<Galleria slot="desktop" layout="desktop" />
		</MatchMedia>
	</a>
	<a
		href={$page.url.pathname === '/'
			? `/detail/${data.artworks.data[0].id}${
					browser ? window.location.search : '?page=1&limit=15'
				}`
			: `/${browser ? window.location.search : '?page=1&limit=15'}`}
		title=""
		target="_self"
		rel="next"
		class="slide"
	>
		{$page.url.pathname === '/' ? 'START SLIDESHOW' : 'STOP SLIDESHOW'}
	</a>
</header>
<hr />
<slot />

<style>
	header {
		padding: 24px 24px 23px 24px;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
	}

	hr {
		display: block;
		border: 0;
		height: 1px;
		background-color: var(--color03);
		margin: 0 0 23px 0;
	}

	.logo,
	.slide {
		text-decoration: none;
	}

	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.slide {
		font-size: 9px;
		letter-spacing: 1.93px;
		color: var(--color02);
		white-space: nowrap;
		font-weight: 700;
	}

	.slide:is(:hover, :focus) {
		color: var(--color01);
	}

	@media screen and (min-width: 650px) {
		header {
			padding: 29px 40px;
		}

		hr {
			margin: 0 0 38px 0;
		}

		.slide {
			font-size: 12px;
			letter-spacing: 2.57px;
		}
	}

	@media screen and (min-width: 1300px) {
		header {
			padding: 40px;
		}

		hr {
			margin: 0 40px 40px 40px;
		}
	}
</style>
