export const formatDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString)
  const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}
  return dateTime.toLocaleString('en-US', options)
}
