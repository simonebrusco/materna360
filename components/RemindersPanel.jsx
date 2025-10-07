'use client';
import { useEffect, useMemo, useState } from 'react';
import { get, set, keys } from '../lib/storage';
import { showToast } from '../lib/ui/toast';
import styles from './RemindersPanel.module.css';

const DEFAULTS = {
  breathe:   { on: true, everyMin: 180 },     // 3h
  gratitude: { on: true, at: ['20:00'] },     // 20:00
};

function normalizePrefs(p) {
  const base = { ...DEFAULTS, ...(p || {}) };
  const em = Number(base.breathe?.everyMin) || DEFAULTS.breathe.everyMin;
  base.breathe = { on: !!base.breathe?.on, everyMin: Math.max(1, em) };
  const times = Array.isArray(base.gratitude?.at) ? base.gratitude.at : DEFAULTS.gratitude.at;
  const clean = times
    .map(String)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => (t.match(/^\d{2}:\d{2}$/) ? t : null))
    .filter(Boolean);
  base.gratitude = { on: !!base.gratitude?.on, at: clean.length ? clean : DEFAULTS.gratitude.at };
  return base;
}

export default function RemindersPanel() {
  const [prefs, setPrefs] = useState(() => normalizePrefs(get(keys.reminders, DEFAULTS)));
  const [dirty, setDirty] = useState(false);
  const timesText = useMemo(() => (prefs.gratitude.at || []).join(', '), [prefs]);

  useEffect(() => {
    setPrefs(normalizePrefs(get(keys.reminders, DEFAULTS)));
  }, []);

  function save() {
    const finalPrefs = normalizePrefs(prefs);
    set(keys.reminders, finalPrefs);
    setDirty(false);
    showToast('Lembretes salvos — Suas preferências foram atualizadas 💛');
  }

  function parseTimes(s) {
    const list = String(s || '')
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean);
    setPrefs((p) => normalizePrefs({ ...p, gratitude: { ...p.gratitude, at: list } }));
    setDirty(true);
  }

  return (
    <div className={styles.panelContainer}>
      <h3 className={styles.panelTitle}>Lembretes</h3>

      <div className={styles.rowToggle}>
        <label className={styles.labelStrong}>Respirar</label>
        <label className={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={!!prefs.breathe.on}
            onChange={(e) => {
              setPrefs((p) => ({ ...p, breathe: { ...p.breathe, on: e.target.checked } }));
              setDirty(true);
            }}
          />
          <span className={styles.toggleHelp}>Ativo</span>
        </label>
      </div>

      <div className={styles.rowInput}>
        <div className={styles.hintText}>Intervalo (minutos) — ex.: 180 para a cada 3h</div>
        <input
          className={styles.numberInput}
          type="number"
          min={1}
          value={prefs.breathe.everyMin}
          onChange={(e) => {
            setPrefs((p) => ({ ...p, breathe: { ...p.breathe, everyMin: Number(e.target.value || 1) } }));
            setDirty(true);
          }}
        />
      </div>

      <div className={styles.rowToggle}>
        <label className={styles.labelStrong}>Gratidão</label>
        <label className={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={!!prefs.gratitude.on}
            onChange={(e) => {
              setPrefs((p) => ({ ...p, gratitude: { ...p.gratitude, on: e.target.checked } }));
              setDirty(true);
            }}
          />
          <span className={styles.toggleHelp}>Ativo</span>
        </label>
      </div>

      <div className={styles.hintText}>Horários (HH:MM), separados por vírgula — ex.: 12:00, 20:00</div>
      <input
        className={styles.textInput}
        type="text"
        defaultValue={timesText}
        placeholder="20:00"
        onBlur={(e) => parseTimes(e.target.value)}
      />

      <div className={styles.actionsRow}>
        <button
          className={styles.resetButton}
          onClick={() => {
            setPrefs(normalizePrefs(get(keys.reminders, DEFAULTS)));
            setDirty(false);
          }}
        >
          Desfazer
        </button>
        <button className={styles.saveButton} onClick={save} disabled={!dirty}>
          Salvar
        </button>
      </div>
    </div>
  );
}
