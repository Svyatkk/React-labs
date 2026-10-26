export function formatGdp(value: number): string {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)} трлн`;
  }
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)} млрд`;
  }
  if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)} млн`;
  }
  return `$${value.toLocaleString('uk-UA')}`;
}


