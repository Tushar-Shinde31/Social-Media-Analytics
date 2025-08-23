/**
 * Format number to compact form (e.g., 1.2K, 3.4M)
 * @param {number} n - The number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (n) => {
  if (n < 1000) return n.toString();
  if (n < 1000000) return (n / 1000).toFixed(1) + 'K';
  if (n < 1000000000) return (n / 1000000).toFixed(1) + 'M';
  return (n / 1000000000).toFixed(1) + 'B';
};

/**
 * Format ISO date to readable format (e.g., "Aug 21, 2025")
 * @param {string} iso - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (iso) => {
  const date = new Date(iso);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
