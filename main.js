const form = document.querySelector('form');
const clearAllbtn = document.querySelector('.clear-tasks');
const inputTask = document.querySelector('.new-task');
const taskNumber = document.querySelector('.task-number');
const container = document.querySelector('.todo-list');
const searchTaskInput = document.querySelector('.search-task');
const todoList = [];

const renderList = () => {
	container.textContent = '';
	todoList.forEach((todoElement, key) => {
		todoElement.dataset.key = key;
		container.appendChild(todoElement);
	})
	let doneTasks = todoList;
	doneTasks = doneTasks.filter(task => {
		return task.classList.contains('active')
	})
	taskNumber.textContent = todoList.length - doneTasks.length;
}

const submitTask = (e) => {
	e.preventDefault();

	if (!inputTask.value || inputTask.value == null) {
		alert('Wpisz zadanie do zrobienia')
		return
	}

	const inputText = inputTask.value;
	const task = document.createElement('li');
	task.innerHTML = "<input type='checkbox'></input>" + inputText + "<button>X</button>";
	todoList.push(task);
	renderList();
	inputTask.value = '';
	task.querySelector('button').addEventListener('click', removeTask)
	task.querySelector('input').addEventListener('click', doneTask)
}

const doneTask = (e) => {
	e.target.parentNode.classList.toggle('active');
	if (e.target.parentNode.classList.contains('active')) {
		e.target.parentNode.style.textDecoration = 'line-through';
	} else {
		e.target.parentNode.style.textDecoration = ''
	}
	renderList()
}

const removeTask = function (e) {
	const index = e.target.parentNode.dataset.key;
	e.target.parentNode.remove();
	todoList.splice(index, 1);
	renderList();
}

const searchTask = (e) => {
	const searchText = e.target.value.toLowerCase();
	let searchList = todoList;
	searchList = searchList.filter(task => {
		return task.textContent.toLowerCase().includes(searchText)
	})
	container.textContent = '';
	searchList.forEach(li => {
		container.appendChild(li);
	})
}

clearAllbtn.onclick = () => {
	todoList.length = 0;
	renderList()
}

form.addEventListener('submit', submitTask);
searchTaskInput.addEventListener('input', searchTask)