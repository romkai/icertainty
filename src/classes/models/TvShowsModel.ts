import VueStore from 'vue-class-store';
import { api } from '@/classes/api/Api';
import { TvShow } from '@/classes/api/types/TvShowTypes';
import ABaseModel from '@/classes/models/ABaseModel';

@VueStore
export default class TvShowsModel extends ABaseModel<TvShow> {
	
	public fetchItems(): void {
		
		this.loading = true;
		this.items = [];
		
		api.fetchTvShows()
			.then(items => this.items = items)
			.catch((err: Error) => console.log(err.message))
			.finally(() => this.loading = false);
		
	}
	
}

