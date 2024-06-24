import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../components/todos.vue';
import Posts from '../components/posts.vue';
import Album from '../components/album.vue';
import PhotoList from '../components/PhotoList.vue';

const routes = [
  { path: '/', name: 'Todos', component: Todos },
  { path: '/posts', name: 'Posts', component: Posts },
  { path: '/album', name: 'Album', component: Album },
  { path: '/albums/:albumId', name: 'PhotoList', component: PhotoList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
