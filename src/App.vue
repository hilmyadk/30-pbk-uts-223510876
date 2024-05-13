<template>
	<div class="container">
	  <header class="header">
		<nav class="menu">
		  <ul>
			<li @click="pilihMenu('todos')" :class="{ 'aktif': menuAktif === 'todos' }">TODOS</li>
			<li class="separator"></li>
			<li @click="pilihMenu('posts')" :class="{ 'aktif': menuAktif === 'posts' }">POSTS</li>
		  </ul>
		</nav>
	  </header>
	  
	  <div class="konten">
		<div v-if="menuAktif === 'todos'">
		  <!-- TodoList component -->
		  <Todos />
		</div>
		<div v-else-if="menuAktif === 'posts'">
		  <!-- Post component -->
		  <Posts />
		</div>
	  </div>
	</div>
  </template>
  
<script>
  import Todos from './components/todos.vue';
  import Posts from './components/posts.vue';
  
  export default {
	components: {
	  Todos,
	  Posts
	},
	data() {
	  return {
		menuAktif: 'todos'
	  };
	},
	methods: {
	  pilihMenu(menu) {
		this.menuAktif = menu;
	  }
	}
  };
</script>
  
<style scoped>

.container {
	padding-top: 10px;
	padding-bottom: 20px;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	padding-bottom: 10px;
	background-color: #c40300;
	color: #000000;
	padding: 10px 20px 20px;
	font-size: larger;
}

.menu {
  justify-self: end; /* Menu akan ditempatkan di ujung kanan */
}

.menu ul {
	list-style-type: none;
	margin: 0;
	padding: 0;
	display: flex;
}

.menu ul li {
	margin-right: 30px;
	cursor: pointer;
	position: relative;
}

.menu ul li.separator::after {
	content: "";
	position: absolute;
	right: -5px;
	top: 50%;
	height: 25px;
	border-left: 2px solid #000;
	transform: translateY(-50%);
}

.menu ul li.aktif {
	font-weight: bold;
}
</style>
