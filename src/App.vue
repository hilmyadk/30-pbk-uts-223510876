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
			<div class="list" id="todo-list">

				<div v-for="todo in todos_asc" :class="`todo-item ${todo.done && 'done'}`">
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
