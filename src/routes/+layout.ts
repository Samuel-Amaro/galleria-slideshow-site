import type { API } from '$lib/types/api';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url, fetch }) => {
	const page = url.searchParams.get('page')
		? isNaN(parseInt(url.searchParams.get('page') as string))
			? 1
			: parseInt(url.searchParams.get('page') as string)
		: 1;
	const limit = url.searchParams.get('limit')
		? isNaN(parseInt(url.searchParams.get('limit') as string))
			? 15
			: Math.abs(parseInt(url.searchParams.get('limit') as string)) > 0 &&
				  Math.abs(parseInt(url.searchParams.get('limit') as string)) < 15
				? 15
				: Math.abs(parseInt(url.searchParams.get('limit') as string))
		: 15;

	const BASE_URL = `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}`;

	try {
		const response = await fetch(BASE_URL);

		if (!response.ok) {
			throw new Error(`Error ao buscar dados layout, HTTP error: ${response.status}`);
		}

		const result = (await response.json()) as Promise<API>;

		return {
			artworks: await result
		};
	} catch (error) {
		throw new Error(`Error ao buscar dados layout`);
	}
};
