import axios from 'axios';
import { TvShow } from '@/classes/api/types/TvShowTypes';

const URL = 'http://api.tvmaze.com/shows?page=1';

class Api {
	public fetchTvShows(): Promise<TvShow[]> {
		return axios.get<TvShow[]>(URL)
			.then(response => response.data)
	}
}

export const api = new Api();


