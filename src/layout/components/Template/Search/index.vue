<template>
	<div>
		<i class="el-icon-search" @click="click"></i>
	</div>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'Search',
	computed: {
		...mapGetters(['search'])
	},
	methods: {
		...mapActions({ toggleSearch: 'app/toggleSearch' }),
		click() {
			this.toggleSearch(!this.search)
		},
	}
}
</script>
  
<style scoped>
.el-icon-search {
	display: inline-block;
	cursor: pointer;
	fill: #5a5e66;
	width: 20px;
	height: 20px;
	vertical-align: 10px;
}
</style>
  