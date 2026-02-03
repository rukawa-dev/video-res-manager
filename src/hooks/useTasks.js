import { useState, useEffect } from 'react';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('vrm_tasks') || '[]');
    setTasks(savedTasks);
  }, []);

  const createNewTask = () => {
    const newId = Date.now();
    const newTask = {
      id: newId,
      title: '새로운 영상 프로젝트',
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }),
      status: 'WAITING'
    };
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    localStorage.setItem('vrm_tasks', JSON.stringify(updatedTasks));
    return newId;
  };

  const updateTaskTitle = (taskId, newTitle) => {
    const updatedTasks = tasks.map(task =>
      task.id === parseInt(taskId) ? { ...task, title: newTitle } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('vrm_tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== parseInt(taskId));
    setTasks(updatedTasks);
    localStorage.setItem('vrm_tasks', JSON.stringify(updatedTasks));
  };

  return {
    tasks,
    createNewTask,
    updateTaskTitle,
    deleteTask
  };
};
