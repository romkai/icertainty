<template lang="pug">
	.tv__wrapper
		.tv__header
			v-row.text-body-2(dense)
				v-col.tv__cover(:cols="colsSizes.cover") Обложка
				v-col(:cols="colsSizes.title") Название
				v-col(:cols="colsSizes.countryAndGenres") Страна / Жанр
				v-col.tv__rating(:cols="colsSizes.durationAndRating") Рейтинг

		.tv__content(ref="scrollArea")
			v-row.tv__list.text-subtitle-2(
				v-for="item in items"
				:key="item.id"
				dense
			)
				v-col.tv__cover(:cols="colsSizes.cover")
					v-img.mr-2.mt-1.mb-2(:src="item.image.medium" width="120")

				v-col(:cols="colsSizes.title")
					div.text-h5.mb-2 {{ item.name }}
					.text-body-2(v-html="item.summary")

				v-col.pt-2(:cols="colsSizes.countryAndGenres")
					div {{ getCountryName(item) }}
					div.font-weight-light.text-caption {{ item.genres.join(', ') }}

				v-col.tv__rating(:cols="colsSizes.durationAndRating")
					.d-flex.align-center
						div.text-h6.font-weight-bold.mr-2 {{ getRating(item) }}
						v-rating(
							:value="item.rating.average"
							background-color="accent"
							half-increments
							color="warning"
							length="10"
							readonly small dense
						)
					.text-body-2 Длительность:
						span.info--text.ml-2 {{ item.averageRuntime }} мин.

</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator';
import { TvShow } from '@/classes/api/types/TvShowTypes';

@Component
export default class TvShowsTable extends Vue {
	@Prop({ type: Array, default: () => [] }) items!: TvShow[];
	@Prop({ type: Boolean }) loading!: boolean;

	colsSizes = {
		cover: 'auto',
		title: '',
		countryAndGenres: 2,
		durationAndRating: 'auto',
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

	getRating(item: TvShow): string {
		return (item.rating?.average || 0).toFixed(1);
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
		padding: 8px 2px 8px 8px;
	}

	&__list {
		border-bottom: 1px solid #dadada;
		animation: fade 500ms linear;
		min-height: 200px;

		&:nth-child(2n) {
			background-color: #fff6f6;
		}

		&:last-child {
			border-bottom: none;
		}
	}

	&__cover {
		min-width: 140px;
	}

	&__rating {
		min-width: 250px;
	}
}

@keyframes fade {
	from {opacity: 0}
	to {opacity: 1}
}
</style>
