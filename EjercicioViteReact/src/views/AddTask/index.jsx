import { useState } from "react";
import "./AddTaskView.css"

/**
	* @param {Object} props 
	* @param {(newTask: Task)=>boolean} props.onFormSubmitted 
	*/
export function AddTaskView({ onFormSubmitted }) {
	const [message, setMessage] = useState("");

	const onFormSubmit = (e) => {
		e.preventDefault();
		setMessage("");

		const form = e.target;
		const formData = new FormData(form);

		const data = {};
		formData.forEach((v, k) => data[k] = v);

		if (onFormSubmitted(data)) {
			form.reset();
			setMessage("Task added!")
		} else {
			setMessage("Task couldn't be added!")
		}
	};

	return <form className="add-task-view-container" onSubmit={onFormSubmit}>
		<h1>Create a Task</h1>
		<input name="title" placeholder="Title:" />
		<input name="description" placeholder="Description:" />
		<a href="/">Go Back</a>
		<button type="reset">Clear</button>
		<button type="submit">Create</button>
		{message.length > 0 ?
			<p> NOTE: {message}</p> : null
		}
	</form >
}
