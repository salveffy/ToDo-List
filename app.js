const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function (arrOfTasks) {
  // самовызывающаяся функция
  const objOfTasks = arrOfTasks.reduce((prevElem, elem) => {
    prevElem[elem._id] = elem;
    return prevElem;
  }, {});
  // Элементы UI
  const container = document.querySelector('.card-container');
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body']

  // Events
  renderAllTasks(objOfTasks);
  form.addEventListener('submit', onFormSubmitHandler)

  function renderAllTasks(tasksList) {
    if (!tasksList) {
      // проверка есть ли вообще задачи
      console.error('Передайте список задач!');
      return;
    }

    const fragment = document.createDocumentFragment();
    Object.values(tasksList).forEach((task) => {
      const divCol = listItemTemplate(task);
      fragment.appendChild(divCol);
    });
    container.appendChild(fragment);
  }

  function listItemTemplate({ _id, title, body } = {}) {
    const divCol = document.createElement('div'); // создаем элемент столбец
    divCol.classList.add('col-xl-4', 'd-flex');
    divCol.setAttribute('data-task-id', _id);

    const divCard = document.createElement('div'); // контейнер карточки
    divCard.classList.add('card', 'mx-auto', 'mb-4','w-100');

    const divCardBody = document.createElement('div'); // тело карточки
    divCardBody.classList.add(
      'card-body',
      'd-flex',
      'flex-wrap',
      'justify-content-end',
      'align-items-space-around',
    );

    const titleCard = document.createElement('span'); // title
    titleCard.textContent = title;
    titleCard.classList.add('card-title','w-100','h-0');
    titleCard.style.fontWeight = 'bold';

    const textCard = document.createElement('p'); // текст задачи
    textCard.textContent = body;
    textCard.classList.add('card-text','w-100');

    const deleteBtn = document.createElement('button'); //кнопка
    deleteBtn.textContent = 'Delete task';
    deleteBtn.classList.add('btn', 'btn-danger', 'delete-btn', 'mt-auto');

    divCardBody.appendChild(titleCard);
    divCardBody.appendChild(textCard);
    divCardBody.appendChild(deleteBtn);
    divCard.appendChild(divCardBody);
    divCol.appendChild(divCard);

    return divCol;
  }

  function onFormSubmitHandler(e) {
    e.preventDefault(); // прекращаем стандартные действия
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;
    
    if (!titleValue || !bodyValue) { // проверяем не пустая ли форма
      alert('Пожалуйста введите title и body');
      return;
    }

    const task = createNewTask(titleValue,bodyValue);
    const listItem = listItemTemplate(task);
    container.insertAdjacentElement('afterbegin', listItem);
    form.reset();

  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`
    };

    objOfTasks[newTask._id] = newTask;

    return {...newTask};
  }
})(tasks);
