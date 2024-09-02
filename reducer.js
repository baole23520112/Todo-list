import storage from "./util/storage.js";

const init = {
	todos: storage.get(),
	filter: "all",
	filters: {
		all: () => true,
		active: (todo) => !todo.completed,
		completed: (todo) => todo.completed,
	},
	editIndex: null,
};

const actions = {
	ADD({ todos }, title) {
		if (title) {
			todos.push({
				title,
				completed: false,
			});
			storage.set(todos);
		}
	},
	TOGGLE({ todos }, index) {
		const todo = todos[index];
		todo.completed = !todo.completed;
		storage.set(todos);
	},
	TOGGLEALL({ todos }, checked) {
		todos.forEach((todo) => {
			todo.completed = checked;
		});
		storage.set(todos);
	},
	DELETE({ todos }, index) {
		todos.splice(index, 1);
		storage.set(todos);
	},
	SWITCH(state, type) {
		state.filter = type;
	},
	CLEAR(state) {
		state.todos = state.todos.filter(state.filters.active);
		storage.set(state.todos);
	},
	EDIT(state, index) {
		state.editIndex = index;
	},
	SAVE(state, value) {
		if (state.editIndex !== null) {
			if (value) {
				state.todos[state.editIndex].title = value;
				state.editIndex = null;
			} else {
				this.DELETE(state, state.editIndex);
			}
			storage.set(state.todos);
		}
	},
	CANCEL(state) {
		state.editIndex = null;
	},
};

export default function reducer(state = init, action, args) {
	actions[action] && actions[action](state, ...args);
	return state;
}
