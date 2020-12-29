const $form = document.querySelector('form');
const $inputTodo = document.querySelector('.input-todo');
const $addBtn = document.querySelector('.add-btn');
const $todos = document.querySelector('.todos');
const $body = document.querySelector('body');
const $delete = document.querySelector('.delete');

function addTodo () {
  const $todo = document.createElement('li');
  const $checkBox = document.createElement('input');
  const $delete = document.createElement('button');
  
  $todo.textContent = $inputTodo.value;
  $todo.classList.add('todo')
  
  $checkBox.setAttribute('type', 'checkbox')
  $todo.insertBefore($checkBox, $todo.firstChild);
  
  $delete.textContent = 'X';
  $todo.appendChild($delete);
  $delete.classList.add('delete');
  
  $todos.appendChild($todo);
}

function changeColor () {
  const random1 = Math.floor(Math.random() * 255 + 1)
  const random2 = Math.floor(Math.random() * 255 + 1)
  const random3 = Math.floor(Math.random() * 255 + 1)

  $body.style.backgroundColor = `rgb(${random1},${random2},${random3})`
}

$form.onsubmit = e => {
  e.preventDefault();
  if ($inputTodo.value) {
    addTodo();
    changeColor();
    $inputTodo.value = '';
    $inputTodo.focus();
  }
}

$delete.onclick = () => {
  console.log($delete.parentElement);
}