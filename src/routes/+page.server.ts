import type { API } from '../types/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({url}) => {
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

	return {
		results: getArtworks(page, limit)
	}
};

async function getArtworks(page: number, limit: number) {
	const BASE_URL = `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}`;

	try {
		const response = await fetch(BASE_URL, {
			cache: 'default'
		});

		if (!response.ok) {
			throw new Error(`Error ao buscar dados home, HTTP error: ${response.status}`);
		}

		return await response.json() as Promise<API>
	} catch (error) {
		throw new Error(`Error ao buscar dados home`);
	}
}