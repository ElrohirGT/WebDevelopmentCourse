import { useState } from 'react'
import { TaskList } from './components/TaskList'
import { useLocalStorage } from "./lib"
import { TaskForm } from './components/TaskForm';

const HOME_ROUTE = "HOME";
const ADD_TASK_ROUTE = "ADD_TASK";
const EDIT_TASK_ROUTE = "EDIT_TASK";

const URL_TO_ROUTE_MAP = {
	"/": HOME_ROUTE,
	"/add": ADD_TASK_ROUTE,
};


function App() {
	const urlRoute = window.location.pathname;
	const defaultRoute = URL_TO_ROUTE_MAP[urlRoute] ?? HOME_ROUTE;
	const [currentRoute, setCurrentRoute] = useState(defaultRoute);
	const [selectedTask, setSelectedTask] = useState(null);

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
		* @param {Task} task - The task to edit
		*/
	const onEditTask = (task) => {
		setSelectedTask(task);
		setCurrentRoute(EDIT_TASK_ROUTE);
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

	/**
		* @param {Task} task - The task to try to edit.
		* @returns {boolean} True if it could be edited.
		*/
	const tryToEditTask = (task) => {
		/**
			* @param {Task[]} array
			* @param {(newTasks: Task[])=>void} setArray
			*/
		const editTaskIfInArray = (array, setArray) => {
			const newArray = array.map((t) => {
				if (t.title === selectedTask.title && t.description === selectedTask.description) {
					return task;
				} else {
					return t;
				}
			});

			setArray(newArray);
		};


		editTaskIfInArray(uncompletedTasks, setUncompletedTasks);
		editTaskIfInArray(completedTasks, setCompletedTasks);

		setCurrentRoute(HOME_ROUTE);

		return true;
	};

	const ROUTES = {};
	ROUTES[HOME_ROUTE] = <>
		<a href='add'>New Task</a>
		<button onClick={() => { setCompletedTasks([]); setUncompletedTasks([]) }}>Clear LocalStorage</button>
		<TaskList
			completedTasks={completedTasks}
			uncompletedTasks={uncompletedTasks}
			editTask={onEditTask}
			completeTask={completeTask}
			uncompleteTask={uncompleteTask} />
	</>;
	ROUTES[ADD_TASK_ROUTE] = <TaskForm onFormSubmitted={tryToAddTask} />
	ROUTES[EDIT_TASK_ROUTE] = <TaskForm onFormSubmitted={tryToEditTask} baseTask={selectedTask} />

	return (
		<div>
			{ROUTES[currentRoute]}
		</div>
	)
}

export default App
