<template lang="pug">
	.tv__wrapper
		.tv__header
			v-row.text-body-2(dense)
				v-col.tv__cover(:cols="colsSizes.cover") Обложка
				v-col(:cols="colsSizes.title") Название
				v-col(:cols="colsSizes.countryAndGenres") Страна / Жанр
				v-col(:cols="colsSizes.durationAndRating") Длительность / Рейтинг

		.tv__content(ref="scrollArea")
			v-row.tv__list.text-subtitle-2(
				v-for="item in items"
				:key="item.id"
				dense
			)
				v-col.tv__cover(:cols="colsSizes.cover")
					v-img.mr-2.mt-1.mb-2(:src="item.image.medium" width="130")

				v-col(:cols="colsSizes.title")
					div.text-h5.mb-2 {{ item.name }}
					.text-body-2(v-html="item.summary")

				v-col(:cols="colsSizes.countryAndGenres")
					div {{ getCountryName(item) }}
					div.font-weight-light.text-caption {{ item.genres.join(', ') }}

				v-col(:cols="colsSizes.durationAndRating") {{ item.averageRuntime }}мин.
					div.text-h5.font-weight-bold {{ item.rating.average }}
					v-rating(
						:value="item.rating.average"
						background-color="blue lighten-3"
						half-increments
						color="blue"
						length="10"
						readonly small dense
					)

</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator';
import { TvShow } from '@/classes/api/types/TvShowTypes';

@Component
export default class TvShowsTable extends Vue {
	@Prop({ type: Array, default: () => [] }) items!: TvShow[];

	colsSizes = {
		cover: 'auto',
		title: '',
		countryAndGenres: 2,
		durationAndRating: 2,
	}

	@Ref('scrollArea')
	scrollArea: HTMLDivElement | undefined = undefined;

	@Watch('items')
	onItemsChange(): void {
		this.scrollTop();
	}

	scrollTop(): void {
		if (!this.scrollArea) return;
		(this.scrollArea as HTMLDivElement).scrollTop = 0;
	}

	getCountryName(item: TvShow): string {
		return item.network?.country.name || 'Страна не указана';
	}
}
</script>

<style lang="scss" scoped>
.tv {
	&__wrapper {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	&__header {
		border-bottom: 1px solid #dadada;
		padding: 0 8px 8px;
	}

	&__content {
		flex: 1 1 auto;
		height: 100%;
		overflow: hidden;
		overflow-y: auto;
		padding: 8px;
	}

	&__list {
		border-bottom: 1px solid #dadada;

		&:nth-child(2n) {
			background-color: #fff6f6;
		}
	}

	&__cover {
		min-width: 138px;
	}
}
</style>
