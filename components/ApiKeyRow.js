"use client";

/**
 * Individual API key row component
 * @param {Object} apiKey - API key object
 * @param {boolean} showKey - Whether to show the key value
 * @param {function} onToggleShow - Callback to toggle key visibility
 * @param {function} onCopy - Callback to copy key
 * @param {function} onUpdate - Callback to update key field
 * @param {function} onDelete - Callback to delete key
 */
export function ApiKeyRow({
  apiKey,
  showKey,
  onToggleShow,
  onCopy,
  onUpdate,
  onDelete,
}) {
  return (
    <div className="grid grid-cols-12 items-center gap-2 px-4 py-3">
      <input
        value={apiKey.name}
        onChange={(e) => onUpdate(apiKey.id, "name", e.target.value)}
        className="col-span-3 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900"
      />
      <div className="col-span-5 flex items-center gap-2">
        <input
          type={showKey ? "text" : "password"}
          value={apiKey.value}
          onChange={(e) => onUpdate(apiKey.id, "value", e.target.value)}
          className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900"
          readOnly
        />
        {/* Toggle show/hide key */}
        <button
          onClick={() => onToggleShow(apiKey.id)}
          className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded"
          title={showKey ? 'Hide key' : 'Show key'}
          type="button"
        >
          {showKey ? (
            // Eye Off Icon
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-zinc-500 dark:text-zinc-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A11.934 11.934 0 0112 6c5.523 0 10.062 3.802 11.035 8.785M9.878 9.88a3 3 0 104.243 4.242" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 01-6.411-2.336m10.036 6.124L4.06 4.06" />
            </svg>
          ) : (
            // Eye Icon
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-zinc-500 dark:text-zinc-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0 4.97 4.605 9 9.75 9s9.75-4.03 9.75-9S17.145 3 12 3 2.25 7.03 2.25 12z" />
            </svg>
          )}
        </button>
        {/* Copy key icon */}
        <button
          onClick={() => onCopy(apiKey.value)}
          className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded"
          title="Copy key"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-zinc-500 dark:text-zinc-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h7.5A2.5 2.5 0 0119 9.5V17M16.5 10.5V16a2.5 2.5 0 01-2.5 2.5h-7A2.5 2.5 0 015 16V9.5A2.5 2.5 0 017.5 7H8" />
          </svg>
        </button>
      </div>
      <span className="col-span-2 text-sm text-zinc-600 dark:text-zinc-400">
        {apiKey.lastUsed}
      </span>
      <div className="col-span-2 flex items-center justify-end gap-2">
        <button
          onClick={() => onDelete(apiKey.id)}
          className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded"
          title="Delete key"
          type="button"
        >
          {/* Trash Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-zinc-500 dark:text-zinc-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18.75A2.25 2.25 0 008.25 21h7.5A2.25 2.25 0 0018 18.75V9.75m-12 0V18.75A2.25 2.25 0 008.25 21h7.5A2.25 2.25 0 0018 18.75V9.75M9 13.5h.008v2.25H9V13.5zm3 0h.008v2.25H12V13.5zm3 0h.008v2.25H15V13.5zM4.5 6.75h15m-7.5-3v3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
