'use client';
import useRoutinePlanner from '../hooks/useRoutinePlanner';

export default function PlannerRoutineDebug(){
  const { day, data, addTask, toggle, markDay } = useRoutinePlanner();

  return (
    <div className="rounded-2xl p-4 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold">Planner da Rotina — {day}</h4>
        <button className="text-sm underline" onClick={() => markDay(!data.done)}>
          {data.done ? 'Desmarcar dia' : 'Marcar dia concluído'}
        </button>
      </div>

      {['morning','afternoon','evening'].map((sec) => (
        <div key={sec} className="mb-3">
          <div className="text-sm font-medium mb-1">
            {sec === 'morning' ? 'Manhã' : sec === 'afternoon' ? 'Tarde' : 'Noite'}
          </div>
          <div className="flex gap-2 mb-2">
            <input
              placeholder="Nova tarefa..."
              className="border px-2 py-1 rounded"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  addTask(sec, e.currentTarget.value.trim());
                  e.currentTarget.value = '';
                }
              }}
            />
          </div>
          <ul className="space-y-1">
            {(data[sec]||[]).map(t => (
              <li key={t.id} className="flex items-center gap-2">
                <input type="checkbox" checked={!!t.done} onChange={() => toggle(sec, t.id)} />
                <span className={t.done ? 'line-through opacity-60' : ''}>{t.text}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
