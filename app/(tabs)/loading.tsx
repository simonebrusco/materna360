/** DO NOT re-export this file. Keep this as a direct server page (no client hooks). */

export default function Loading() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
      <div className="h-24 bg-gray-200 rounded animate-pulse" />
      <div className="h-24 bg-gray-200 rounded animate-pulse" />
    </div>
  )
}
