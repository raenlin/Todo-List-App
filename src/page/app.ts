import { createElement, createSvgElement } from '../utils/elements';
import { plus, check, remove } from '../utils/svg';
import './app.css';

export function createApp() {
  const appWrapper = createElement({ tagName: 'div', classNames: ['app-wrapper'] });
  const appInner = createElement({ tagName: 'div', classNames: ['app-inner'] });
  const heading = createElement({ tagName: 'h1', textContent: 'Things To Do' });
  const inputSection = createElement({ tagName: 'div', classNames: ['input-wrapper'] });
  const input = createElement({ tagName: 'input', attributes: { placeholder: 'Add a new task' } });
  const addButton = createSvgElement(plus, ['app-button'], {
    width: '40',
    height: '40',
    viewBox: '0 0 448 512'
  });
  inputSection.append(input, addButton);

  const todoTasks = addNewTask(addButton, input);

  appInner.append(heading, inputSection, todoTasks);
  appWrapper.append(appInner);

  // taskHandler(todoTasks);
  return appWrapper;
}

const addNewTask = (addButton: SVGSVGElement, input: HTMLInputElement) => {
  const todoTasks = createElement({ tagName: 'ul', classNames: ['tasks-todo'] });
  addButton.addEventListener('click', () => {
    if (input.value === '') {
      return;
    }
    const task = createElement({ tagName: 'li', classNames: ['tasks-todo__item'] });
    const buttonsWrapper = createElement({ tagName: 'div', classNames: ['tasks-todo__buttons'] });
    const checkButton = createSvgElement(check, ['app-button', 'check-button'], {
      width: '25',
      height: '25',
      viewBox: '0 0 448 512'
    });
    const deleteButton = createSvgElement(remove, ['app-button', 'delete-button'], {
      width: '20',
      height: '20',
      viewBox: '0 0 448 512'
    });
    const text = createElement({ tagName: 'span', textContent: `${input.value}` });
    buttonsWrapper.append(checkButton, deleteButton);
    task.append(text, buttonsWrapper);
    todoTasks.append(task);
    input.value = '';
  });
  return todoTasks;
};

// const taskHandler = (todoTasks: HTMLUListElement) => {
//   todoTasks.addEventListener('click', (event) => {
//     const target = <SVGSVGElement>event.target;
//     if (target.classList.contains('check-button')) {
//       moveTasksToDone();
//     } else {

//     }
//   });
// };
