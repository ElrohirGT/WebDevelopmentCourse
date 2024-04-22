import { useState } from 'react'
import { TaskList } from './components/TaskList'
import { useLocalStorage } from "./lib"

const HOME_ROUTE = "HOME";


function App() {
	const [route, setRoute] = useState(HOME_ROUTE)

	/**
		* Set of completed tasks.
		* @type {[Task[], (newTasks: Task[]) => void]}
		*/
	const [completedTasks, setCompletedTasks] = useLocalStorage("completedTasks", [{ title: "Hello", description: "I'm a completed task!" }]);
	/**
		* Set of uncompleted tasks.
		* @type {[Task[], (newTasks: Task[]) => void]}
		*/
	const [uncompletedTasks, setUncompletedTasks] = useLocalStorage("uncompletedTasks", [{ title: "UNCOMPLETED!", description: "I'm an uncompleted task!" }]);

	/**
		* @param {Task} task - The task to complete
		*/
	const completeTask = (task) => {
		setCompletedTasks(completedTasks.concat(task));
		setUncompletedTasks(uncompletedTasks.filter((t) => t.title !== task.title && t.description !== task.description))
	}
	/**
		* @param {Task} task - The task to uncomplete
		*/
	const uncompleteTask = (task) => {
		setUncompletedTasks(uncompletedTasks.concat(task));
		setCompletedTasks(completedTasks.filter((t) => t.title !== task.title && t.description !== task.description))
	}

	return (
		<div>
			<TaskList
				completedTasks={completedTasks}
				uncompletedTasks={uncompletedTasks}
				completeTask={completeTask}
				uncompleteTask={uncompleteTask} />
		</div>
	)
}

export default App
