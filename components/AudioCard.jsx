'use client';
import useAudioTracker from '../hooks/useAudioTracker';

export default function AudioCard({ track }) {
  // track: { id, type:'meditate'|'cheer', title, durationSec }
  const { onStart, onComplete, onStop } = useAudioTracker({
    id: track.id,
    type: track.type || 'meditate',
    title: track.title,
    durationSec: track.durationSec || 0
  });

  function handlePlay(){
    onStart();
  }
  function handleEnded(){
    onComplete();
  }
  function handlePauseOrClose(){
    onStop();
  }

  return (
    <div className="rounded-2xl p-3 bg-white shadow-sm">
      <div className="font-medium mb-1">{track.title}</div>
      <div className="text-xs opacity-70 mb-2">{track.durationSec ? `${track.durationSec} s` : 'Áudio curto'}</div>
      <div className="flex gap-2">
        <button className="px-3 py-1 rounded-full bg-black text-white text-sm" onClick={handlePlay}>Play</button>
        <button className="px-3 py-1 rounded-full bg-black/10 text-sm" onClick={handlePauseOrClose}>Parar</button>
      </div>

      {/* Conecte seu player: */}
      {/* audio.onended = handleEnded */}
      {/* audio.onpause = handlePauseOrClose */}
    </div>
  );
}
