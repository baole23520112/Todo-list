import html from "../core.js";
import { connect } from "../store.js";

function Footer({ todos, filter, filters }) {
	return html`
		<footer class="footer">
			<span class="todo-count">
				<strong>${todos.filter(filters.active).length}</strong> item
				left
			</span>
			<ul class="filters">
				${Object.keys(filters).map(
					(key) => html` <li>
						<a
							class="${filter === key && "selected"}"
							href="#/"
							onclick="dispatch('SWITCH', '${key}')"
						>
							${key[0].toUpperCase() + key.slice(1)}
						</a>
					</li>`
				)}
			</ul>
			${todos.filter(filters.completed).length > 0 &&
			html` <button class="clear-completed" onclick="dispatch('CLEAR')">Clear completed</button> `}
		</footer>
	`;
}

export default connect()(Footer);
