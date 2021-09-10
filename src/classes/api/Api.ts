import axios from 'axios';
import { TvShow } from '@/classes/api/types/TvShowTypes';

const URL = 'https://api.tvmaze.com/shows?page=1';

export default class Api {
	
	private static instance: Api|null = null;
	
	private constructor() {
		//
	}
	
	public static getInstance() {
		if (Api.instance === null) {
			Api.instance = new Api();
		}
		return Api.instance;
	}
	
	public fetchTvShows(): Promise<TvShow[]> {
		return axios.get<TvShow[]>(URL)
			.then(response => response.data)
	}
}



