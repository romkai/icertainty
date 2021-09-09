const PAGE_SIZE = 50;

export default abstract class ABaseModel<T> {
	
	private allItems: T[] = [];
	private pageSize = PAGE_SIZE;
	
	public page = 1;
	public loading = false;
	
	get items(): T[] {
		const pageStart = (this.page - 1) * this.pageSize;
		const pageStop = this.page * this.pageSize;
		return this.allItems.slice(pageStart, pageStop);
	}
	
	set items(items: T[]) {
		this.allItems = items;
	}
	
	public setPageSize(size: number): void {
		this.pageSize = size;
		this.page = 1;
	}
	
	get length(): number {
		return Math.ceil(this.allItems.length / this.pageSize);
	}
	
}
