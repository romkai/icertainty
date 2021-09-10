import VueStore from 'vue-class-store';
import { TvShow } from '@/classes/api/types/TvShowTypes';
import ABaseModel from '@/classes/models/ABaseModel';
import Api from '@/classes/api/Api';

@VueStore
export default class TvShowsModel extends ABaseModel<TvShow> {
	
	private api = Api.getInstance();
	
	public fetchItems(): void {
		
		this.loading = true;
		this.items = [];
		
		this.api.fetchTvShows()
			.then(items => this.items = items)
			.catch((err: Error) => console.log(err.message))
			.finally(() => this.loading = false);
		
	}
	
}

