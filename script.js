// Selectors: Statistics & Theme
const totalTasksCount = document.getElementById('totalTasksCount');
const completedTasksCount = document.getElementById('completedTasksCount');
const totalNotesCount = document.getElementById('totalNotesCount');
const activeTasksCount = document.getElementById('activeTasksCount');
const lightModeBtn = document.getElementById('lightModeBtn');
const darkModeBtn = document.getElementById('darkModeBtn');
const root = document.documentElement;

// Selectors: Task Management
const taskForm = document.getElementById('taskForm');
const addTaskBtn = document.getElementById('addTaskBtn');
const errorTask = document.getElementById('errorTask');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Selectors: Note Management
const newNoteBtn = document.getElementById('newNoteBtn');
const notesList = document.getElementById('notesList');
const noteModal = document.getElementById('noteModal');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const closeModal = document.querySelectorAll('#closeModal');
const noteForm = document.getElementById('noteForm');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const errorTitle = document.getElementById('errorTitle');
const errorContent = document.getElementById('errorContent');

// State: Data Containers & Flags
let taskContainer = getTasks();
let notesContainer = getNotes();

let editingTaskId = null;
let isTaskEditing = false;

let editingNoteId = null;
let isNoteEditing = false;

// Initialization: Render Initial Data
(function initTheme() {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark' || storedTheme === 'light') {
    applyTheme(storedTheme);
    return;
  }
})();

renderTasks();
renderNotes();

/* THEME LOGIC */

// Logic: Switch Theme
function applyTheme(theme) {
  if (theme === 'dark') {
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    root.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}

// Events: Theme Buttons
darkModeBtn.addEventListener('click', () => applyTheme('dark'));
lightModeBtn.addEventListener('click', () => applyTheme('light'));

/* TASK LOGIC */

// Events: Submit Task Form
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newTask = {
    id: isTaskEditing ? editingTaskId : Date.now(),
    taskName: taskInput.value.trim(),
    completed: false,
  };

  if (isTaskEditing) {
    taskContainer = taskContainer.map((task) =>
      task.id === editingTaskId ? newTask : task
    );
    isTaskEditing = false;
    editingTaskId = null;
    addTaskBtn.textContent = 'Add';
  } else {
    taskContainer.unshift(newTask);
  }

  setTasks(taskContainer);
  renderTasks();
  taskForm.reset();
});

// Events: Task List Interactions
taskList.addEventListener('click', (e) => {
  const card = e.target.closest('[data-id]');
  if (!card) return;

  const id = card.dataset.id;

  if (e.target.closest('.delete-btn')) {
    const ok = confirm('Are you sure to delete?');
    if (!ok) return;

    deleteTask(id);
    return;
  }

  if (e.target.closest('.edit-btn')) {
    editTask(id);
    return;
  }

  const checkbox = e.target.closest('.task-checkbox');
  if (checkbox) {
    toggleTask(id, checkbox.checked);
    return;
  }
});

// Logic: Create Task DOM Element
function createNewTask(task) {
  const newDiv = document.createElement('div');
  newDiv.innerHTML = `
    <div
      data-id="${task.id}"
      class="bg-blue-50/80 dark:bg-indigo-950/50 backdrop-blur-sm border border-blue-200 dark:border-indigo-800/50 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md rounded-xl p-4 flex items-center justify-between group transition-all duration-300"
    >
      <div class="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          class="task-checkbox w-5 h-5 rounded border-2 border-indigo-400 dark:border-indigo-500 bg-transparent checked:bg-indigo-600 dark:checked:bg-indigo-600 cursor-pointer accent-indigo-600"
          ${task.completed ? 'checked' : ''}
        />
        <span class="text-gray-800 dark:text-indigo-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-200 transition-colors 
        ${task.completed ? 'line-through opacity-60' : ''}">
          ${task.taskName}
        </span>
      </div>
      <button
        class="edit-btn text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 text-lg opacity-0 group-hover:opacity-100 transition-opacity mr-4"
      >
        <i class="bi bi-pencil-fill"></i>
      </button>
      <button
        class="delete-btn text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <i class="bi bi-x-lg"></i>
      </button>
    </div>
  `;
  taskList.append(newDiv);
}

// Logic: Render All Tasks
function renderTasks(list = taskContainer) {
  taskList.innerHTML = '';

  if (!list.length) {
    taskList.innerHTML = `
      <div class="flex flex-col items-center pt-32">
        <i class="bi bi-journal-bookmark-fill text-4xl text-slate-500 pb-2"></i>
        <p class="text-slate-500 text-lg">No Tasks Added</p>
      </div>
    `;
  }

  list.forEach((item) => createNewTask(item));
  udpateUI();
}

