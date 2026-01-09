"use client";

import { useMemo, useState, useEffect } from "react";
import { fetchApiKeys, createApiKey, updateApiKey, deleteApiKey, validateApiKey } from "@/lib/apiKeys";
import { generateApiKey } from "@/lib/utils";
import { ToastContainer } from "@/components/Toast";
import { CreateKeyModal } from "@/components/CreateKeyModal";
import { SuccessNotification } from "@/components/SuccessNotification";
import { ApiKeysTable } from "@/components/ApiKeysTable";

export default function DashboardsPage() {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [showKeys, setShowKeys] = useState({});
  const [copied, setCopied] = useState(false);
  const [copiedVisible, setCopiedVisible] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [deletedVisible, setDeletedVisible] = useState(false);
  const [created, setCreated] = useState(false);
  const [createdVisible, setCreatedVisible] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [validationKey, setValidationKey] = useState("");
  const [validating, setValidating] = useState(false);
  const [validated, setValidated] = useState(false);
  const [validatedVisible, setValidatedVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [validationVariant, setValidationVariant] = useState("success");

  const totalKeys = useMemo(() => keys.length, [keys]);

  // Fetch keys from Supabase on mount
  useEffect(() => {
    loadKeys();
  }, []);

  const loadKeys = async () => {
    try {
      setLoading(true);
      const data = await fetchApiKeys();
      // Map database fields (snake_case) to UI fields (camelCase)
      const mappedKeys = data.map((key) => ({
        id: key.id,
        name: key.name,
        value: key.value,
        lastUsed: key.last_used || "Never",
        usageLimit: key.usage_limit || null,
        currentUsage: key.current_usage || 0,
      }));
      setKeys(mappedKeys);
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = "error") => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCreate = async (name, usageLimit) => {
    try {
      setCreating(true);
      // Generate a new API key automatically
      const generatedKey = generateApiKey();
      const newKey = await createApiKey(name, generatedKey, usageLimit);
      setKeys((prev) => [
        {
          id: newKey.id,
          name: newKey.name,
          value: newKey.value,
          lastUsed: newKey.last_used || "Never",
          usageLimit: newKey.usage_limit || null,
          currentUsage: newKey.current_usage || 0,
        },
        ...prev,
      ]);
      setIsModalOpen(false);
      setCreatedVisible(true);
      setCreated(true);
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setCreating(false);
    }
  };

  const handleUpdate = async (id, field, value) => {
    try {
      // Map UI field names to database field names
      const dbField = field === "lastUsed" ? "last_used" : field;
      await updateApiKey(id, { [dbField]: value });
      setKeys((prev) =>
        prev.map((k) => (k.id === id ? { ...k, [field]: value } : k))
      );
    } catch (error) {
      showToast(error.message, "error");
      // Reload keys to restore previous state
      loadKeys();
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteApiKey(id);
      setKeys((prev) => prev.filter((k) => k.id !== id));
      setDeletedVisible(true);
      setDeleted(true);
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleToggleShow = (id) => {
    setShowKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedVisible(true);
      setCopied(true);
    } catch (err) {
      // Optionally handle error
    }
  };

  const handleValidate = async () => {
    if (!validationKey.trim()) {
      showToast("Please enter an API key to validate", "error");
      return;
    }

    try {
      setValidating(true);
      const isValid = await validateApiKey(validationKey);
      if (isValid) {
        setValidationMessage("API key is valid");
        setValidationVariant("success");
      } else {
        setValidationMessage("API key is invalid or has reached its usage limit");
        setValidationVariant("error");
      }
      setValidatedVisible(true);
      setValidated(true);
    } catch (error) {
      setValidationMessage(error.message);
      setValidationVariant("error");
      setValidatedVisible(true);
      setValidated(true);
    } finally {
      setValidating(false);
    }
  };

  // Handle notification animations
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 600);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  useEffect(() => {
    if (deleted) {
      const timer = setTimeout(() => setDeleted(false), 600);
      return () => clearTimeout(timer);
    }
  }, [deleted]);

  useEffect(() => {
    if (created) {
      const timer = setTimeout(() => setCreated(false), 600);
      return () => clearTimeout(timer);
    }
  }, [created]);

  useEffect(() => {
    if (validated) {
      const timer = setTimeout(() => setValidated(false), 600);
      return () => clearTimeout(timer);
    }
  }, [validated]);


  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      {/* Create Key Modal */}
      <CreateKeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
        loading={creating}
      />

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Success notifications */}
      <SuccessNotification
        visible={copiedVisible}
        shouldAnimate={copied}
        message="Copied API Key to clipboard"
        variant="success"
        onClose={() => setCopiedVisible(false)}
      />
      <SuccessNotification
        visible={deletedVisible}
        shouldAnimate={deleted}
        message="API Key deleted successfully"
        variant="error"
        onClose={() => setDeletedVisible(false)}
      />
      <SuccessNotification
        visible={createdVisible}
        shouldAnimate={created}
        message="API Key created successfully"
        variant="success"
        onClose={() => setCreatedVisible(false)}
      />
      <SuccessNotification
        visible={validatedVisible}
        shouldAnimate={validated}
        message={validationMessage}
        variant={validationVariant}
        onClose={() => setValidatedVisible(false)}
      />
      <main className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              API Keys
            </p>
            <h1 className="text-3xl font-semibold">Dashboards</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Create, edit, rotate, or delete keys from one place.
            </p>
          </div>
        </header>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={validationKey}
                onChange={(e) => setValidationKey(e.target.value)}
                placeholder="Enter API key to validate"
                className="flex-1 min-w-[200px] rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 placeholder-zinc-500 focus:border-black focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-400 dark:focus:border-white dark:focus:ring-white"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleValidate();
                  }
                }}
              />
              <button
                onClick={handleValidate}
                disabled={validating || !validationKey.trim()}
                className="h-10 rounded-lg bg-black px-4 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                {validating ? "Validating..." : "Validate"}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Keys overview</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Total keys: {totalKeys}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="h-10 rounded-lg bg-black px-4 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                disabled={loading}
              >
                Create key
              </button>
            </div>
          </div>

          <ApiKeysTable
            keys={keys}
            loading={loading}
            showKeys={showKeys}
            onToggleShow={handleToggleShow}
            onCopy={handleCopy}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
}

