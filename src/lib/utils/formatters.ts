export function parsePublishedDate(dateString: string) {
  // Handle DD-MM-YYYY format
  if (dateString.includes('-') && dateString.split('-')[0].length === 2) {
    const [day, month, year] = dateString.split('-')
    return new Date(`${year}-${month}-${day}`)
  }
  // Handle YYYY-MM-DD format
  return new Date(dateString)
}
