<template lang="pug">
	v-container
		.page__template
			.page__content
				TvShowsTable(
					:items="model.items"
					:loading="model.loading"
				)

			.page__footer
				v-pagination(
					v-model="model.page"
					:length="model.length"
				)

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TvShowsTable from '@/components/TvShowsTable.vue';
import TvShowsModel from '@/classes/models/TvShowsModel';

@Component({
	components: { TvShowsTable }
})
export default class Home extends Vue {

	model = new TvShowsModel();

	mounted(): void {
		this.model.fetchItems();
	}

}
</script>

<style lang="scss" scoped>
.container {
	height: 100%;
}
.page {
	&__template {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	&__content {
		flex: 1 1 auto;
		overflow: hidden;
		height: 100%;
	}

	&__footer {
		padding-top: 8px;
		min-height: 48px;
		border-top: 1px solid #dadada;
	}
}
</style>

