import { createElement, createSvgElement } from '../utils/elements';
import { plus, check, remove } from '../utils/svg';
import { generateRandomString, taskCreate } from '../utils/utils';
import './app.css';

export function createApp() {
  const appWrapper = createElement({ tagName: 'div', classNames: ['app-wrapper'] });
  const appInner = createElement({ tagName: 'div', classNames: ['app-inner'] });
  const heading = createElement({ tagName: 'h1', textContent: 'ToDo List App' });
  const inputSection = createElement({ tagName: 'div', classNames: ['input-wrapper'] });
  const input = createElement({
    tagName: 'input',
    attributes: { placeholder: 'Create a new task' }
  });
  const addButtonSVG = createSvgElement(plus, ['svg'], {
    viewBox: '0 0 448 512'
  });
  const addButton = createElement({ tagName: 'button', classNames: ['app-button', 'add-button'] });
  addButton.append(addButtonSVG);
  inputSection.append(input, addButton);

  const todoTasks = createElement({
    tagName: 'ul',
    classNames: ['tasks-todo'],
    textContent: 'Tasks To Do'
  });
  const doneTasks = createElement({
    tagName: 'ul',
    classNames: ['tasks-done'],
    textContent: 'Tasks Done'
  });

  const tasksSection = createElement({ tagName: 'section', classNames: ['tasks-wrapper'] });
  tasksSection.append(todoTasks, doneTasks);

  appInner.append(heading, inputSection, tasksSection);
  appWrapper.append(appInner);

  addNewTask(todoTasks, addButton, input);
  taskHandler(todoTasks, doneTasks);
  return appWrapper;
}

const addNewTask = (
  todoTasks: HTMLUListElement,
  addButton: HTMLButtonElement,
  input: HTMLInputElement
) => {
  addButton.addEventListener('click', () => {
    const id = generateRandomString(5);
    const content = input.value;
    if (input.value === '') {
      return;
    }
    const task = taskCreate(id, content, remove, check);
    todoTasks.append(task);
    input.value = '';
  });
};

const taskHandler = (todoTasks: HTMLUListElement, doneTasks: HTMLUListElement) => {
  todoTasks.addEventListener('click', (event) => {
    const target = <HTMLButtonElement>event.target;
    const tasks = todoTasks.querySelectorAll<HTMLLIElement>('.tasks-item');
    const currentTask = <HTMLLIElement>findTask(target, tasks);
    if (target.classList.contains('delete-button')) {
      currentTask.remove();
    }
    if (target.classList.contains('check-button')) {
      addTaskToDoneSection(doneTasks, currentTask);
    }
  });
};

const addTaskToDoneSection = (doneTasks: HTMLUListElement, currentTask: HTMLLIElement) => {
  const content = <string>currentTask.textContent;
  const id = <string>currentTask.getAttribute('data-id');
  const task = taskCreate(id, content, remove);
  doneTasks.append(task);
  currentTask.remove();
  doneTasks.addEventListener('click', (event) => {
    const target = <HTMLButtonElement>event.target;
    const tasks = doneTasks.querySelectorAll<HTMLLIElement>('.tasks-item');
    const currentTask = <HTMLLIElement>findTask(target, tasks);
    if (target.classList.contains('delete-button')) {
      currentTask.remove();
    }
  });
};

const findTask = (target: HTMLButtonElement, tasks: NodeListOf<HTMLLIElement>) => {
  const id = <string>target.getAttribute('data-id');
  const currentTask = Array.from(tasks).find((task) => task.getAttribute('data-id') === id);
  return <HTMLLIElement>currentTask;
};
