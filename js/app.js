let todos = [];

const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');

(() => {
  // 서버에서 자료 받아옴
  todos = [
    { id: 1, content: 'html', completed: true },
    { id: 2, content: 'css', completed: false },
    { id: 3, content: 'javascript', completed: true }
  ];
})();

const render = () => {
  if ($todos.hasChildNodes()) [...$todos.childNodes].forEach(todo => $todos.removeChild(todo));

  const $fragment = document.createElement('fragment');
 
  todos.forEach(({ id, content, completed }) => {
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
  })
}

document.addEventListener('DOMContentLoaded', render);

const addTodo = () => {
  todos = [{ id: todos.length ? Math.max(...todos.map(v => v.id)) + 1 : 1, content: $inputTodo.value, completed: false }, ...todos]
}
const removeTodo = target => {
  todos = todos.filter(todo => todo.id !== +target.parentNode.id);
}
const completedTodo = target => {
  todos = todos.map(todo => +target.parentNode.id === todo.id ? { ...todo, completed: !todo.completed } : todo);
}

$inputTodo.onkeyup = e => {
  if (e.key !== 'Enter') return;
  addTodo();
  $inputTodo.value = '';
  render();
}

$todos.onclick = e => {
  if (!e.target.matches('.todos .remove-todo')) return;
  removeTodo(e.target);
  render();
}

$todos.onchange = e => {
  completedTodo(e.target);
  render();
}