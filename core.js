// Process tagged template literals: convert to pure html
export default function html([first, ...string], ...values) {
	return (
		values
			.reduce((acc, cur) => acc.concat(cur, string.shift()), [first])
			// Remove true and false
			.filter((x) => (x && x !== true) || x === 0)
			.join("")
	);
}

// CreateStore
export function createStore(reducer) {
	let state = reducer();

	const roots = new Map();

	// render() loop through roots to render UI
	function render() {
		for (const [root, component] of roots) {
			const htmlCode = component();
			root.innerHTML = htmlCode;
		}
	}

	return {
		// Set component and render UI
		attach(component, root) {
			roots.set(root, component);
			render();
		},

		// Connect to state
		connect(selector = (state) => state) {
			return (component) =>
				(props, ...args) =>
					component(
						Object.assign({}, props, selector(state), ...args)
					);
		},

		// Update state and render UI
		dispatch(action, ...args) {
			state = reducer(state, action, args);
			render();
		},
	};
}
