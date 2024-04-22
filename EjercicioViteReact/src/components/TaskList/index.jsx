import "./TaskList.css"

/**
	* @param {Object} props 
	* @param {Task[]} props.completedTasks 
	* @param {Task[]} props.uncompletedTasks 
	* @param {(task: Task) => void} props.completeTask 
	* @param {(task: Task) => void} props.uncompleteTask 
	*/
export function TaskList({ completedTasks, uncompletedTasks, completeTask, uncompleteTask }) {

	/**
		* @param {Task} task - The task to render
		*/
	const constructLisItem = (task, isCompleted) => {
		return <div key={`${task.title}-${task.description}`} className={"task-item " + (isCompleted ? "completed-task-item" : "")}>
			<p>{task.title}</p>
			<p>{task.description}</p>
			<button onClick={() => {
				isCompleted ? uncompleteTask(task) : completeTask(task);
			}}>{isCompleted ? "Redo" : "Done"}</button>
		</div>
	};

	return <div>
		<div className="task-items-container">
			{
				uncompletedTasks.map((t) => constructLisItem(t, false))
			}
		</div>
		<div className="task-items-container">
			{
				completedTasks.map((t) => constructLisItem(t, true))
			}
		</div>
	</div>
}
