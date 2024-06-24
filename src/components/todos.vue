<script setup>
import { ref, onMounted, computed, watch } from 'vue'

const todos = ref([])
const name = ref('')

const input_content = ref('')

const todos_asc = computed(() => todos.value.sort((a,b) =>{
  return a.createdAt - b.createdAt
}))

watch(name, (newVal) => {
  localStorage.setItem('name', newVal)
})

watch(todos, (newVal) => {
  localStorage.setItem('todos', JSON.stringify(newVal))
}, {
  deep: true
})

const addTodo = () => {
    if (input_content.value.trim() === '') {
        return;
    }

    todos.value.push({
        content: input_content.value,
        done: false,
        editable: false,
        createdAt: new Date().getTime()
    });
};

const toggleEdit = (todo) => {
    todo.editable = !todo.editable;
};

const toggleDone = (todo) => {
    todo.editable = false;
};

const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo)
}

onMounted(() => {
  name.value = localStorage.getItem('name') || ''
  todos.value = JSON.parse(localStorage.getItem('todos')) || []
})

const filterTodos = (filter) => {
    currentFilter.value = filter;
};

const currentFilter = ref('all');

const filteredTodos = computed(() => {
    switch (currentFilter.value) {
        case 'done':
            return todos_asc.value.filter(todo => todo.done);
        case 'undone':
            return todos_asc.value.filter(todo => !todo.done);
        default:
            return todos_asc.value;
    }
});
</script>

<template>
<div style="display: flex; justify-content: center; margin-top: 50px;">
<div class="container">
	<div class="app">
		
		<section class="greeting">
			<h2 class="title">
				Nice to see you, <input type="text" id="name" placeholder="Name here" v-model="name">
			</h2>
		</section>

		<section class="create-todo">
			<h2>CREATE A TO DO LIST</h2>
      <br>

			<form id="new-todo-form" @submit.prevent="addTodo">
				<h3>What do you wanna DO today?</h3>
				<input 
					type="text" 
					name="content" 
					id="content" 
					placeholder="e.g. make a delicious food"
					v-model="input_content" />
				
				<input type="submit" value="Add todo" />
			</form>
		</section>
		
			<section class="todo-list">
    			<h3><b>TO DO LIST : </b></h3>
    			<section class="filter-container">
    			<div class="filter-buttons">
        			<button @click="filterTodos('all')">All</button>
        			<button @click="filterTodos('done')">Done</button>
        			<button @click="filterTodos('undone')">Undone</button>
    			</div>
			</section>

    		<div class="list" id="todo-list">
       			<div v-for="todo in filteredTodos" :key="todo.id" :class="`todo-item ${todo.done && 'done'}`">
    				<label>
        				<input type="checkbox" v-model="todo.done" />
        				<span :class="`bubble`"></span>
 					</label>

    			<div class="todo-content">
        			<input type="text" v-model="todo.content" :readonly="!todo.editable" />
    			</div>

    			<div class="actions">
        			<button class="edit" @click="toggleEdit(todo)">Edit</button>
					<button class="done-button" @click="toggleDone(todo)" v-if="todo.editable">Done</button>
        			<button class="delete" @click="removeTodo(todo)">Delete</button>
    			</div>
				</div>

			</div>
		</section>
		</div>		
	</div>
</div>
</template>

<style>
:root {
	--primary: #c40300;
	--light: #34a6bf;
	--grey: #888;
	--dark: #313154;
	--danger: #c40300;
	--bubble: #0042bd;
	
	--shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

	--bubble-glow: 0px 0px 4px rgba(0, 18, 220, 0.75);
	--personal-glow: 0px 0px 4px rgba(220, 90, 0, 0.75);
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'montserrat', sans-serif;
}

input:not([type="radio"]):not([type="checkbox"]), button {
	appearance: none;
	border: none;
	outline: none;
	background: none;
	cursor: initial;
}

body {
	background: var(--light);
	color: var(--dark);
}

.container {
	background-color: #3cd5e3;
	border-radius: 30px;
}

section {
	margin-top: 2rem;
	margin-bottom: 4rem;
	padding-left: 4rem;
	padding-right: 4em;
}

