"use client";

import { ApiKeyRow } from "./ApiKeyRow";

/**
 * API Keys table component
 * @param {Array} keys - Array of API key objects
 * @param {boolean} loading - Whether keys are loading
 * @param {Object} showKeys - Object mapping key IDs to visibility state
 * @param {function} onToggleShow - Callback to toggle key visibility
 * @param {function} onCopy - Callback to copy key
 * @param {function} onUpdate - Callback to update key field
 * @param {function} onDelete - Callback to delete key
 */
export function ApiKeysTable({
  keys,
  loading,
  showKeys,
  onToggleShow,
  onCopy,
  onUpdate,
  onDelete,
}) {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
      <div className="grid grid-cols-12 bg-zinc-100 px-4 py-3 text-xs font-medium uppercase text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
        <span className="col-span-3">Name</span>
        <span className="col-span-5">Value</span>
        <span className="col-span-2">Last used</span>
        <span className="col-span-2 text-right">Actions</span>
      </div>
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {loading && keys.length === 0 ? (
          <div className="px-4 py-6 text-sm text-zinc-600 dark:text-zinc-400 text-center">
            Loading keys...
          </div>
        ) : (
          keys.map((apiKey) => (
            <ApiKeyRow
              key={apiKey.id}
              apiKey={apiKey}
              showKey={showKeys[apiKey.id]}
              onToggleShow={onToggleShow}
              onCopy={onCopy}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))
        )}
        {!loading && keys.length === 0 && (
          <div className="px-4 py-6 text-sm text-zinc-600 dark:text-zinc-400">
            No keys yet. Create one to get started.
          </div>
        )}
      </div>
    </div>
  );
}
