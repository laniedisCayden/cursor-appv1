import { supabase } from './supabase'

/**
 * Fetch all API keys from Supabase
 */
export async function fetchApiKeys() {
  const { data, error } = await supabase
    .from('api_keys')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

/**
 * Create a new API key
 */
export async function createApiKey(name, value, usageLimit = null) {
  const insertData = {
    name: name.trim(),
    value: value.trim(),
    last_used: 'Never',
  };

  // Add usage limit fields if provided
  if (usageLimit !== null && usageLimit !== undefined) {
    insertData.usage_limit = usageLimit;
    insertData.current_usage = 0;
  }

  const { data, error } = await supabase
    .from('api_keys')
    .insert([insertData])
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

/**
 * Update an API key
 */
export async function updateApiKey(id, updates) {
  const { data, error } = await supabase
    .from('api_keys')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

/**
 * Delete an API key
 */
export async function deleteApiKey(id) {
  const { error } = await supabase
    .from('api_keys')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }
}

/**
 * Validate an API key
 * Returns true if the key exists in DB and usage_limit > 0
 */
export async function validateApiKey(keyValue) {
  const { data, error } = await supabase
    .from('api_keys')
    .select('usage_limit')
    .eq('value', keyValue.trim())
    .single()

  if (error) {
    // Key doesn't exist or other error
    return false
  }

  // Check if key exists and usage_limit is greater than 0
  return data && data.usage_limit !== null && data.usage_limit > 0
}

