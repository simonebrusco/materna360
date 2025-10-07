'use client';
import { useState, useEffect } from 'react';
import { get, set, keys } from '../../lib/storage';

export default function TasksPlannerCard() {
  const [tasks, setTasks] = useState(() => get(keys.tasks, []));
  const [input, setInput] = useState('');

  const addTask = () => {
    const value = (input || '').trim();
    if (!value) return;
    const newTasks = [...(Array.isArray(tasks) ? tasks : []), { text: value, done: false }];
    setTasks(newTasks);
    set(keys.tasks, newTasks);
    setInput('');
  };

  const toggleTask = (i) => {
    const list = Array.isArray(tasks) ? tasks.slice() : [];
    if (i < 0 || i >= list.length) return;
    list[i] = { ...list[i], done: !list[i]?.done };
    setTasks(list);
    set(keys.tasks, list);
  };

  useEffect(() => {
    setTasks(get(keys.tasks, []));
  }, []);

  return (
    <div className="card planner-card planner-tasks-card">
      <h3 className="h3 planner-title">Planner da Semana</h3>
      <div className="tasks-input-row">
        <input
          className="m360-input"
          placeholder="Digite uma tarefa..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-primary" type="button" onClick={addTask}>+</button>
      </div>

      <ul className="tasks-list">
        {(Array.isArray(tasks) ? tasks : []).map((t, i) => (
          <li
            key={i}
            className={`task-item${t?.done ? ' is-done' : ''}`}
            onClick={() => toggleTask(i)}
          >
            {t?.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
