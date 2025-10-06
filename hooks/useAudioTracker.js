'use client';
import { useCallback, useEffect, useRef } from 'react';
import { startAudio, completeAudio, failOrStopAudio } from '../lib/audio-track';

/**
 * useAudioTracker({ id, type, title, durationSec })
 * - chama onStart() antes de dar play
 * - chama onComplete() ao terminar
 * - pausa segura em visibilitychange para não contar tempo indevido
 */
export default function useAudioTracker({ id, type = 'meditate', title = '', durationSec = 0 }){
  const startedRef = useRef(false);
  const audioIdRef = useRef(id);

  const onStart = useCallback(() => {
    if (startedRef.current) return;
    const { id: rid } = startAudio({ id: audioIdRef.current, type, title, durationSec });
    audioIdRef.current = rid;
    startedRef.current = true;
  }, [type, title, durationSec]);

  const onComplete = useCallback(() => {
    if (!startedRef.current) return;
    completeAudio({ id: audioIdRef.current, type });
    startedRef.current = false;
  }, [type]);

  const onStop = useCallback(() => {
    if (!startedRef.current) return;
    failOrStopAudio({ id: audioIdRef.current, type });
    startedRef.current = false;
  }, [type]);

  useEffect(() => {
    const onVis = () => { if (document.hidden) onStop(); };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [onStop]);

  return { onStart, onComplete, onStop };
}
