export default (e: React.KeyboardEvent, callback: () => void) => {
  if (e.key === 'Enter') {
    callback()
  }
  return e
}
