import type { API } from '../types/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url, setHeaders }) => {
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
	try {
		const url = `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}`;
		const response = await fetch(url, {
			cache: 'default'
		});

		if (!response.ok) {
			throw new Error(`Errorr ao buscar dados home, HTTP error: ${response.status}`);
		}

		const result = response.json() as Promise<API>;

		return result;
	} catch (error) {
		throw new Error(`Errorr ao buscar dados home`);
	}
};
