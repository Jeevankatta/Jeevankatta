/**
 * Split a comma-separated stack string into chips, ignoring commas that
 * sit inside parentheses — "Python (automation, data processing), Java"
 * is two entries, not three.
 */
export default function splitStack(stack) {
  return (stack || '')
    .split(/,(?![^(]*\))/)
    .map(s => s.trim())
    .filter(Boolean)
}