h3 {
	color: var(--dark);
	font-size: 1rem;
	font-weight: 400;
	margin-bottom: 0.5rem;
}

h4 {
	color: var(--grey);
	font-size: 0.875rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
}

.greeting .title {
	display: flex;
}

.greeting .title input {
	margin-left: 0.5rem;
	flex: 1 1 0%;
	min-width: 0;
}

.greeting .title,
.greeting .title input {
	color: var(--dark);
	font-size: 1.5rem;
	font-weight: 700;
}

.create-todo input[type="text"] {
	display: block;
	width: 100%;
	font-size: 1.125rem;
	padding: 1rem 1.5rem;
	color: var(--dark);
	background-color: #FFF;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	margin-bottom: 1.5rem;
}

.create-todo .options {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 1rem;
	margin-bottom: 1.5rem;
}

.create-todo .options label {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1.5rem;
	background-color: #FFF;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	cursor: pointer;
}

input[type="radio"],
input[type="checkbox"] {
	display: none;
}

.bubble {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: 2px solid var(--bubble);
	box-shadow: var(--bubble-glow);
}

.bubble.personal {
	border-color: var(--personal);
	box-shadow: var(--personal-glow);
}

.bubble::after {
	content: "";
	display: block;
	opacity: 0;
	width: 0px;
	height: 0px;
	background-color: var(--bubble);
	box-shadow: var(--bubble-glow);
	border-radius: 50%;
	transition: 0.2s ease-in-out;
}

.bubble.personal::after {
	background-color: var(--personal);
	box-shadow: var(--personal-glow);
}

input:checked ~ .bubble::after {
	width: 10px;
	height: 10px;
	opacity: 1;
}

.create-todo .options label div {
	color: var(--dark);
	font-size: 1.125rem;
	margin-top: 1rem;
}

.create-todo input[type="submit"] {
	display: block;
	width: 100%;
	font-size: 1.125rem;
	padding: 1rem 1.5rem;
	color: #FFF;
	background-color: var(--primary);
	border-radius: 0.5rem;
	box-shadow: var(--personal-glow);
	cursor: pointer;
	transition: 0.2s ease-in-out;
}

.create-todo input[type="submit"]:hover {
	opacity: 0.75;
}

.todo-list .list {
	margin: 1rem 0;
} 

.todo-list .todo-item {
	display: flex;
	align-items: center;
	background-color: #FFF;
	padding: 1rem;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	margin-bottom: 1rem;
}

.todo-item label {
	display: block;
	margin-right: 1rem;
	cursor: pointer;
}

.todo-item .todo-content {
	flex: 1 1 0%;
}

.todo-item .todo-content input {
	color: var(--dark);
	font-size: 1.125rem;
}

.todo-item .actions {
	display: flex;
	align-items: center;
}

.todo-item .actions button {
	display: block;
	padding: 0.5rem;
	border-radius: 0.25rem;
	color: #FFF;
	cursor: pointer;
	transition: 0.2s ease-in-out;
}

.todo-item .actions button:hover {
	opacity: 0.75;
}

.todo-item .actions .edit {
	margin-right: 0.5rem;
	background-color: var(--primary);
}

.todo-item .actions .delete {
	background-color: var(--danger);
}

.todo-item.done .todo-content input {
	text-decoration: line-through;
	color: var(--grey);
}

.done-button {
    background-color: green;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    margin-right: 10px;
}

@media (min-width: 720px) {
	.actions {
		display: flex;
		align-items: center;
	}

	.done-button {
		margin-right: 10px;
	}
}

@media (max-width: 720px) {
	.actions {
		display: block;
		margin-top: 10px;
	}

	.done-button {
		margin-right: 0;
		margin-bottom: 5px;
	}
}

.filter-container {
	background-color: rgb(69, 69, 69);
	padding: 10px;
	border-radius: 5px;
	margin-bottom: 20px;
	display: inline-block;
}

.filter-buttons {
    justify-content: space-between;
}

.filter-buttons button {
    background-color: gray;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 5px;
}

.filter-buttons button:hover {
    opacity: 0.8;
}
</Style>