// Logic: CRUD Operations for Tasks
function deleteTask(id) {
  taskContainer = taskContainer.filter((task) => task.id !== Number(id));
  setTasks(taskContainer);
  renderTasks(taskContainer);
}

function toggleTask(id, isCompleted) {
  taskContainer = taskContainer.map((task) =>
    task.id === Number(id) ? { ...task, completed: isCompleted } : task
  );
  setTasks(taskContainer);
  renderTasks();
}

function editTask(editId) {
  const editCard = taskContainer.find((task) => task.id === Number(editId));
  if (!editCard) return;

  taskInput.value = editCard.taskName;

  isTaskEditing = true;
  editingTaskId = Number(editId);

  addTaskBtn.textContent = 'Update';
}

/* NOTE LOGIC */

// Events: Submit Note Form
noteForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();

  if (isNoteEditing) {
    notesContainer = notesContainer.map((note) =>
      note.id === editingNoteId ? { ...note, title, content } : note
    );
    isNoteEditing = false;
    editingNoteId = null;
    saveNoteBtn.textContent = 'Save Note';
  } else {
    const newNote = {
      id: Date.now(),
      title,
      content,
    };
    notesContainer.unshift(newNote);
  }

  setNotes(notesContainer);
  renderNotes();
  noteForm.reset();
  noteModal.classList.add('hidden');
});

// Events: Note List Interactions
notesList.addEventListener('click', (e) => {
  const card = e.target.closest('[data-id]');
  if (!card) return;

  const id = card.dataset.id;

  if (e.target.closest('.delete-btn')) {
    deleteNote(id);
  }

  if (e.target.closest('.edit-btn')) {
    editNote(id);
  }
});

// Events: Modal Visibility
newNoteBtn.addEventListener('click', () => {
  noteModal.classList.remove('hidden');
});

closeModal.forEach((button) => {
  button.addEventListener('click', () => {
    noteModal.classList.add('hidden');
  });
});

// Logic: Create Note DOM Element
function createNewNote(note) {
  const newDiv = document.createElement('div');

  newDiv.innerHTML = `
    <div
      data-id=${note.id}
      class="bg-blue-50/80 dark:bg-indigo-950/50 border border-blue-200 dark:border-indigo-800/50 hover:border-indigo-400 rounded-xl p-4 group relative"
    >
      <h3 class="text-indigo-900 dark:text-indigo-100 font-semibold mb-2">
        ${note.title}
      </h3>
      <p class="text-gray-700 dark:text-indigo-300 text-sm line-clamp-3">
        ${note.content}
      </p>
      <button
        class="edit-btn absolute top-3 right-9 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <i class="bi bi-pencil-fill"></i>
      </button>
      <button
        class="delete-btn absolute top-3 right-3 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 font-bold opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <i class="bi bi-x-lg"></i>
      </button>
    </div>
  `;
  notesList.append(newDiv);
}

// Logic: Render All Notes
function renderNotes(list = notesContainer) {
  notesList.innerHTML = '';

  if (!list.length) {
    notesList.innerHTML = `
      <div class="flex flex-col items-center pt-32" id="emptyStateNotes">
        <i class="bi bi-card-text text-4xl text-slate-500 pb-2"></i>
        <p class="text-slate-500 text-lg">No Notes For Now</p>
      </div>
    `;
  }

  list.forEach((note) => createNewNote(note));
  udpateUI();
}

// Logic: CRUD Operations for Notes
function editNote(editId) {
  const card = notesContainer.find((note) => note.id === Number(editId));
  if (!card) return;

  noteModal.classList.remove('hidden');

  isNoteEditing = true;
  editingNoteId = Number(editId);

  noteTitle.value = card.title;
  noteContent.value = card.content;

  saveNoteBtn.textContent = 'Update Note';
}

function deleteNote(id) {
  notesContainer = notesContainer.filter((note) => note.id !== Number(id));
  setNotes(notesContainer);
  renderNotes(notesContainer);
}

/* STORAGE & UI HELPERS */

// Storage: Task Get/Set
function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function setTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Storage: Note Get/Set
function getNotes() {
  return JSON.parse(localStorage.getItem('notes')) || [];
}

function setNotes(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
}

// UI: Update Stats Counters
function udpateUI() {
  const totalTasks = taskContainer.length;
  const completedTasks = taskContainer.filter((task) => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  totalTasksCount.textContent = taskContainer.length;
  totalNotesCount.textContent = notesContainer.length;
  completedTasksCount.textContent = completedTasks;
  activeTasksCount.textContent = activeTasks;
}
