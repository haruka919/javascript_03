{
  const addButton = document.getElementById('add-button');
  const inputTask = document.getElementById('input-task');
  const taskList = [];
  const task = {
    id: 1,
    comment: null,
    completed: false
  }

  addButton.addEventListener('click', () => {
    addTask();
  })

  // タスクを追加
  function addTask() {
    const value = inputTask.value;
    inputTask.value = '';
    if (value) {
      taskList.push({
        id: task.id++,
        comment: value,
        completed: false
      });
    }
  }
}