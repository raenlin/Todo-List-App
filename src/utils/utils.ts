import { createElement, createSvgElement } from './elements';

export function generateRandomString(length: number) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}

export function taskCreate(id: string, content: string, remove?: string, check?: string) {
  const text = createElement({ tagName: 'span', textContent: `${content}` });
  const task = createElement({
    tagName: 'li',
    classNames: ['tasks-item'],
    attributes: { 'data-id': `${id}` }
  });
  const buttonsWrapper = createElement({ tagName: 'div', classNames: ['tasks-buttons'] });
  if (check) {
    const checkButtonSVG = createSvgElement(check, ['svg'], {
      width: '25',
      height: '25',
      viewBox: '0 0 448 512'
    });
    const checkButton = createElement({
      tagName: 'button',
      classNames: ['app-button', 'check-button'],
      attributes: { 'data-id': `${id}` }
    });
    checkButton.append(checkButtonSVG);
    buttonsWrapper.append(checkButton);
  }
  if (remove) {
    const deleteButtonSVG = createSvgElement(remove, ['svg'], {
      width: '20',
      height: '20',
      viewBox: '0 0 448 512'
    });
    const deleteButton = createElement({
      tagName: 'button',
      classNames: ['app-button', 'delete-button'],
      attributes: { 'data-id': `${id}` }
    });
    deleteButton.append(deleteButtonSVG);
    buttonsWrapper.append(deleteButton);
  }
  task.append(text, buttonsWrapper);
  return task;
}
