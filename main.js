{
  const addButton = document.getElementById('add-button');
  const inputTask = document.getElementById('input-task');
  const taskList = document.getElementById('task-list');
  const statusGroup = document.getElementsByName("statusGroup");
  const tasks = [];
  let filterStatus = 'all';

  // 表示ステータスに応じて、tasksをフィルターにかけ配列で返す
  const filteredTasks = {
    all(tasks) {
      return tasks;
    },
    working(tasks) {
      return tasks.filter((task) => !task.completed);
    },
    completed(tasks) {
      return tasks.filter((task) => task.completed);
    },
  };

  addButton.addEventListener('click', () => {
    addTask();
  })

  /**
   * 表示するステータスを変更
   */
  statusGroup.forEach((radio) => {
    radio.addEventListener('click', () => {
      filterStatus = radio.value;
      showTask();
    })
  })

  /**
   * タスクを追加
   */
  const addTask = () => {
    const comment = inputTask.value.trim();
    inputTask.value = '';
    if (comment) {
      tasks.push({
        id: tasks.length + 1,
        comment: comment,
        completed: false,
      });
      showTask();
    }
  }

  /**
   * タスクを表示
   */
  const showTask = () => {
    // tbodyの中身を空にする
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    // 表示するステータスをチェック
    statusGroup.forEach((status) => {
      if (status.checked) {
        filterStatus = status.value;
      }
    });

    let showTasks = filteredTasks[filterStatus](tasks);

    showTasks.forEach((task) => {
      const tr = document.createElement('tr');

      const idTd = document.createElement('td');
      idTd.textContent = task.id;
      tr.appendChild(idTd);

      const commentTd = document.createElement('td');
      commentTd.textContent = task.comment;
      tr.appendChild(commentTd);

      const statusButtonTd = document.createElement('td');
      const statusButton = document.createElement('button');
      statusButton.textContent = task.completed ? '完了' : '作業中';
      statusButtonTd.appendChild(statusButton);
      tr.appendChild(statusButtonTd);

      // ステータスを切り替え
      statusButton.addEventListener('click', () => {
        task.completed = !task.completed;
        statusButton.textContent = task.completed ? '完了' : '作業中';
        showTask();
      });

      const deleteButtonTd = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = '削除';
      deleteButtonTd.appendChild(deleteButton);
      tr.appendChild(deleteButtonTd);
      deleteButton.addEventListener('click', () => {
        removeTask(task.id);
      });

      taskList.appendChild(tr);
    });
  }

  /**
   * タスクを削除
   */
  const removeTask = (id) => {
    tasks.splice(--id, 1);
    tasks.forEach((task, index) => {
      task.id = ++index;
    });
    showTask();
  }
}