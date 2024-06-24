<template>
	<div class="container bg-gray-100 min-h-screen">
	  <header class="header bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg">
		<main>
		  <div class="button">
			<router-link to="/" class="menu-item hover:border-yellow-400 hover:text-yellow-400 transition duration-300"> Todos </router-link>
			<router-link to="/posts" class="menu-item hover:border-yellow-400 hover:text-yellow-400 transition duration-300"> Posts </router-link>
			<router-link to="/album" class="menu-item hover:border-yellow-400 hover:text-yellow-400 transition duration-300"> Album </router-link>
		  </div>
		  <router-view />
		</main>
	  </header>
	</div>
  </template>
  
  <script>
	import Todos from './components/todos.vue';
	import Posts from './components/posts.vue';
	import Album from './components/album.vue';
	
	export default {
	  components: {
		Todos,
		Posts,
		Album
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
  .header {
	background: linear-gradient(90deg, #667eea, #764ba2);
	color: white;
	padding: 10px 0;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .button {
	font-size: 25px;
  }
  
  .menu-item {
	transition: color 0.4s;
  }
  
  .menu-item:hover {
	color: #ffed4a;
	border-color: #ffed4a;
  }
  </style>
  