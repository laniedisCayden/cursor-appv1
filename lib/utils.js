/**
 * Generate a secure random API key
 * @returns {string} A formatted API key (sk_live_<random>)
 */
export function generateApiKey() {
  // Generate 32 random bytes and encode as base64
  const randomBytes = new Uint8Array(32);
  crypto.getRandomValues(randomBytes);
  const base64Key = btoa(String.fromCharCode(...randomBytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, ''); // URL-safe base64
  
  // Format: sk_live_<random>
  return `sk_live_${base64Key}`;
}
