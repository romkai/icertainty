<template lang="pug">
	v-app
		v-main
			router-view

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
	components: {
	},
})
export default class app extends Vue {

}
</script>

<style lang="scss">
.v-main {
	height: calc(100vh - 48px);
}
</style>
