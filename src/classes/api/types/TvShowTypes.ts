export interface TvShow {
	id: number;
	url: string;
	genres: string[];
	name: string;
	type: string;
	language: string;
	status: string;
	runtime: number;
	averageRuntime: number;
	premiered: string;
	officialSite: string;
	summary: string;
	image: {
		medium: string;
	};
	rating: {
		average: number;
	},
	network: {
		country: {
			name: string;
		}
	}
}
