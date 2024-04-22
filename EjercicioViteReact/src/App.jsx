import { useState } from 'react'
import { TaskList } from './components/TaskList'
import { useLocalStorage } from "./lib"
import { AddTaskView } from './views/AddTask';

const HOME_ROUTE = "HOME";
const ADD_TASK_ROUTE = "ADD_TASK";

const URL_TO_ROUTE_MAP = {
	"/": HOME_ROUTE,
	"/add": ADD_TASK_ROUTE,
};


function App() {
	const urlRoute = window.location.pathname;
	const defaultRoute = URL_TO_ROUTE_MAP[urlRoute] ?? HOME_ROUTE;
	const [currentRoute, _] = useState(defaultRoute);

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

	/**
		* @param {Task} task - The task to add.
		* @returns {boolean} Whether the task was added or not.
		*/
	const tryToAddTask = (task) => {
		if (uncompletedTasks.findIndex(({ title, description }) => title === task.title && description === task.description) > -1) {
			return false;
		}

		setUncompletedTasks(uncompletedTasks.concat(task));
		return true;
	};

	const ROUTES = {};
	ROUTES[HOME_ROUTE] = <>
		<a href='add'>New Task</a>
		<button onClick={() => { setCompletedTasks([]); setUncompletedTasks([]) }}>Clear LocalStorage</button>
		<TaskList
			completedTasks={completedTasks}
			uncompletedTasks={uncompletedTasks}
			completeTask={completeTask}
			uncompleteTask={uncompleteTask} />
	</>;
	ROUTES[ADD_TASK_ROUTE] = <AddTaskView onFormSubmitted={tryToAddTask} />

	return (
		<div>
			{ROUTES[currentRoute]}
		</div>
	)
}

export default App
