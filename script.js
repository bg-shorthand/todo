let model = [];

const $todos = document.querySelector('.todos');
const $form = document.querySelector('form');
const $input = document.querySelector('.input-todo');

(function () {
  //서버에서 자료를 받음
  model = [
    { id: 1, content: 'html', completed: true},
    { id: 2, content: 'css', completed: false},
    { id: 3, content: 'javascript', completed: true}
  ]
})();

const render = () => {
  if ($todos.hasChildNodes) [...$todos.childNodes].forEach(v => $todos.removeChild(v));

  model.forEach(({ id, content, completed }) => {
    const $todo = document.createElement('li');
    const $checkbox = document.createElement('input');
    const $span = document.createElement('span');
    const $button = document.createElement('button');
    
    $checkbox.setAttribute('type', 'checkbox');
    $button.textContent = 'X';
    $button.setAttribute('type', 'button');

    $todo.setAttribute('id', +id);
    $todo.classList.add('todo');
    $checkbox.checked = completed;
    $span.style.textDecoration = $checkbox.checked ? 'line-through' : 'none';
    
    $span.textContent = content;
    $todo.appendChild($checkbox);
    $todo.appendChild($span);
    $todo.appendChild($button);
    
    $todos.appendChild($todo);
  })
}

document.addEventListener('DOMContentLoaded', render);

$form.onsubmit = e => {
  e.preventDefault();
  if (!$input.value) return;
  model = [{ id: Math.max(...model.map(v => v.id)) + 1, content: $input.value, completed: false }, ...model]
  render();
  $input.value = '';
  $input.focus();
}

$todos.onclick = e => {
  if (e.target.getAttribute('type') !== 'button') return;
  model = model.filter(v => v.id !== +e.target.parentNode.getAttribute('id'));
  render();
}

$todos.onchange = e => {
  // if (e.target.getAttribute('type') !== 'checkbox') return;
  model = model.map(v => +e.target.parentNode.getAttribute('id') === v.id ? { ...v, completed: !v.completed } : v);
  render();
}