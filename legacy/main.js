const STORAGE_KEY = 'vrm_tasks';

let tasks = [];

function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    tasks = JSON.parse(saved);
  } else {
    tasks = [
      { id: 1, title: '유튜브 쇼츠 인트로 영상 제작', date: '2026-02-02' },
      { id: 2, title: '틱톡 챌린지 템플릿 가이드', date: '2026-02-01' },
      { id: 3, title: '인스타그램 릴스 배경음악 추천', date: '2026-01-30' },
    ];
    saveTasks();
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderBoard() {
  const listContainer = document.getElementById('board-list');
  if (!listContainer) return;

  listContainer.innerHTML = tasks.map(item => `
        <div class="board-item" onclick="location.href='detail.html?id=${item.id}'">
            <div class="item-info">
                <span class="item-title">${item.title}</span>
                <div class="item-meta">
                    <span>${item.date}</span>
                </div>
            </div>
        </div>
    `).reverse().join(''); // Show latest first
}

function addNewTask() {
  const newTask = {
    id: Date.now(),
    title: `새 작업 - ${new Date().toLocaleTimeString()}`,
    date: new Date().toISOString().split('T')[0]
  };
  tasks.push(newTask);
  saveTasks();
  renderBoard();
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Video Resource Manager initialized.');
  loadTasks();
  renderBoard();

  const addBtn = document.querySelector('.btn-primary');
  if (addBtn) {
    addBtn.addEventListener('click', addNewTask);
  }
});
