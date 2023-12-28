
export function formatColor(title: string): string {
  switch (title.toLowerCase()) {
  case 'low':
    return '#2ECC71'
  case 'medium':
    return '#F5B041'
  case 'high':
    return '#D64541'
  default:
    return '#1DB7AC' // Default color
  }
}
