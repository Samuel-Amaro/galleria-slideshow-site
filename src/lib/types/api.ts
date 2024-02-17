export interface API {
	pagination: Pagination;
	data: Data[];
	config: {
		iiif_url: string;
	};
}

export type Pagination = {
	total: number;
	limit: number;
	offset: number;
	total_pages: number;
	current_page: number;
	next_url: string;
};

export type Data = {
	id: number;
	title: string;
	thumbnail: {
		lqip: string;
		width: number;
		height: number;
		alt_text: string;
	};
	date_start: number;
	date_end: number;
	description: string;
	artist_id: number;
	artist_title: string;
	image_id: string;
	term_titles: string[];
};
