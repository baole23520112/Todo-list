import html from "../core.js";
import { connect } from "../store.js";

import TodoItem from "./TodoItem.js";

// Connect beneath to get data in here
function TodoList({ todos, filter, filters }) {
	return html`
		<section class="main">
			<input
				id="toggle-all"
				class="toggle-all"
				type="checkbox"
				onchange='dispatch("TOGGLEALL", this.checked)'
				${todos.every(filters.completed) && "checked"}
			/>
			<label for="toggle-all" on>Mark all as complete</label>
			<ul class="todo-list">
				${todos
					.filter(filters[filter])
					.map((todo, index) => TodoItem({ todo, index }))}
			</ul>
		</section>
	`;
}

// Connect to database
export default connect()(TodoList);
