import html from "../core.js";
import { connect } from "../store.js";

function TodoItem({ todo, index, editIndex }) {
	return html`
		<li
			class="
				${todo.completed && "completed"} 
				${editIndex === index && "editing"}"
		>
			<div class="view">
				<input
					class="toggle"
					type="checkbox"
					${todo.completed && "checked"}
					onchange='dispatch("TOGGLE", ${index})'
				/>
				<label ondblclick="dispatch('EDIT', ${index})"
					>${todo.title}</label
				>
				<button
					class="destroy"
					onclick="dispatch('DELETE', ${index})"
				></button>
			</div>
			<input
				class="edit"
				value="${todo.title}"
				onkeyup="event.keyCode === 13 && dispatch('SAVE', this.value.trim())
				|| event.keyCode == 27 && dispatch('CANCEL')"
				onblur="dispatch('SAVE', this.value.trim())"
			/>
		</li>
	`;
}

export default connect()(TodoItem);
