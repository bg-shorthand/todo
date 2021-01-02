let todos = [];
let activeTodos = [];
let completedTodos = [];

const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');
const $completeAll = document.getElementById('ck-complete-all');
const $clearCompletedButton = document.querySelector('.clear-completed > .btn');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');
const $nav = document.querySelector('.nav');
const $all = document.getElementById('all');
const $active = document.getElementById('active');
const $completed = document.getElementById('completed');

(() => {
  // 서버에서 자료 받아옴
  todos = [
    { id: 1, content: 'html', completed: true },
    { id: 2, content: 'css', completed: false },
    { id: 3, content: 'javascript', completed: true }
  ];
})();

const viewTodos = () => {
  activeTodos = todos.filter(todo => !todo.completed);
  completedTodos = todos.filter(todo => todo.completed);
};

const render = () => {
  if ($todos.hasChildNodes()) [...$todos.childNodes].forEach(todo => $todos.removeChild(todo));

  let model = [];

  viewTodos();

  if ($all.classList.contains('active')) model = todos;
  else if ($active.classList.contains('active')) model = activeTodos;
  else if ($completed.classList.contains('active')) model = completedTodos;

  const $fragment = document.createElement('fragment');

  model.forEach(({ id, content, completed }) => {
    const $todo = document.createElement('li');
    $todo.setAttribute('id', id);
    $todo.classList.add('todo-item');

    const $checkbox = document.createElement('input');
    $checkbox.setAttribute('type', 'checkbox');
    if (completed) $checkbox.setAttribute('checked', 'checked');
    $checkbox.setAttribute('id', `ck-${id}`);
    $checkbox.classList.add('checkbox');

    const $label = document.createElement('label');
    $label.setAttribute('for', `ck-${id}`);
    $label.textContent = content;
    $label.style.textDecoration = $checkbox.getAttribute('checked') ? 'line-through' : 'none';

    const $button = document.createElement('i');
    $button.classList.add('remove-todo', 'var', 'fa-times-circle');

    $todo.appendChild($checkbox);
    $todo.appendChild($label);
    $todo.appendChild($button);

    $fragment.appendChild($todo);
    $todos.appendChild($fragment);
  });

  $completeAll.checked = !model.map(todo => todo.completed).includes(false);
  $completedTodos.textContent = todos.filter(todo => todo.completed).length;
  $activeTodos.textContent = todos.length - $completedTodos.textContent;
};

document.addEventListener('DOMContentLoaded', render);

const addTodo = () => {
  todos = [{ id: todos.length ? Math.max(...todos.map(v => v.id)) + 1 : 1, content: $inputTodo.value, completed: false }, ...todos];
  render();
};
const removeTodo = target => {
  todos = todos.filter(todo => todo.id !== +target.parentNode.id);
  render();
};
const completedTodo = target => {
  todos = todos.map(todo => (+target.parentNode.id === todo.id ? { ...todo, completed: !todo.completed } : todo));
  render();
};
const checkingCompleteAll = target => {
  todos = target.checked ? todos.map(todo => ({ ...todo, completed: true })) : todos.map(todo => ({ ...todo, completed: false }));
  render();
};
const clearCompleted = () => {
  todos = todos.filter(todo => !todo.completed);
  render();
};
const changeActive = e => {
  [...e.currentTarget.children].forEach(list => list.classList.remove('active'));
  e.target.classList.add('active');
  render();
};

$inputTodo.onkeyup = e => {
  if (e.key !== 'Enter' || !e.target.value) return;
  addTodo();
  $inputTodo.value = '';
};

$todos.onclick = e => {
  if (!e.target.matches('.todos .remove-todo')) return;
  removeTodo(e.target);
};

$todos.onchange = e => {
  completedTodo(e.target);
};

$completeAll.onchange = e => {
  checkingCompleteAll(e.target);
};

$clearCompletedButton.onclick = clearCompleted;

$nav.onclick = e => {
  changeActive(e);
};